import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Brillarix',
  description: 'The terms governing access to and use of the Brillarix website and services.',
};

export default function TermsOfServicePage() {
  return (
    <main className="legal-page">
      <article className="legal-document">
        <header className="legal-title-card">
          <h1>Terms of Service</h1>
        </header>

        <p className="legal-last-updated"><strong>Last Updated:</strong> 22 February 2025</p>
        <p>
          Welcome to Brillarix. These Terms and Conditions (“Terms”) govern your access and use of our website and services (collectively, the “Service”). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Service.
        </p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By using the Brillarix website (www.brillarix.com) and/or any services provided by Brillarix, you agree to these Terms. Your continued use of our Service indicates your acceptance of any changes we may make in the future.
          </p>
        </section>

        <section>
          <h2>2. Use of Our Service</h2>
          <ul className="legal-arrow-list">
            <li><strong>License:</strong> Brillarix and its licensors retain all intellectual property rights in the Service and its content. You are granted a limited, non-exclusive license to access and use the Service for personal, non-commercial purposes only.</li>
            <li>
              <strong>Restrictions:</strong> You agree not to:
              <ul className="legal-dot-list">
                <li>Modify, copy, reproduce, republish, upload, post, transmit, or distribute any material from our Service without our prior written consent.</li>
                <li>Use the Service for any unlawful, harmful, or fraudulent purpose.</li>
                <li>Interfere with or disrupt the operation of the Service or servers and networks connected to the Service.</li>
              </ul>
            </li>
          </ul>
        </section>

        <section>
          <h2>3. Disclaimers &amp; Limitation of Liability</h2>
          <ul className="legal-arrow-list">
            <li><strong>“As Is” Basis:</strong> The Service is provided on an “as is” and “as available” basis without any warranties, express or implied.</li>
            <li><strong>No Guarantee:</strong> Brillarix does not guarantee the accuracy, completeness, or reliability of any information on the Service. Your use of the Service is at your sole risk.</li>
            <li><strong>Limitation:</strong> In no event shall Brillarix be liable for any indirect, incidental, consequential, or punitive damages arising from the use of or inability to use, the Service.</li>
          </ul>
        </section>

        <section>
          <h2>4. Intellectual Property</h2>
          <p>
            All content on the Service, including text, graphics, logos, images, and software, is the property of Brillarix or its licensors and is protected by applicable copyright and trademark laws. You agree not to use any content without express written permission.
          </p>
        </section>

        <section>
          <h2>5. Modifications to These Terms</h2>
          <p>
            Brillarix reserves the right to update or modify these Terms at any time without prior notice. Changes will be posted on this page and will be effective immediately upon posting. Your continued use of the Service after changes constitutes acceptance of the new Terms.
          </p>
        </section>

        <section>
          <h2>6. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of laws principles. Disputes related to these Terms are subject to the exclusive jurisdiction of the courts located in India.
          </p>
        </section>

        <section>
          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about these Terms or the Service, please contact us at <a href="mailto:contact@brillarix.com">contact@brillarix.com</a> or write to us at Brillarix, India.
          </p>
        </section>
      </article>
    </main>
  );
}
