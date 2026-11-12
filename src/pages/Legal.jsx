import { Link } from 'react-router-dom';
import { PageHero, Button, useSeo } from '../components/ui';
import { SITE } from '../data/site';

export function Privacy() {
  useSeo({ title: 'Privacy Policy & Terms', path: '/privacy', description: 'How Wisdom Land Model School collects, uses and protects information, plus website terms of use.' });
  return (
    <>
      <PageHero title="Privacy policy and terms" text="Last updated: October 2026. This is a general notice; have it reviewed against current Nigerian data protection law (NDPA 2023)." />
      <section className="section"><div className="container prose prose--narrow">
        <h2>Information we collect</h2>
        <p>When you apply, we collect your child’s details and the details of parents, guardians, an emergency contact and a guarantor. When you use the contact form, we collect your name, email, phone number and message.</p>
        <h2>How we use it</h2>
        <p>We use this information only to process applications, respond to enquiries, run the school and meet legal duties. We do not sell personal information or use it for advertising.</p>
        <h2>Who can see it</h2>
        <p>Application records are stored in a private school database and are accessible only to authorised staff. Contact messages are delivered to the school’s email through our form provider, Formspree.</p>
        <h2>Keeping it safe</h2>
        <p>Information is checked and cleaned on submission and stored with access limited to authorised staff. No method of transmission over the internet is completely secure, so please never include passwords or bank details in a message.</p>
        <h2>Your rights</h2>
        <p>You may ask to see, correct or delete the information we hold about you or your child. Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. We keep unsuccessful applications for a limited period before deleting them.</p>
        <h2>Admissions, fees and uniforms</h2>
        <p>Admission is subject to the entrance assessment, available space and submission of required documents. Fees, uniforms and school rules are communicated at registration and may be reviewed each session. A place is confirmed only after registration and payment.</p>
        <h2>Website terms</h2>
        <p>The content of this website belongs to Wisdom Land Model Schools and may not be copied for commercial use without permission. We work to keep information accurate, but dates and details may change; please confirm with the school office.</p>
        <p><Link to="/contact" className="text-link">Contact the school</Link> if you have questions.</p>
      </div></section>
    </>
  );
}

export function NotFound() {
  useSeo({ title: 'Page not found', path: '/404', description: 'Page not found.' });
  return (
    <section className="section"><div className="container center-text">
      <h1>We can’t find that page</h1>
      <p className="lead">The link may be old or mistyped.</p>
      <Button to="/">Go to the home page</Button>
    </div></section>
  );
}
