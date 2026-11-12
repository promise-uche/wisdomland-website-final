import { useRef, useState } from 'react';
import { SITE } from '../data/site';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-\s\d]{7,20}$/;

/* Contact form powered by Formspree. compact = footer version (name, email, message). */
export default function ContactForm({ compact = false, idPrefix = 'cf' }) {
  const opened = useRef(Date.now());
  const [values, setValues] = useState({ name: '', email: '', phone: '', subject: '', message: '', _gotcha: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  const onChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((er) => ({ ...er, [e.target.name]: '' }));
  };

  const validate = () => {
    const er = {};
    if (values.name.trim().length < 2) er.name = 'Enter your full name.';
    if (!EMAIL_RE.test(values.email.trim())) er.email = 'Enter a valid email address.';
    if (!compact && values.phone.trim() && !PHONE_RE.test(values.phone.trim())) er.phone = 'Enter a valid phone number.';
    if (!compact && values.subject.trim().length < 3) er.subject = 'Enter a subject.';
    if (values.message.trim().length < 10) er.message = 'Write at least 10 characters.';
    if (values.message.length > 3000) er.message = 'Keep your message under 3,000 characters.';
    return er;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status.state === 'sending') return;
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;
    // Spam checks: hidden honeypot filled, or form submitted impossibly fast
    if (values._gotcha || Date.now() - opened.current < 3000) {
      setStatus({ state: 'error', msg: 'Please wait a moment and try again.' });
      return;
    }
    if (!SITE.formspreeId) {
      setStatus({ state: 'error', msg: `Messages are not enabled yet. Please email ${SITE.email} or call ${SITE.phoneText}.` });
      return;
    }
    setStatus({ state: 'sending', msg: '' });
    try {
      const res = await fetch(`https://formspree.io/f/${SITE.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(), email: values.email.trim(), phone: values.phone.trim(),
          subject: values.subject.trim() || 'Message from website footer', message: values.message.trim(),
          _replyto: values.email.trim(), _gotcha: values._gotcha,
        }),
      });
      if (!res.ok) throw new Error('bad status');
      setStatus({ state: 'success', msg: 'Thank you. Your message has been sent. We will reply within one working day.' });
      setValues({ name: '', email: '', phone: '', subject: '', message: '', _gotcha: '' });
      opened.current = Date.now();
    } catch {
      setStatus({ state: 'error', msg: `We could not send your message. Please try again, or email ${SITE.email}.` });
    }
  };

  const f = (name, label, props = {}) => (
    <div className={`field ${errors[name] ? 'field--error' : ''}`}>
      <label htmlFor={`${idPrefix}-${name}`}>{label}</label>
      {props.as === 'textarea' ? (
        <textarea id={`${idPrefix}-${name}`} name={name} rows={compact ? 3 : 5} value={values[name]} onChange={onChange} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${idPrefix}-${name}-err` : undefined} />
      ) : (
        <input id={`${idPrefix}-${name}`} name={name} value={values[name]} onChange={onChange} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${idPrefix}-${name}-err` : undefined} {...props} />
      )}
      {errors[name] && <p className="field__err" id={`${idPrefix}-${name}-err`} role="alert">{errors[name]}</p>}
    </div>
  );

  return (
    <form className={`form ${compact ? 'form--compact' : ''}`} onSubmit={onSubmit} noValidate>
      {f('name', 'Full name', { type: 'text', autoComplete: 'name' })}
      <div className={compact ? '' : 'form-row'}>
        {f('email', 'Email address', { type: 'email', autoComplete: 'email' })}
        {!compact && f('phone', 'Phone number (optional)', { type: 'tel', autoComplete: 'tel' })}
      </div>
      {!compact && f('subject', 'Subject', { type: 'text' })}
      {f('message', 'Message', { as: 'textarea' })}
      {/* Honeypot: hidden from people, bots fill it in */}
      <div className="hp" aria-hidden="true"><label>Leave blank<input name="_gotcha" tabIndex={-1} autoComplete="off" value={values._gotcha} onChange={onChange} /></label></div>
      <button className="btn btn--primary" type="submit" disabled={status.state === 'sending'}>{status.state === 'sending' ? 'Sending…' : 'Send message'}</button>
      <div aria-live="polite">
        {status.state === 'success' && <p className="notice notice--ok">{status.msg}</p>}
        {status.state === 'error' && <p className="notice notice--err">{status.msg}</p>}
      </div>
    </form>
  );
}
