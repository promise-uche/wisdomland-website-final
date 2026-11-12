import { Icon, PageHero, useSeo } from '../components/ui';
import ContactForm from '../components/ContactForm';
import { SITE } from '../data/site';

export default function Contact() {
  useSeo({
    title: 'Contact Us', path: '/contact',
    description: 'Contact Wisdom Land Model School, Lola Engineering Bus Stop, Bells University Junction, Ota, Ogun State. Phone +234 806 364 3013 or +234 903 647 7475, WhatsApp and email.',
    jsonLd: { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact Wisdom Land Model School', url: `${SITE.siteUrl}/contact` },
  });
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed`;
  return (
    <>
      <PageHero title="Contact us" text="Questions about admissions, fees or a visit? We are happy to help." />
      <section className="section">
        <div className="container contact-grid">
          <div className="card">
            <h2 className="h3-like">Send a message</h2>
            <ContactForm idPrefix="ct" />
          </div>
          <div className="contact-info">
            <ul className="contact-list contact-list--lg">
              <li><Icon name="pin" /><div><strong>Address</strong><span>{SITE.address}</span></div></li>
              <li><Icon name="phone" /><div><strong>Phone</strong><span>{SITE.phones.map((p, i) => <span key={p.href}>{i > 0 && ', '}<a href={p.href}>{p.display}</a></span>)}</span></div></li>
              <li><Icon name="whatsapp" /><div><strong>WhatsApp</strong><a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">Chat with us</a></div></li>
              <li><Icon name="mail" /><div><strong>Email</strong><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div></li>
              <li><Icon name="clock" /><div><strong>Office hours</strong><span>{SITE.hours}</span></div></li>
            </ul>
            <div className="social social--dark">
              <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Icon name="facebook" /></a>
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Icon name="instagram" /></a>
            </div>
          </div>
        </div>
        <div className="container map-wrap">
          <iframe title="Map showing Wisdom Land Model School, Ota" src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
    </>
  );
}
