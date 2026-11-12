import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '../data/site';

/* Image with automatic labelled placeholder. Put the real file at public/images/<path>. */
export function ImageSlot({ path, label, alt, className = '', ratio = '4/3', eager = false, src: direct }) {
  const [failed, setFailed] = useState(false);
  const src = direct || `/images/${path}`;
  const show = !failed && (direct || path);
  return (
    <div className={`img-slot ${className}`} style={{ aspectRatio: ratio }}>
      {show ? (
        <img src={src} alt={alt || label} loading={eager ? 'eager' : 'lazy'} onError={() => setFailed(true)} />
      ) : (
        <div className="img-slot__ph" role="img" aria-label={alt || label}>
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path fill="currentColor" d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2ZM8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5Z" /></svg>
          <strong>{label}</strong>
          {path && <small>public/images/{path}</small>}
        </div>
      )}
    </div>
  );
}

export function Logo({ light = false }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span className="logo-mark" aria-hidden="true">WL</span>
  ) : (
    <img className="logo-img" src="/images/brand/logo.png" alt="" width="48" height="48" onError={() => setFailed(true)} />
  );
}

// Exam logo: shows /images/exams/<slug>.png if you add one, otherwise a coloured placeholder badge.
export function ExamLogo({ slug, short, color }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span className="exam-badge" style={{ '--c': color }} aria-hidden="true">{short}</span>
  ) : (
    <img className="exam-logo-img" src={`/images/exams/${slug}.png`} alt="" width="84" height="84" loading="lazy" onError={() => setFailed(true)} />
  );
}

const ICONS = {
  teacher: 'M12 3 1 9l11 6 9-4.9V17h2V9L12 3Zm-6 9.2V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-3.8l-6 3.3-6-3.3Z',
  shield: 'M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Zm-1 14-3-3 1.4-1.4L11 13.2l4.6-4.6L17 10l-6 6Z',
  lab: 'M9 2v2h1v5.6L4.6 19A2 2 0 0 0 6.3 22h11.4a2 2 0 0 0 1.7-3L14 9.6V4h1V2H9Zm3 9.4 2 3.6h-4l2-3.6Z',
  trophy: 'M18 3H6v2H3v3a4 4 0 0 0 3.2 3.9A6 6 0 0 0 11 15.9V19H8v2h8v-2h-3v-3.1a6 6 0 0 0 4.8-4A4 4 0 0 0 21 8V5h-3V3ZM5 8V7h1v3.8A2 2 0 0 1 5 8Zm14 0a2 2 0 0 1-1 2.8V7h1v1Z',
  heart: 'm12 21-1.5-1.3C5.4 15.1 2 12 2 8.5A4.5 4.5 0 0 1 6.5 4 5 5 0 0 1 12 6.1 5 5 0 0 1 17.5 4 4.5 4.5 0 0 1 22 8.5c0 3.5-3.4 6.6-8.5 11.2L12 21Z',
  pin: 'M12 2a7 7 0 0 0-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z',
  phone: 'M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11 11 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.6 3.6a1 1 0 0 1-.25 1l-2.2 2.2Z',
  mail: 'M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z',
  clock: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 11H7v-2h4V6h2v7Z',
  whatsapp: 'M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Zm-3 11h-2l-1.500 1.500C11 13.500 9.500 12 9 10.500L10.500 9V7H8c-.6 0-1 .4-1 1 0 5 4 9 9 9 .6 0 1-.4 1-1v-3Z',
  facebook: 'M22 12a10 10 0 1 0-11.6 9.900v-7H7.900V12h2.500V9.800c0-2.500 1.500-3.900 3.800-3.900 1.100 0 2.200.2 2.200.2v2.500h-1.300c-1.200 0-1.600.8-1.600 1.600V12h2.800l-.4 2.900h-2.300v7A10 10 0 0 0 22 12Z',
  instagram: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.500-3.200a1.200 1.200 0 1 1 0 2.400 1.200 1.200 0 0 1 0-2.400Z',
  youtube: 'M21.600 7.200a2.500 2.500 0 0 0-1.800-1.800C18.200 5 12 5 12 5s-6.200 0-7.800.4A2.500 2.500 0 0 0 2.400 7.200C2 8.800 2 12 2 12s0 3.200.4 4.800a2.500 2.500 0 0 0 1.800 1.800C5.800 19 12 19 12 19s6.200 0 7.800-.4a2.500 2.500 0 0 0 1.800-1.800c.4-1.600.4-4.800.4-4.800s0-3.200-.4-4.800ZM10 15V9l5.200 3L10 15Z',
  download: 'M5 20h14v-2H5v2ZM12 2v10.2L8.400 8.600 7 10l5 5 5-5-1.400-1.400L13 12.200V2h-1Z',
  check: 'M9 16.2 4.800 12l-1.400 1.400L9 19 21 7l-1.400-1.400L9 16.200Z',
  chevron: 'M7.400 8.600 12 13.200l4.600-4.600L18 10l-6 6-6-6 1.400-1.400Z',
  menu: 'M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z',
  close: 'M18.300 5.700 12 12l6.300 6.300-1.400 1.400L10.600 13.400 4.300 19.700 2.900 18.300 9.200 12 2.900 5.700 4.300 4.300l6.300 6.300 6.300-6.300 1.400 1.400Z',
  sun: 'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10ZM11 1h2v3h-2V1Zm0 19h2v3h-2v-3ZM1 11h3v2H1v-2Zm19 0h3v2h-3v-2ZM4.200 5.600l1.400-1.400 2.100 2.100-1.400 1.400-2.100-2.100Zm12.100 12.100 1.400-1.400 2.100 2.100-1.400 1.400-2.100-2.100ZM5.600 19.800l-1.400-1.400 2.100-2.100 1.400 1.400-2.100 2.100ZM17.700 7.700l-1.400-1.400 2.100-2.100 1.400 1.400-2.100 2.100Z',
  moon: 'M21 12.800A9 9 0 1 1 11.200 3a7 7 0 0 0 9.800 9.800Z',
  computer: 'M3 4h18a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-7v2h3v2H7v-2h3v-2H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm1 2v9h16V6H4Z',
  book: 'M4 4h6a3 3 0 0 1 2 .8A3 3 0 0 1 14 4h6v15h-6a2 2 0 0 0-2 2 2 2 0 0 0-2-2H4V4Zm2 2v11h4q.6 0 1 .2V7a1 1 0 0 0-1-1H6Zm7 1v10.200q.4-.2 1-.2h4V6h-4a1 1 0 0 0-1 1Z',
  hall: 'M12 2 2 7v2h20V7L12 2ZM5 11v6h2v-6H5Zm4 0v6h2v-6H9Zm4 0v6h2v-6h-2Zm4 0v6h2v-6h-2ZM3 19v2h18v-2H3Z',
  arrow: 'M4 11h12.200l-5.600-5.600L12 4l8 8-8 8-1.400-1.400 5.600-5.600H4v-2Z',
};
export function Icon({ name, size = 20 }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" fillRule="evenodd" d={ICONS[name] || ICONS.check} />
    </svg>
  );
}

export function Button({ to, href, variant = 'primary', children, download, external, ...rest }) {
  const cls = `btn btn--${variant}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  return <a href={href} className={cls} download={download} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>{children}</a>;
}

export function SectionHead({ title, text, align = 'center', as: Tag = 'h2' }) {
  return (
    <header className={`section-head section-head--${align}`}>
      <Tag>{title}</Tag>
      {text && <p>{text}</p>}
    </header>
  );
}

export function PageHero({ title, text, crumb }) {
  return (
    <section className="page-hero">
      <div className="container">
        {crumb && <nav className="crumbs" aria-label="Breadcrumb">{crumb}</nav>}
        <h1>{title}</h1>
        {text && <p className="lead">{text}</p>}
      </div>
    </section>
  );
}

/* Per-page SEO: title, description, canonical, Open Graph, optional JSON-LD */
export function useSeo({ title, description, path = '/', jsonLd }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Wisdom Land Model School, The Bells, Ota` : 'Wisdom Land Model School, The Bells, Ota | Nursery, Primary & Secondary School';
    document.title = fullTitle;
    const set = (sel, attr, val, create) => {
      let el = document.head.querySelector(sel);
      if (!el && create) { el = document.createElement(create.tag); Object.entries(create.attrs).forEach(([k, v]) => el.setAttribute(k, v)); document.head.appendChild(el); }
      if (el) el.setAttribute(attr, val);
    };
    const url = SITE.siteUrl + (path === '/' ? '/' : path);
    set('meta[name="description"]', 'content', description, { tag: 'meta', attrs: { name: 'description' } });
    set('link[rel="canonical"]', 'href', url, { tag: 'link', attrs: { rel: 'canonical' } });
    set('meta[property="og:title"]', 'content', fullTitle, { tag: 'meta', attrs: { property: 'og:title' } });
    set('meta[property="og:description"]', 'content', description, { tag: 'meta', attrs: { property: 'og:description' } });
    set('meta[property="og:url"]', 'content', url, { tag: 'meta', attrs: { property: 'og:url' } });
    let ld = document.getElementById('page-jsonld');
    if (jsonLd) {
      if (!ld) { ld = document.createElement('script'); ld.id = 'page-jsonld'; ld.type = 'application/ld+json'; document.head.appendChild(ld); }
      ld.textContent = JSON.stringify(jsonLd);
    } else if (ld) ld.remove();
  }, [title, description, path, jsonLd]);
}
