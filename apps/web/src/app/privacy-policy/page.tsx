import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Brillarix',
  description: 'How Brillarix collects, uses, protects, and retains personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page">
      <article className="legal-document">
        <header className="legal-title-card">
          <h1>Privacy Policy</h1>
        </header>

        <p className="legal-last-updated"><strong>Last Updated:</strong> 22 February 2025</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to Brillarix. This Privacy Policy outlines our commitment to protecting your personal data and explains how we collect, use, store, and safeguard your information when you interact with our website. We only collect information that you voluntarily provide to us through our contact form. We adhere to applicable privacy laws and industry best practices to ensure your data remains secure and your rights are respected.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <p>We only collect personal information that you voluntarily provide to us when you submit our contact form. This includes:</p>
          <ul className="legal-arrow-list">
            <li><strong>Contact Information:</strong> Your name, email address, area of interest, and message when you submit our contact form.</li>
          </ul>
          <p>
            We do not collect any information automatically through cookies, tracking technologies, or analytics tools. We do not track your browsing behavior, IP address, device information, or any other usage data.
          </p>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>Your data is used for multiple purposes, including:</p>
          <ul className="legal-arrow-list">
            <li>Responding to your inquiries and providing customer support through our contact form.</li>
            <li>Communicating with you about our services, updates, and responding to your requests.</li>
            <li>Ensuring compliance with legal obligations and maintaining security.</li>
          </ul>
        </section>

        <section>
          <h2>4. Data Security and Retention</h2>
          <p>
            We implement robust security measures, including encryption, access controls, and secure server infrastructure, to protect your personal information from unauthorized access, alteration, or disclosure. Your data is retained only for as long as necessary to fulfill the purposes for which it was collected or as required by law.
          </p>
        </section>

        <section>
          <h2>5. Third-Party Services</h2>
          <p>
            We use SendGrid, a third-party email service provider, to process and deliver contact form submissions. SendGrid is contractually obligated to protect your data and use it solely for the purpose of delivering your contact form messages to us. We do not share your information with any other third-party service providers.
          </p>
        </section>

        <section>
          <h2>6. Your Rights and Choices</h2>
          <p>
            You have the right to access, update, and correct your personal information. You may also request the deletion of your data, subject to legal and contractual restrictions. To exercise your rights, please contact us at <a href="mailto:contact@brillarix.com">contact@brillarix.com</a>.
          </p>
        </section>

        <section>
          <h2>7. Children&apos;s Privacy</h2>
          <p>
            Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children. If we discover that we have inadvertently collected information from a child under 13, we will promptly take steps to delete it.
          </p>
        </section>

        <section>
          <h2>8. Policy Updates</h2>
          <p>
            We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. The updated policy will be posted on this page with a revised “Last Updated” date.
          </p>
        </section>

        <section>
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at <a href="mailto:contact@brillarix.com">contact@brillarix.com</a> or write to us at Brillarix, India.
          </p>
        </section>
      </article>
    </main>
  );
}
