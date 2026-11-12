import { ImageSlot, SectionHead, PageHero, Icon, useSeo } from '../components/ui';
import { CORE_VALUES, MISSION, STAFF, FACILITIES, SITE, yearsOpen } from '../data/site';

export default function About() {
  useSeo({
    title: 'About Us', path: '/about',
    description: 'The story, vision, mission, core values, leadership and facilities of Wisdom Land Model School, The Bells, Ota. Founded in September 2010.',
    jsonLd: { '@context': 'https://schema.org', '@type': 'AboutPage', name: 'About Wisdom Land Model School', url: `${SITE.siteUrl}/about` },
  });
  const leaders = STAFF.filter((s) => s.lead);
  const teachers = STAFF.filter((s) => !s.lead);

  return (
    <>
      <PageHero title="About Wisdom Land" text="A school in Ota with a simple belief: wisdom is the principal thing." />

      <section className="section" id="story">
        <div className="container split">
          <div className="prose">
            <h2>Our story</h2>
            <p>Wisdom Land Model School opened in September 2010. It grew from a vision that its founder, Dr Akojede Abiodun, received in August 1996 in Osun State. He believed a good school should bring quality education to the grassroots, at a price an average Nigerian family can afford.</p>
            <p>We began with 14 pupils and 10 staff at Lola Engineering Bus Stop, near Bells University in Ota. Our first Principal was Mr Faithful Ugorji. We were not the first school in the area, but discipline and hardworking teachers soon made us one of the most trusted.</p>
            <p>Dr Akojede brought years of experience as a head teacher and principal in Abuja, Benin, Ile-Ife, Lagos and Ota. His guiding principle is “Catch them young.” Today, more than {yearsOpen()} years on, that principle still shapes every classroom.</p>
          </div>
          <ImageSlot path="about/our-story.jpg" label="Photo: the school then and now" ratio="4/3" className="img-rounded" />
        </div>
        <div className="container">
          <ol className="timeline">
            <li><strong>1996</strong><span>The vision is received.</span></li>
            <li><strong>Sept 2010</strong><span>The school opens with 14 pupils and 10 staff.</span></li>
            <li><strong>Today</strong><span>Nursery, primary, secondary and pre-university programmes.</span></li>
          </ol>
        </div>
      </section>

      <section className="section section--cream" id="vision">
        <div className="container">
          <div className="grid grid--2">
            <article className="card card--feature"><h2 className="h3-like">Our vision</h2><p className="big">To be one of the best ten schools in the state within ten years.</p></article>
            <article className="card card--feature"><h2 className="h3-like">Our mission</h2><ul className="tick-list">{MISSION.map((m) => <li key={m}>{m}</li>)}</ul></article>
          </div>
          <p className="objective">We exist to support social services in the state and to bring education to the grassroots, making it affordable for an average Nigerian.</p>
        </div>
      </section>

      <section className="section" id="values">
        <div className="container">
          <SectionHead title="Our motto and core values" text={`“${SITE.motto}”`} />
          <ul className="values">{CORE_VALUES.map((v, i) => <li key={v} className={`tint-${(i % 7) + 1}`}>{v}</li>)}</ul>
        </div>
      </section>

      <section className="section section--green" id="principal">
        <div className="container principal principal--dark">
          <ImageSlot path="about/principal.jpg" label="Photo: Mrs Akojede, Principal" ratio="4/5" className="img-rounded" />
          <div className="prose">
            <h2>A welcome from the Principal</h2>
            <p>Welcome to Wisdom Land Model School. Every child who walks through our gate carries something unique, and our work is to help them find it.</p>
            <p>We teach with firmness and with love. Pupils learn to ask good questions, to work hard, to respect others and to believe in themselves. We watch each one closely, celebrate their small steps and correct them kindly when they stray.</p>
            <p>We hope every pupil leaves us not only with excellent results, but with character, faith and the confidence to be useful to their family and society. Thank you for trusting us with your child.</p>
            <p className="sign"><strong>Mrs Akojede</strong><br />Principal, Wisdom Land Model Schools</p>
          </div>
        </div>
      </section>

      <section className="section" id="management">
        <div className="container">
          <SectionHead title="The people behind the journey" text="Leaders and teachers who guide every pupil." />
          <div className="grid grid--4">
            {leaders.map((s) => (
              <article key={s.role} className="person">
                <ImageSlot path={s.img} label={`Photo: ${s.role}`} ratio="4/5" />
                <h3>{s.name}</h3><strong>{s.role}</strong>
              </article>
            ))}
          </div>
          {/* <h3 className="subhead">Our teachers</h3>
          <div className="grid grid--4">
            {teachers.map((s, n) => (
              <article key={n} className="person person--sm">
                <ImageSlot path={s.img} label={`Photo: ${s.role}`} ratio="1/1" />
                <h3>{s.name}</h3><strong>{s.role}</strong><p>{s.note}</p>
              </article>
            ))}
          </div> */}
        </div>
      </section>

      <section className="section section--cream" id="environment">
        <div className="container">
          <SectionHead title="Our learning environment" text="The spaces where our pupils learn, explore, play and grow." />
          <div className="grid grid--3">
            {FACILITIES.map((f, i) => (
              <article key={f.title} className="card card--photo">
                <ImageSlot path={f.img} label={`Photo: ${f.title}`} ratio="3/2" />
                <div className="card__body">
                  <div className="card__titlerow"><span className={`card__icon tint-${(i % 6) + 1}`}><Icon name={f.icon} size={22} /></span><h3>{f.title}</h3></div>
                  <p>{f.text}</p>
                </div>
              </article>
            ))}
          </div>
          <ul className="chips" aria-label="Also on campus">
            {['Sick bay / clinic', 'Cafeteria', 'School transport', 'Security & CCTV', 'Power backup'].map((c) => <li key={c}>{c}</li>)}
          </ul>
        </div>
      </section>
    </>
  );
}
