/**
 * WISDOM LAND MODEL SCHOOLS - Admissions backend (Google Apps Script + Google Sheets)
 * Free. No other services. See docs/SETUP.md for step-by-step deployment.
 *
 * Security notes
 *  - The spreadsheet is PRIVATE: never share it by link. Only school staff are added as editors.
 *  - The web app only exposes doPost (submit application) and a harmless doGet (health check).
 *    It can never read or return spreadsheet rows.
 *  - All validation is repeated here on the server. Nothing from the browser is trusted.
 */

var CFG = {
  SHEET_NAME: 'Applications',
  SCHOOL_EMAIL: 'wisdomlandschools@gmail.com',   // receives the notification (reference number only)
  REF_PREFIX: 'WLMS',
  MIN_FILL_MS: 8000,                              // forms submitted faster than this are treated as bots
  MAX_AGE_MS: 6 * 60 * 60 * 1000,                 // form must be submitted within 6 hours of opening
  GLOBAL_LIMIT: 40,                               // max applications per 10 minutes (whole site)
  IDEMPOTENT_MS: 10 * 60 * 1000                   // an identical re-submit within 10 min returns the same reference
};

var HEADERS = ['Reference', 'Submitted At', 'Status', 'Pupil Full Name', 'Sex', 'Date of Birth', 'Nationality', 'State of Origin',
  'Class Applying For', 'Former School', 'Class Last Read', "Father's Name", "Father's Occupation", "Father's Address & Phone",
  "Mother's Name", "Mother's Occupation", 'Residential Address', 'Parent Phone', 'Parent Email', 'Emergency Contact', 'Emergency Phone',
  'Guarantor Name', 'Guarantor Phone', 'Guarantor Address', 'Declared By (Name)', 'Declaration Date', 'Documents Received', 'Staff Notes', 'Dedup Key'];

var STATUSES = ['New', 'Documents Received', 'Assessment Scheduled', 'Offer Made', 'Registered', 'Declined', 'Withdrawn'];

/* ---------- One-time setup: run this function once from the editor ---------- */
function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Open this script from the spreadsheet: Extensions > Apps Script.');
  var sh = ss.getSheetByName(CFG.SHEET_NAME) || ss.insertSheet(CFG.SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold').setBackground('#0B3D2E').setFontColor('#ffffff');
    sh.setFrozenRows(1);
  }
  var statusCol = HEADERS.indexOf('Status') + 1;
  sh.getRange(2, statusCol, 2000, 1).setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build());
  sh.hideColumns(HEADERS.indexOf('Dedup Key') + 1);
  PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', ss.getId());
  SpreadsheetApp.flush();
  Logger.log('Setup complete. Now deploy as a Web app (see docs/SETUP.md).');
}

/* ---------- Web app entry points ---------- */
function doGet() { return json_({ ok: true, service: 'Wisdom Land admissions' }); }

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    if (!e || !e.postData || !e.postData.contents || e.postData.contents.length > 20000) return fail_('Invalid request.');
    var body;
    try { body = JSON.parse(e.postData.contents); } catch (err) { return fail_('Invalid request.'); }
    if (body.action !== 'apply' || !body.data) return fail_('Invalid request.');
    var d = body.data;

    // --- Spam protection ---
    if (d.website) return fail_('Your application could not be processed.');                // honeypot
    var started = Number(body.startedAt), now = Date.now();
    if (!started || now - started < CFG.MIN_FILL_MS || now - started > CFG.MAX_AGE_MS) return fail_('Please take a moment to complete the form, then submit again.');
    var cache = CacheService.getScriptCache();
    var bucket = 'rate_' + Math.floor(now / 600000);
    var count = Number(cache.get(bucket) || 0);
    if (count >= CFG.GLOBAL_LIMIT) return fail_('We are receiving many requests. Please try again in a few minutes.');

    // --- Validate + sanitise ---
    var clean = {}, errors = {};
    var rules = {
      childName: [true, 3, 120], sex: [true, 1, 10], dob: [true, 10, 10], nationality: [true, 2, 60], stateOfOrigin: [true, 2, 40],
      classApplying: [true, 2, 40], formerSchool: [false, 0, 150], classLastRead: [false, 0, 60], fatherName: [true, 3, 120],
      fatherOccupation: [false, 0, 100], fatherAddressPhone: [false, 0, 250], motherName: [false, 0, 120], motherOccupation: [false, 0, 100],
      residentialAddress: [true, 6, 250], parentPhone: [true, 7, 20], parentEmail: [false, 0, 120], emergencyContact: [true, 3, 120],
      emergencyPhone: [true, 7, 20], guarantorName: [true, 3, 120], guarantorPhone: [true, 7, 20], guarantorAddress: [false, 0, 250],
      oathName: [true, 3, 120], oathDate: [true, 10, 10]
    };
    Object.keys(rules).forEach(function (k) {
      var r = rules[k], v = sanitise_(d[k], r[2]);
      if (r[0] && v.length < r[1]) errors[k] = 'This field is required.';
      clean[k] = v;
    });
    ['parentPhone', 'emergencyPhone', 'guarantorPhone'].forEach(function (k) { if (!/^[+()\-\s\d]{7,20}$/.test(clean[k])) errors[k] = 'Enter a valid phone number.'; });
    if (clean.parentEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(clean.parentEmail)) errors.parentEmail = 'Enter a valid email address.';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(clean.dob) || isNaN(new Date(clean.dob).getTime())) errors.dob = 'Enter a valid date of birth.';
    else { var age = (now - new Date(clean.dob).getTime()) / 31557600000; if (age < 1 || age > 25) errors.dob = 'Enter a valid date of birth.'; }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(clean.oathDate)) errors.oathDate = 'Enter a valid date.';
    if (['Male', 'Female'].indexOf(clean.sex) < 0) errors.sex = 'Select sex.';
    if (d.agree !== true || d.guarantorAware !== true) return fail_('Please confirm the declaration.');
    if (Object.keys(errors).length) return json_({ ok: false, message: 'Please correct the highlighted fields.', fields: errors });

    // --- Critical section: duplicate check, reference number, save ---
    lock.waitLock(20000);
    var sh = sheet_();
    var dedup = hash_([clean.childName.toLowerCase().replace(/\s+/g, ' '), clean.dob, clean.parentPhone.replace(/\D/g, '')].join('|'));
    var dupCol = HEADERS.indexOf('Dedup Key') + 1;
    var last = sh.getLastRow();
    if (last > 1) {
      var keys = sh.getRange(2, dupCol, last - 1, 1).getValues();
      for (var i = keys.length - 1; i >= 0; i--) {
        if (keys[i][0] === dedup) {
          var row = sh.getRange(i + 2, 1, 1, 2).getValues()[0];
          var age2 = now - new Date(row[1]).getTime();
          if (age2 < CFG.IDEMPOTENT_MS) return json_({ ok: true, reference: row[0] });   // same submission re-sent (e.g. flaky network)
          return fail_('An application for this pupil has already been received. Please call the school office if you need to make changes.');
        }
      }
    }
    var ref = nextRef_();
    var submitted = new Date();
    var rowValues = [ref, submitted, 'New', clean.childName, clean.sex, clean.dob, clean.nationality, clean.stateOfOrigin, clean.classApplying,
      clean.formerSchool, clean.classLastRead, clean.fatherName, clean.fatherOccupation, clean.fatherAddressPhone, clean.motherName,
      clean.motherOccupation, clean.residentialAddress, clean.parentPhone, clean.parentEmail, clean.emergencyContact, clean.emergencyPhone,
      clean.guarantorName, clean.guarantorPhone, clean.guarantorAddress, clean.oathName, clean.oathDate, 'No', '', dedup];
    sh.appendRow(rowValues);
    SpreadsheetApp.flush();
    // Verify the row really exists before reporting success
    var saved = sh.getRange(sh.getLastRow(), 1).getValue();
    if (saved !== ref) throw new Error('Row verification failed');
    cache.put(bucket, String(count + 1), 660);
    lock.releaseLock();

    // Email: reference number ONLY. A failed email never turns a saved application into a failure.
    var submittedStr = Utilities.formatDate(submitted, Session.getScriptTimeZone() || 'Africa/Lagos', 'd MMMM yyyy, HH:mm');
    try {
      MailApp.sendEmail({ to: CFG.SCHOOL_EMAIL, subject: 'New admission application: ' + ref,
        body: 'A new application has been submitted.\n\nStudent name: ' + clean.childName +
          '\nDate submitted: ' + submittedStr +
          '\nReference number: ' + ref +
          '\n\nOpen the private admissions spreadsheet to view the full details.' });
    } catch (mailErr) { console.error('Notification email failed for ' + ref + ': ' + mailErr); }

    // Confirmation email to the applicant/parent, if they gave a valid email address.
    if (clean.parentEmail) {
      try {
        MailApp.sendEmail({ to: clean.parentEmail, subject: 'Wisdom Land Model Schools - Application received (' + ref + ')',
          body: 'Dear ' + clean.oathName + ',\n\n' +
            'Thank you for applying to Wisdom Land Model Schools on behalf of ' + clean.childName + '.\n\n' +
            'Your application has been received.\n\n' +
            'Reference number: ' + ref +
            '\nDate submitted: ' + submittedStr +
            '\n\nPlease keep this reference number for your records and quote it in any correspondence with the school.\n\n' +
            'If you have any questions, please contact the school office.\n\n' +
            'Warm regards,\nWisdom Land Model Schools' });
      } catch (mailErr2) { console.error('Applicant confirmation email failed for ' + ref + ': ' + mailErr2); }
    }

    return json_({ ok: true, reference: ref });
  } catch (err) {
    console.error(err && err.stack || err);
    try { lock.releaseLock(); } catch (x) {}
    return fail_('We could not save your application. Please try again, or contact the school.');
  }
}

/* ---------- Helpers ---------- */
function sheet_() {
  var id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  var ss = id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(CFG.SHEET_NAME);
  if (!sh) throw new Error('Run setup() first.');
  return sh;
}

// Reference format: WLMS-2026-00042 (counter kept in Script Properties; protected by the lock)
function nextRef_() {
  var props = PropertiesService.getScriptProperties();
  var n = Number(props.getProperty('REF_COUNTER') || 0) + 1;
  props.setProperty('REF_COUNTER', String(n));
  return CFG.REF_PREFIX + '-' + new Date().getFullYear() + '-' + ('00000' + n).slice(-5);
}

// Strip tags/control characters, collapse whitespace, cap length, and neutralise spreadsheet formulas.
function sanitise_(v, max) {
  var s = (v === null || v === undefined) ? '' : String(v);
  s = s.replace(/<[^>]*>/g, '').replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
  if (/^[=+\-@]/.test(s) && !/^[+]?[\d\s()\-]{7,20}$/.test(s)) s = "'" + s;
  return s;
}

function hash_(s) {
  return Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, s)).slice(0, 32);
}

function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function fail_(msg) { return json_({ ok: false, message: msg }); }
