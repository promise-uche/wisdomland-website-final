import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { NAV, SITE } from '../data/site';
import { Icon, Logo } from './ui';
import ContactForm from './ContactForm';

function Header() {
  const [open, setOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const [mobDd, setMobDd] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => { setOpen(false); setDdOpen(false); setMobDd(false); window.scrollTo(0, 0); }, [loc.pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    const esc = (e) => { if (e.key === 'Escape') { setDdOpen(false); setOpen(false); } };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, []);

  const inAcademics = loc.pathname.startsWith('/academics');

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-row">
        <Link to="/" className="brand" aria-label="Wisdom Land Model Schools home">
          <Logo />
          <span className="brand__text brand__text--stacked"><strong>WISDOM LAND<br />MODEL SCHOOLS</strong></span>
        </Link>

        <nav className={`main-nav ${open ? 'is-open' : ''}`} id="main-nav" aria-label="Main">
          <ul>
            {NAV.map((item) => item.children ? (
              <li key={item.label} className={`has-dd ${ddOpen ? 'dd-open' : ''} ${mobDd ? 'mob-open' : ''}`}
                  onMouseEnter={() => window.innerWidth > 960 && setDdOpen(true)} onMouseLeave={() => setDdOpen(false)}>
                <button type="button" className={`nav-link nav-link--btn ${inAcademics ? 'active' : ''}`} aria-expanded={ddOpen || mobDd}
                  aria-haspopup="true" onClick={() => (window.innerWidth > 960 ? setDdOpen(!ddOpen) : setMobDd(!mobDd))}>
                  {item.label} <Icon name="chevron" size={16} />
                </button>
                <ul className="dropdown">
                  {item.children.map((c) => (
                    <li key={c.to}><NavLink to={c.to} end className="dropdown__link">{c.label}</NavLink></li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.label}><NavLink to={item.to} end={item.to === '/'} className="nav-link">{item.label}</NavLink></li>
            ))}
          </ul>
          <div className="nav-cta-mobile">
            <Link to="/admissions#apply" className="btn btn--primary btn--block">Apply Now</Link>
          </div>
        </nav>

        <div className="header-actions">
          <Link to="/admissions#apply" className="btn btn--primary btn--sm hide-sm">Apply Now</Link>
          <a className="icon-btn icon-btn--tip" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" data-tip={SITE.phone} aria-label={`Chat on WhatsApp: ${SITE.phone}`}><Icon name="whatsapp" /></a>
          <button type="button" className="icon-btn nav-toggle" aria-controls="main-nav" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-col footer-about">
          <div className="brand brand--light"><Logo /><span className="brand__text"><strong>WISDOM LAND MODEL SCHOOLS</strong><small>{SITE.tagline}</small></span></div>
          <p className="footer-motto">“{SITE.motto}”</p>
          <p>Nursery, primary, secondary and pre-university education in Ota, built on faith, discipline and excellence.</p>
          <div className="social">
            <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Icon name="facebook" /></a>
            <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Icon name="instagram" /></a>
            <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Icon name="youtube" /></a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><Icon name="whatsapp" /></a>
          </div>
        </div>
        <nav className="footer-col" aria-label="Quick links">
          <h3>Quick links</h3>
          <ul><li><Link to="/">Home</Link></li><li><Link to="/about">About Us</Link></li><li><Link to="/student-life">Student Life</Link></li><li><Link to="/contact">Contact Us</Link></li><li><Link to="/privacy">Privacy &amp; Terms</Link></li></ul>
        </nav>
        <nav className="footer-col" aria-label="Academics and admissions">
          <h3>Academics</h3>
          <ul>
            <li><Link to="/academics/nursery-primary">Nursery &amp; Primary</Link></li>
            <li><Link to="/academics/junior-secondary">Junior Secondary</Link></li>
            <li><Link to="/academics/senior-secondary">Senior Secondary</Link></li>
            <li><Link to="/academics/pre-university">Pre-University</Link></li>
          </ul>
          <h3 className="mt">Admissions</h3>
          <ul><li><Link to="/admissions">How to apply</Link></li><li><a href="/admission-form.pdf" download="Wisdom-Land-Admission-Form.pdf">Download form</a></li></ul>
        </nav>
        <div className="footer-col">
          <h3>Contact</h3>
          <ul className="contact-list">
            <li><Icon name="pin" size={18} /><span>{SITE.address}</span></li>
            <li><Icon name="phone" size={18} /><span>{SITE.phones.map((p, i) => <span key={p.href}>{i > 0 && ', '}<a href={p.href}>{p.display}</a></span>)}</span></li>
            <li><Icon name="mail" size={18} /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><Icon name="clock" size={18} /><span>{SITE.hours}</span></li>
          </ul>
        </div>
        <div className="footer-col footer-msg">
          <h3>Send us a message</h3>
          <ContactForm compact idPrefix="ft" />
        </div>
      </div>
      <div className="footer-bottom"><div className="container"><p>© {new Date().getFullYear()} Wisdom Land Model Schools, The Bells, Ota. All rights reserved.</p></div></div>
    </footer>
  );
}

export default function Layout() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
    </>
  );
}
