# Setup guide (all free)

Stack: React (Vite) website · Google Apps Script backend · Google Sheets database · Formspree contact form.
Hosting: any free static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages). No paid service is used.

## 1. Run the website locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # creates the deployable /dist folder
```
Requires Node.js 18+.

## 2. Admissions backend (Google Apps Script + Sheets)
1. Sign in with the **school Gmail** (wisdomlandschools@gmail.com). Create a new Google Sheet named "Wisdom Land Admissions". **Do not share it by link.** Add only authorised staff as editors.
2. In the sheet: **Extensions → Apps Script**. Delete the sample code and paste the whole of `apps-script/Code.gs`.
3. Check `SCHOOL_EMAIL` at the top. Click **Save**, choose the function **setup** and click **Run**. Approve the permissions (Sheets + Gmail send). This creates the "Applications" tab, headers and the Status drop-down.
4. **Deploy → New deployment → type: Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**  (this lets the website submit; the sheet itself stays private, and the script can only *add* rows)
5. Copy the Web app URL (ends in `/exec`) into `.env` as `VITE_APPS_SCRIPT_URL`.
6. After editing Code.gs later: **Deploy → Manage deployments → Edit → New version**.

Behaviour: validation and sanitising on the server, hidden honeypot, minimum fill-time, site-wide rate limit, duplicate detection, unique reference (`WLMS-2026-00001`), row saved and verified **before** success is shown, email to the school contains the reference number only. If saving fails, the applicant sees an error, never a false success.

Staff workflow: change the **Status** column (New → Documents Received → Assessment Scheduled → Offer Made → Registered). Tick "Documents Received" notes in the Staff Notes column.

## 3. Contact form (Formspree)
1. Create a free account at formspree.io using wisdomlandschools@gmail.com, then create a form.
2. Copy the form ID (the part after `/f/`) into `.env` as `VITE_FORMSPREE_ID`.
3. In Formspree settings, enable reCAPTCHA / spam filtering if you wish. The form already has a honeypot and a minimum fill-time.

## 4. Environment variables
Copy `.env.example` to `.env`. On Netlify/Vercel add the same three variables in the dashboard before building.

| Variable | Purpose |
|---|---|
| VITE_SITE_URL | Live domain, no trailing slash. Used for canonical URLs, sitemap, structured data |
| VITE_FORMSPREE_ID | Contact form |
| VITE_APPS_SCRIPT_URL | Admissions backend |

## 5. Deploy
Build command `npm run build`, publish directory `dist`. `vercel.json` and `public/_redirects` already handle page refreshes. After going live, submit `https://yourdomain/sitemap.xml` in Google Search Console. Sitelinks are chosen by Google; the clear navigation, structured data and sitemap here give it what it needs.

## 6. Things to replace
- Facebook/Instagram links and the motto: `src/data/site.js`
- Parent testimonials, staff names, stats ([00]% and [000]), intake dates: `src/data/site.js` and `src/pages/Home.jsx`
- Class structure was inconsistent in the source documents (Nursery 1–6 vs Primary 1–5). Used Nursery 1–3 and Primary 1–6; edit `LEVELS` in `src/data/site.js`.
- Principal's welcome and school story were written from the supplied notes; please have the school approve them.
- Privacy page is a general template; have it reviewed against the Nigeria Data Protection Act.

## Security checklist
- Spreadsheet private; never publish it to the web.
- No API keys exist in the front end (Formspree ID and the Apps Script URL are public by design).
- No document uploads are collected online. Supporting documents are submitted physically, so no Google Drive storage is needed. 
