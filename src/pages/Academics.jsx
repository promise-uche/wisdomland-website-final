import { Link, Navigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { ImageSlot, Button, Icon, SectionHead, PageHero, ExamLogo, useSeo } from '../components/ui';
import { LEVELS, LEARNING, EXAMS, SITE } from '../data/site';

const ORDER = [
  ['01', 'Discover', 'Nursery & Primary School', 'Learning begins with curiosity. Play-based early years, then strong foundations in literacy, numeracy and science.', '/academics/nursery-primary', 'academics/nursery-primary.jpg'],
  ['02', 'Develop', 'Junior Secondary School', 'A bridge from foundations to deeper exploration, critical thinking and independence.', '/academics/junior-secondary', 'academics/junior-secondary.jpg'],
  ['03', 'Become', 'Senior Secondary School', 'Advanced subjects and focused WAEC, NECO and JAMB preparation for the next stage.', '/academics/senior-secondary', 'academics/senior-secondary.jpg'],
  ['04', 'Advance', 'Pre-University Programme', 'JUPEB and IJMB routes to Direct Entry university admission.', '/academics/pre-university', 'academics/pre-university.jpg'],
];

export function AcademicsOverview() {
  useSeo({
    title: 'Academics', path: '/academics',
    description: 'Academics at Wisdom Land Model School, Ota: Nursery, Primary, Junior Secondary, Senior Secondary and JUPEB/IJMB pre-university programmes.',
  });
  return (
    <>
      <PageHero title="Academics" text="Every stage of learning builds on the one before it. From first curious questions in Nursery to the confidence of sitting WAEC, we help pupils grow in knowledge, character and independence." />
      <section className="section">
        <div className="container stages">
          {ORDER.map(([n, verb, title, text, to, img], k) => (
            <article key={to} className={`stage ${k % 2 ? 'stage--flip' : ''}`}>
              <ImageSlot path={img} label={`Photo: ${title}`} ratio="3/2" className="img-rounded" />
              <div>
                <p className="stage__no"><span>{n}</span> {verb}</p>
                <h2>{title}</h2>
                <p>{text}</p>
                <Link to={to} className="text-link">Explore {title.split(' ')[0]} <Icon name="arrow" size={16} /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <SectionHead title="What learning looks like here" text="We teach through doing. Here is how the curriculum comes alive." />
          <div className="grid grid--3">
            {LEARNING.map((l) => (
              <article key={l.word} className="card card--icon">
                <span className="card__emoji" aria-hidden="true">{l.icon}</span>
                <h3>{l.word}</h3><p>{l.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="examinations">
        <div className="container">
          <SectionHead title="Examinations We Prepare Students For" text="Comprehensive preparation for national and international examinations" />
          <ul className="exam-grid">
            {EXAMS.map((e) => (
              <li key={e.slug} className="exam-card">
                <div className="exam-card__logo"><ExamLogo slug={e.slug} short={e.short} color={e.color} /></div>
                <h3>{e.name}</h3>
                <p>{e.sub}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function Subjects({ list, label = 'View subjects' }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="subjects">
      <button type="button" className="btn btn--secondary btn--sm" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Hide subjects' : label}</button>
      {open && <ul className="chips">{list.map((s) => <li key={s}>{s}</li>)}</ul>}
    </div>
  );
}

export function LevelPage() {
  const { level } = useParams();
  const data = LEVELS[level];
  useSeo({
    title: data ? data.seoTitle : 'Academics', path: `/academics/${level}`,
    description: data ? `${data.title} at Wisdom Land Model School, The Bells, Ota. ${data.intro}` : 'Academics',
  });
  if (!data) return <Navigate to="/academics" replace />;
  return (
    <>
      <PageHero title={data.title} text={data.intro} crumb={<><Link to="/academics">Academics</Link> / {data.title}</>} />
      {data.sections.map((s, k) => (
        <section key={s.heading} className={`section ${k % 2 ? 'section--cream' : ''}`}>
          <div className="container split">
            <div className="prose">
              <p className="stage__verb">{s.verb}</p>
              <h2>{s.heading}</h2>
              <p>{s.text}</p>
              {s.facts && <dl className="facts">{s.facts.map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl>}
              {s.subjects && <Subjects list={s.subjects} />}
              {s.programmes && s.programmes.map((p) => (
                <article key={p.name} className="card card--feature"><h3>{p.name} <small>{p.full}</small></h3><p>{p.text}</p></article>
              ))}
            </div>
            <ImageSlot path={s.img} label={`Photo: ${s.heading}`} ratio="4/3" className="img-rounded" />
          </div>
          {s.tracks && (
            <div className="container tracks">
              {s.tracks.map((t) => (
                <article key={t.name} className="card"><h3>{t.name}</h3><ul className="tick-list">{t.list.map((x) => <li key={x}>{x}</li>)}</ul></article>
              ))}
            </div>
          )}
        </section>
      ))}
      <section className="cta-band">
        <div className="container cta-band__inner">
          <div><h2>Ready to take the next step?</h2><p>Apply online or speak with our admissions office.</p></div>
          <div className="btn-row"><Button to="/admissions#apply">Apply Now</Button><Button href={SITE.phoneHref} variant="outline-light">Call {SITE.phone}</Button></div>
        </div>
      </section>
    </>
  );
}
