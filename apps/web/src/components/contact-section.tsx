'use client';

import { ArrowUpRight, CalendarDays, LockKeyhole, Mail } from 'lucide-react';
import type { FormEvent } from 'react';

const contactEmail = 'contact@brillarix.com';
const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
const meetingHref = calendlyUrl ?? `mailto:${contactEmail}?subject=${encodeURIComponent('Request a Calendly meeting')}`;

const topics = [
  'Validating an MVP or the next product release',
  'Building a custom web, mobile, or SaaS platform',
  'Adding useful AI or automation to an existing workflow',
  'Scaling product architecture, performance, or delivery',
];

function submitByEmail(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const form = new FormData(event.currentTarget);
  const name = String(form.get('name') ?? '');
  const email = String(form.get('email') ?? '');
  const interest = String(form.get('interest') ?? '');
  const message = String(form.get('message') ?? '');
  const subject = encodeURIComponent(`Product enquiry from ${name}`);
  const body = encodeURIComponent(
    [`Name: ${name}`, `Email: ${email}`, `Area of interest: ${interest}`, '', message].join('\n'),
  );

  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
}

export function ContactSection() {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="contact-shell">
        <div className="contact-layout">
          <div className="contact-primary">
          <div className="contact-heading-block">
            <h2 id="contact-heading">Contact us</h2>
            <div className="contact-heading-accent" aria-hidden="true"><span>+</span><i /></div>
            <p>Tell us what you&apos;re building, where the product stands, and what success looks like. We&apos;ll help you identify the clearest next step.</p>
          </div>

          <form className="contact-form-card" id="contact-form" onSubmit={submitByEmail}>
            <div className="contact-field">
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" name="name" placeholder="Enter your name" autoComplete="name" maxLength={100} required />
            </div>

            <div className="contact-field">
              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" name="email" type="email" placeholder="Enter your email" autoComplete="email" required />
            </div>

            <div className="contact-field">
              <label htmlFor="contact-interest">Area of interest</label>
              <select id="contact-interest" name="interest" defaultValue="" required>
                <option value="" disabled>Select an area of interest</option>
                <option>MVP development &amp; validation</option>
                <option>Custom software development</option>
                <option>Product strategy &amp; UX</option>
                <option>AI product development &amp; automation</option>
                <option>Cross-platform mobile development</option>
                <option>Other</option>
              </select>
            </div>

            <div className="contact-field">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" name="message" placeholder="Tell us about your product" rows={4} maxLength={2000} required />
            </div>

            <button className="contact-submit" type="submit"><span>Send project brief</span><ArrowUpRight aria-hidden="true" /></button>
            <p className="contact-form-note"><LockKeyhole aria-hidden="true" />Sending opens your preferred email app with these details ready.</p>
          </form>
          </div>

          <aside className="contact-aside">
            <div className="contact-topics">
              <p className="contact-aside-title">Let&apos;s talk about your product</p>
              <ul>
                {topics.map((topic) => <li key={topic}>{topic}</li>)}
              </ul>
            </div>

          <div className="contact-option-list">
              <a
                aria-label={calendlyUrl ? 'Book a product call with Brillarix on Calendly' : 'Request a product call booking link by email'}
                className="contact-option-card"
                href={meetingHref}
                target={calendlyUrl ? '_blank' : undefined}
                rel={calendlyUrl ? 'noreferrer' : undefined}
                data-cursor
              >
                <span className="contact-option-icon" aria-hidden="true"><CalendarDays /></span>
                <span className="contact-option-copy">
                  <strong>Book a product call</strong>
                  <small>{calendlyUrl ? 'Calendly' : 'Request a Calendly link'}</small>
                </span>
                <ArrowUpRight aria-hidden="true" />
                <span className="contact-option-art contact-option-art--meeting" aria-hidden="true" />
              </a>
              <a className="contact-option-card" href={`mailto:${contactEmail}`} data-cursor>
                <span className="contact-option-icon" aria-hidden="true"><Mail /></span>
                <span className="contact-option-copy"><strong>Email our team</strong><small>{contactEmail}</small></span>
                <ArrowUpRight aria-hidden="true" />
                <span className="contact-option-art contact-option-art--email" aria-hidden="true" />
              </a>
          </div>
          </aside>
        </div>

      </div>
    </section>
  );
}
