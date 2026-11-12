import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ImageSlot, Button, Icon, SectionHead, useSeo } from '../components/ui';
import { PATHS, JOURNEY, EXPERIENCES, WHY_CHOOSE, TESTIMONIALS, SITE, yearsOpen } from '../data/site';
import { gallery } from '../data/gallery';

const SLIDES = [
  { h: 'Where Young Minds Begin to Discover What They Can Become.', p: 'Every child arrives with questions, talents and big dreams. Here they explore, try new things and see a bright future take shape.', img: 'hero/slide-1.jpg' },
  { h: 'Every Great Journey Starts with a Step.', p: 'We build the strong foundation that lifelong learning stands on: reading, reasoning, good habits and the courage to keep going.', img: 'hero/slide-2.jpg' },
  { h: 'Learn Today. Lead Tomorrow.', p: 'We nurture creativity and character, preparing young minds to lead with wisdom, discipline and integrity.', img: 'hero/slide-3.jpg' },
];

function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section className="hero" aria-roledescription="carousel" aria-label="Welcome to Wisdom Land" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      {SLIDES.map((s, n) => (
        <div key={s.img} className={`hero__slide ${n === i ? 'is-active' : ''}`} aria-hidden={n !== i} role="group" aria-roledescription="slide" aria-label={`${n + 1} of ${SLIDES.length}`}>
          <ImageSlot className="hero__bg" path={s.img} label={`Hero photo ${n + 1}`} alt="" ratio="auto" eager={n === 0} />
          <div className="hero__shade" />
          <div className="container hero__inner">
            <div className="hero__copy">
              {n === 0 ? <h1>{s.h}</h1> : <h2 className="h1-like">{s.h}</h2>}
              <p className="lead">{s.p}</p>
              <div className="btn-row">
                <Button to="/admissions#apply" tabIndex={n === i ? 0 : -1}>Apply Now</Button>
                <Button to="/about" variant="outline" tabIndex={n === i ? 0 : -1}>Explore Our School</Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="hero__bar">
        <div className="container hero__bar-row">
          <div className="hero__levels" aria-label="Levels offered"><span>Nursery</span><i aria-hidden="true" /><span>Primary</span><i aria-hidden="true" /><span>Secondary</span></div>
          <div className="hero__dots" role="tablist" aria-label="Choose slide">
            {SLIDES.map((_, n) => (
              <button key={n} type="button" role="tab" aria-selected={n === i} aria-label={`Show slide ${n + 1}`} className={n === i ? 'is-active' : ''} onClick={() => setI(n)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useSeo({
    title: null, path: '/',
    description: 'Wisdom Land Model School, Lola Engineering Bus Stop, Bells University Junction, Ota. Nursery, primary, secondary and pre-university education built on faith, discipline and excellence. Apply today.',
  });
  const preview = gallery.slice(0, 4);

  return (
    <>
      <Hero />

      <section className="section paths" id="day-and-boarding">
        <div className="container paths__split">
          <div className="paths__text">
            <span className="paths__eyebrow">Two ways to learn</span>
            <h2>Day or Boarding. One Wisdom Land standard.</h2>
            <p>Choose what fits your family. Both come with the same strong teaching and warm care.</p>

            <ul className="paths__options">
              {PATHS.map((p) => (
                <li key={p.key} className={`path-opt path-opt--${p.key}`}>
                  <span className="path-opt__icon"><Icon name={p.icon} size={28} /></span>
                  <div className="path-opt__copy">
                    <h3>{p.title}</h3>
                    <p>{p.line}</p>
                  </div>
                  <span className="path-opt__tag"><Icon name="check" size={14} />Available</span>
                </li>
              ))}
            </ul>

            <div className="btn-row">
              <Button to="/admissions#apply">Apply Now</Button>
              <Link to="/contact" className="text-link">Talk to admissions <Icon name="arrow" size={16} /></Link>
            </div>
          </div>

          <div className="paths__media">
            <ImageSlot path="home/day-and-boarding.webp" label="Photo: Wisdom Land pupils, day and boarding" ratio="4/5" className="img-rounded" />
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <SectionHead title="From little learners to confident young adults." text="A clear path through every stage of school life." />
          <ol className="journey">
            {JOURNEY.map((j, n) => (
              <li key={j.stage} className="journey__step">
                <span className="journey__verb">{j.verb}</span>
                <h3>{j.stage}</h3>
                <p>{j.text}</p>
                <Link to={j.to} className="text-link">Learn more <Icon name="arrow" size={16} /></Link>
                {n < JOURNEY.length - 1 && <span className="journey__arrow" aria-hidden="true"><Icon name="arrow" size={22} /></span>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container principal">
          <ImageSlot path="about/principal.jpg" label="Photo: the Principal" ratio="4/5" className="img-rounded" />
          <div>
            <h2>A school is built around people.</h2>
            <blockquote>“We believe every child carries something unique, and our work is to help them find it.”</blockquote>
            <p>At Wisdom Land, we know every pupil by name. Our teachers combine firm discipline with real warmth, so children feel safe enough to ask, try and sometimes fail on the way to getting it right.</p>
            <p>Faith, hard work and good character sit beside academic excellence. That is how we raise young people who are useful to themselves and to society.</p>
            <Link to="/about#management" className="btn btn--secondary">Meet our management</Link>
          </div>
        </div>
      </section>

      <section className="section section--green">
        <div className="container">
          <SectionHead title="What happens here?" text="School isn't just about what children learn. It's about what they become while learning it." />
          <div className="grid grid--4">
            {EXPERIENCES.map((e) => (
              <article key={e.word} className="exp-card">
                <ImageSlot path={e.img} label={`Photo: ${e.word}`} ratio="4/3" />
                <div className="exp-card__body"><h3>{e.word}</h3><strong>{e.title}</strong><p>{e.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Why families choose us" />
          <div className="grid grid--3">
            {WHY_CHOOSE.map((w) => (
              <article key={w.title} className="card card--icon">
                <span className="card__icon"><Icon name={w.icon} size={26} /></span>
                <h3>{w.title}</h3><p>{w.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container stats__row">
          <div><strong>{yearsOpen()}+</strong><span>Years of teaching</span></div>
          <div><strong>2010</strong><span>Founded in Ota</span></div>
          <div><strong>100%</strong><span>WAEC pass rate</span></div>
          <div><strong>300+</strong><span>Pupils</span></div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <SectionHead title="Why families stay" text="Words from parents of children in our school." />
          <div className="grid grid--3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="quote-card">
                <blockquote>{t.text}</blockquote>
                <figcaption><strong>{t.name}</strong><span>{t.role}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container gallery-teaser">
          <div className="gallery-teaser__text">
            <h2>Life at Wisdom Land</h2>
            <p>Sports days, lab sessions, concerts and quiet moments in class. A few photos from our school.</p>
            <Button to="/student-life#gallery" variant="secondary">View More</Button>
          </div>
          <div className="gallery-grid gallery-grid--4">
            {preview.map((g, n) => (
              <ImageSlot key={n} src={g.src} path={null} label={g.caption} alt={g.caption} ratio="1/1" className="img-rounded" />
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band cta-band--tall">
        <div className="container cta-band__inner">
          <h2>Your Child's journey starts with a step.</h2>
          <p>Maybe this is where your child's next chapter begins.</p>
          <div className="btn-row">
            <Button href={SITE.whatsapp} external variant="outline-light">Book a Visit</Button>
            <Button to="/admissions#apply">Apply Now</Button>
          </div>
        </div>
      </section>
    </>
  );
}
