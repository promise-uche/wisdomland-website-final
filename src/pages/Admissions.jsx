import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Icon, PageHero, SectionHead, useSeo } from '../components/ui';
import ApplicationForm from '../components/ApplicationForm';
import { ADMISSION_STEPS, REQUIREMENTS, INTAKES, SITE } from '../data/site';

export default function Admissions() {
  useSeo({
    title: 'Admissions', path: '/admissions',
    description: 'How to apply to Wisdom Land Model School, The Bells, Ota: admission steps, entry requirements, online application and downloadable PDF form.',
    jsonLd: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Admissions', url: `${SITE.siteUrl}/admissions` },
  });
  const [tab, setTab] = useState('online');
  const { hash } = useLocation();
  useEffect(() => {
    if (hash === '#apply') setTimeout(() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' }), 80);
  }, [hash]);

  return (
    <>
      <PageHero title="Admissions" text="Joining Wisdom Land takes six simple steps. Start online today, or download the form and bring it to the school office." />

      <section className="section section--tight">
        <div className="container">
          <ol className="process">
            {ADMISSION_STEPS.map(([t, d], n) => (
              <li key={t}><span className="process__n">{n + 1}</span><h3>{t}</h3><p>{d}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--cream section--tight">
        <div className="container grid grid--2 info-pair">
          <article className="card">
            <h2 className="h3-like">Entry requirements</h2>
            <ul className="tick-list">{REQUIREMENTS.map((r) => <li key={r}>{r}</li>)}</ul>
            <p className="note">Submit the documents within one week of applying.</p>
          </article>
          <article className="card">
            <h2 className="h3-like">Intake dates</h2>
            <dl className="facts facts--tight">{INTAKES.map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl>
            <p className="note">Dates are confirmed by the school each session. Call {SITE.phoneText} to check.</p>
          </article>
        </div>
      </section>

      <section className="section" id="apply">
        <div className="container apply">
          <SectionHead title="Apply to Wisdom Land" text="Choose how you would like to apply." />
          <div className="tabs" role="tablist" aria-label="Application method">
            <button role="tab" id="tab-online" aria-selected={tab === 'online'} aria-controls="panel-online" className={tab === 'online' ? 'is-active' : ''} onClick={() => setTab('online')}>Apply online</button>
            <button role="tab" id="tab-pdf" aria-selected={tab === 'pdf'} aria-controls="panel-pdf" className={tab === 'pdf' ? 'is-active' : ''} onClick={() => setTab('pdf')}>Download the form</button>
          </div>
          {tab === 'online' ? (
            <div role="tabpanel" id="panel-online" aria-labelledby="tab-online" className="panel"><ApplicationForm /></div>
          ) : (
            <div role="tabpanel" id="panel-pdf" aria-labelledby="tab-pdf" className="panel panel--center">
              <span className="card__icon card__icon--lg"><Icon name="download" size={30} /></span>
              <h3>Admission application form (PDF)</h3>
              <p>Print the form, complete it by hand and return it to the school office at {SITE.address}, with the documents listed above.</p>
              <a className="btn btn--primary" href="/admission-form.pdf" download="Wisdom-Land-Admission-Form.pdf"><Icon name="download" size={18} /> Download admission form</a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
