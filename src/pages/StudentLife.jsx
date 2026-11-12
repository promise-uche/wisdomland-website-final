import { useState } from 'react';
import { ImageSlot, SectionHead, PageHero, useSeo, Icon } from '../components/ui';
import { STUDENT_LIFE, CLUBS, FIND_PLACE, ACHIEVEMENTS, VIDEOS } from '../data/site';
import { gallery } from '../data/gallery';

export default function StudentLife() {
  useSeo({
    title: 'Student Life', path: '/student-life',
    description: 'Sports, arts, technology, science, debate and leadership at Wisdom Land Model School, Ota. See our clubs, awards and photo gallery.',
  });
  const cats = ['All', ...Array.from(new Set(gallery.map((g) => g.category)))];
  const [cat, setCat] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const shown = gallery.filter((g) => cat === 'All' || g.category === cat);

  return (
    <>
      <PageHero title="Student life" text="School is more than lessons. It is where friendships, talents and confidence take root." />

      <section className="section">
        <div className="container life-grid">
          {STUDENT_LIFE.map((b, k) => (
            <article key={b.key} className={`life-block ${k === 0 ? 'life-block--wide' : ''}`}>
              <ImageSlot path={b.img} label={`Photo: ${b.key.toLowerCase()}`} ratio="auto" />
              <div className="life-block__body"><h2>{b.key}</h2><strong>{b.line}</strong><p>{b.text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <SectionHead title="Where will your child find their spark?" text="Every child is different. Some discover theirs on the football field. Others find it in a science laboratory, on a stage, behind a microphone or in a debate." />
          <div className="video-embed">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${VIDEOS.studentLife.id}?rel=0&modestbranding=1`}
              title={VIDEOS.studentLife.title}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <p className="video-embed__link">
            <a href={`https://www.youtube.com/watch?v=${VIDEOS.studentLife.id}`} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
          </p>
          <ul className="values values--light">{FIND_PLACE.map((p) => <li key={p}>{p}</li>)}</ul>
          <h3 className="subhead">Clubs and societies</h3>
          <ul className="chips chips--center">{CLUBS.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
      </section>

      <section className="section" id="achievements">
        <div className="container">
          <SectionHead title="Awards and achievements" text="Recent results from competitions our pupils have entered." />
          <div className="grid grid--2">
            {ACHIEVEMENTS.map((a) => (
              <article key={a.title} className="card card--photo achievement">
                <ImageSlot path={a.img} label={`Photo: ${a.title}`} ratio="16/9" />
                <div className="card__body">
                  <p className="meta">{a.date} · {a.org}</p>
                  <h3>{a.title}</h3>
                  <p className="badge-line"><span className="badge">{a.result}</span> {a.award}</p>
                  <p>{a.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cream" id="gallery">
        <div className="container">
          <SectionHead title="Gallery" text="Moments from across school life." />
          <div className="filters" role="group" aria-label="Filter photos">
            {cats.map((c) => <button key={c} type="button" className={`filter ${cat === c ? 'is-active' : ''}`} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}
          </div>
          <div className="gallery-grid gallery-grid--masonry">
            {shown.map((g, n) => (
              <figure key={`${g.caption}-${n}`} className={`gallery-item ${n % 5 === 0 ? 'gallery-item--tall' : ''}`}>
                {g.placeholder ? (
                  <ImageSlot path={null} label={`Photo: ${g.caption}`} ratio="auto" />
                ) : (
                  <button type="button" className="gallery-item__btn" onClick={() => setLightbox(g)} aria-label={`Enlarge photo: ${g.caption}`}>
                    <img src={g.src} alt={g.caption} loading="lazy" />
                  </button>
                )}
                <figcaption>{g.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={lightbox.caption} onClick={() => setLightbox(null)}>
          <button type="button" className="lightbox__close" aria-label="Close" onClick={() => setLightbox(null)}><Icon name="close" size={26} /></button>
          <img src={lightbox.src} alt={lightbox.caption} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}
