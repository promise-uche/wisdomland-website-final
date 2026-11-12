import { useRef, useState } from 'react';
import { SITE, STATES, CLASSES } from '../data/site';

const PHONE_RE = /^[+()\-\s\d]{7,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const EMPTY = {
  childName: '', sex: '', dob: '', stateOfOrigin: '', nationality: 'Nigerian', classApplying: '', formerSchool: '', classLastRead: '',
  fatherName: '', fatherOccupation: '', fatherAddressPhone: '', motherName: '', motherOccupation: '',
  residentialAddress: '', parentPhone: '', parentEmail: '', emergencyContact: '', emergencyPhone: '',
  guarantorName: '', guarantorPhone: '', guarantorAddress: '',
  oathName: '', oathDate: new Date().toISOString().slice(0, 10), agree: false, guarantorAware: false, website: '',
};

// [name, label, type, required, extra]
const STEPS = [
  { title: 'Pupil details', fields: [
    ['childName', "Pupil's full name", 'text', true], ['sex', 'Sex', 'select', true, ['Male', 'Female']],
    ['dob', 'Date of birth', 'date', true], ['nationality', 'Nationality', 'text', true],
    ['stateOfOrigin', 'State of origin', 'select', true, STATES], ['classApplying', 'Class applying for', 'select', true, CLASSES],
    ['formerSchool', "Former school", 'text', false], ['classLastRead', 'Class last read', 'text', false],
  ] },
  { title: 'Parents & guarantor', fields: [
    ['fatherName', "Father's full name", 'text', true], ['fatherOccupation', "Father's occupation", 'text', false],
    ['fatherAddressPhone', "Father's address and phone number", 'text', false, null, 'full'],
    ['motherName', "Mother's full name", 'text', false], ['motherOccupation', "Mother's occupation", 'text', false],
    ['residentialAddress', 'Parent/guardian residential address', 'text', true, null, 'full'],
    ['parentPhone', 'Parent/guardian phone', 'tel', true], ['parentEmail', 'Parent/guardian email', 'email', false],
    ['emergencyContact', 'Emergency contact (name)', 'text', true], ['emergencyPhone', 'Emergency contact phone', 'tel', true],
    ['guarantorName', 'Guarantor name (a responsible man or woman)', 'text', true], ['guarantorPhone', 'Guarantor phone', 'tel', true],
    ['guarantorAddress', 'Guarantor address', 'text', false, null, 'full'],
  ] },
  { title: 'Declaration', fields: [] },
];

export default function ApplicationForm() {
  const started = useRef(Date.now());
  const top = useRef(null);
  const [step, setStep] = useState(0);
  const [v, setV] = useState(EMPTY);
  const [err, setErr] = useState({});
  const [st, setSt] = useState({ state: 'idle', msg: '', ref: '' });

  const set = (name, val) => { setV((x) => ({ ...x, [name]: val })); if (err[name]) setErr((e) => ({ ...e, [name]: '' })); };

  const validate = (s) => {
    const e = {};
    if (s === 0) {
      if (v.childName.trim().length < 3) e.childName = 'Enter the pupil’s full name.';
      if (!v.sex) e.sex = 'Select sex.';
      if (!v.dob) e.dob = 'Enter date of birth.';
      else { const d = new Date(v.dob); const age = (Date.now() - d) / 31557600000; if (isNaN(d) || age < 1 || age > 25) e.dob = 'Enter a valid date of birth.'; }
      if (!v.nationality.trim()) e.nationality = 'Enter nationality.';
      if (!v.stateOfOrigin) e.stateOfOrigin = 'Select state of origin.';
      if (!v.classApplying) e.classApplying = 'Select the class.';
    }
    if (s === 1) {
      if (v.fatherName.trim().length < 3) e.fatherName = 'Enter the father’s full name.';
      if (v.residentialAddress.trim().length < 6) e.residentialAddress = 'Enter the residential address.';
      ['parentPhone', 'emergencyPhone', 'guarantorPhone'].forEach((k) => { if (!PHONE_RE.test(v[k].trim())) e[k] = 'Enter a valid phone number.'; });
      if (v.parentEmail.trim() && !EMAIL_RE.test(v.parentEmail.trim())) e.parentEmail = 'Enter a valid email address.';
      if (v.emergencyContact.trim().length < 3) e.emergencyContact = 'Enter an emergency contact.';
      if (v.guarantorName.trim().length < 3) e.guarantorName = 'Enter the guarantor’s name.';
    }
    if (s === 2) {
      if (v.oathName.trim().length < 3) e.oathName = 'Type the parent/guardian’s full name.';
      if (!v.oathDate) e.oathDate = 'Enter the date.';
      if (!v.agree) e.agree = 'Please confirm the declaration.';
      if (!v.guarantorAware) e.guarantorAware = 'Please confirm the guarantor will sign the printed form.';
    }
    return e;
  };

  const goto = (n) => { setStep(n); top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const next = () => { const e = validate(step); setErr(e); if (!Object.keys(e).length) goto(step + 1); };

  const submit = async (ev) => {
    ev.preventDefault();
    if (st.state === 'sending') return;
    for (let s = 0; s < 3; s++) { const e = validate(s); if (Object.keys(e).length) { setErr(e); goto(s); return; } }
    if (!SITE.appsScriptUrl) { setSt({ state: 'error', msg: `Online applications are not switched on yet. Please download the PDF form below, or call ${SITE.phoneText}.`, ref: '' }); return; }
    setSt({ state: 'sending', msg: '', ref: '' });
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 30000);
      // text/plain avoids a CORS preflight, which Apps Script does not support
      const res = await fetch(SITE.appsScriptUrl, {
        method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, signal: ctrl.signal,
        body: JSON.stringify({ action: 'apply', startedAt: started.current, data: v }),
      });
      clearTimeout(timer);
      const out = await res.json();
      if (out && out.ok && out.reference) {
        setSt({ state: 'success', msg: '', ref: out.reference });
        setV(EMPTY); setStep(0);
        top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        if (out && out.fields) setErr(out.fields);
        setSt({ state: 'error', msg: (out && out.message) || 'We could not save your application. Please try again.', ref: '' });
      }
    } catch {
      setSt({ state: 'error', msg: `We could not confirm that your application was saved, so please do not assume it was. Check your connection and try again, or call ${SITE.phoneText}.`, ref: '' });
    }
  };

  const field = ([name, label, type, req, opts, span]) => (
    <div key={name} className={`field ${span === 'full' ? 'field--full' : ''} ${err[name] ? 'field--error' : ''}`}>
      <label htmlFor={`ap-${name}`}>{label}{req && <span className="req" aria-hidden="true"> *</span>}</label>
      {type === 'select' ? (
        <select id={`ap-${name}`} value={v[name]} onChange={(e) => set(name, e.target.value)} aria-required={req} aria-invalid={!!err[name]}>
          <option value="">Select…</option>{opts.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input id={`ap-${name}`} type={type} value={v[name]} maxLength={200} onChange={(e) => set(name, e.target.value)} aria-required={req} aria-invalid={!!err[name]} {...(type === 'date' ? { max: new Date().toISOString().slice(0, 10) } : {})} />
      )}
      {err[name] && <p className="field__err" role="alert">{err[name]}</p>}
    </div>
  );

  if (st.state === 'success') {
    return (
      <div className="success-panel" ref={top} role="status">
        <h3>Application received</h3>
        <p>Your application has been saved. Please keep this reference number:</p>
        <p className="ref">{st.ref}</p>
        <p>Submit the supporting documents within one week and quote this number. We will contact you about the entrance assessment.</p>
        <button type="button" className="btn btn--secondary" onClick={() => setSt({ state: 'idle', msg: '', ref: '' })}>Start another application</button>
      </div>
    );
  }

  return (
    <form className="form app-form" onSubmit={submit} noValidate ref={top}>
      <ol className="steps" aria-label="Application progress">
        {STEPS.map((s, n) => <li key={s.title} className={n === step ? 'is-current' : n < step ? 'is-done' : ''} aria-current={n === step ? 'step' : undefined}><span>{n + 1}</span>{s.title}</li>)}
      </ol>

      {step < 2 && <div className="form-grid">{STEPS[step].fields.map(field)}</div>}

      {step === 2 && (
        <div className="form-stack">
          <p className="oath">I declare that the information supplied is true and I agree to abide by the rules and regulations of Wisdom Land Model School.</p>
          <div className="form-grid">
            <div className={`field ${err.oathName ? 'field--error' : ''}`}>
              <label htmlFor="ap-oathName">Parent/guardian name (acts as signature) <span className="req" aria-hidden="true">*</span></label>
              <input id="ap-oathName" value={v.oathName} maxLength={120} onChange={(e) => set('oathName', e.target.value)} aria-invalid={!!err.oathName} />
              {err.oathName && <p className="field__err" role="alert">{err.oathName}</p>}
            </div>
            <div className={`field ${err.oathDate ? 'field--error' : ''}`}>
              <label htmlFor="ap-oathDate">Date <span className="req" aria-hidden="true">*</span></label>
              <input id="ap-oathDate" type="date" value={v.oathDate} onChange={(e) => set('oathDate', e.target.value)} />
              {err.oathDate && <p className="field__err" role="alert">{err.oathDate}</p>}
            </div>
          </div>
          <label className="check"><input type="checkbox" checked={v.agree} onChange={(e) => set('agree', e.target.checked)} /> <span>I confirm the declaration above.</span></label>
          {err.agree && <p className="field__err" role="alert">{err.agree}</p>}
          <label className="check"><input type="checkbox" checked={v.guarantorAware} onChange={(e) => set('guarantorAware', e.target.checked)} /> <span>The guarantor will sign the printed form when I submit the documents (photocopy of last term result, birth certificate, reference letter, two passport photographs).</span></label>
          {err.guarantorAware && <p className="field__err" role="alert">{err.guarantorAware}</p>}
        </div>
      )}

      {/* Honeypot */}
      <div className="hp" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => set('website', e.target.value)} /></label></div>

      <div className="form-actions">
        {step > 0 && <button type="button" className="btn btn--secondary" onClick={() => goto(step - 1)}>Back</button>}
        {step < 2 ? <button type="button" className="btn btn--primary" onClick={next}>Continue</button>
          : <button type="submit" className="btn btn--primary" disabled={st.state === 'sending'}>{st.state === 'sending' ? 'Saving application…' : 'Submit application'}</button>}
      </div>
      <div aria-live="polite">{st.state === 'error' && <p className="notice notice--err">{st.msg}</p>}</div>
    </form>
  );
}
