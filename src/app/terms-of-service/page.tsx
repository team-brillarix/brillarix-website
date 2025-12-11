import { Heading } from '@/components/ui/Heading';

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Brillarix - Learn about the terms governing your use of our services.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-[calc(100vh-120px)] bg-background">
      <div className="flex flex-col p-4 sm:p-6 md:p-8">
        {/* Title Section */}
        <div className="flex flex-col gap-4 pb-6">
          <div className="bg-gray-dark-3 rounded-lg px-6 py-4">
            <Heading variant="h1" weight="bold">
              Terms of Service
            </Heading>
          </div>
          <p className="text-sm sm:text-base text-gray-light-3">
            <strong>Last Updated:</strong> 22 February 2025
          </p>
        </div>

        {/* Introduction */}
        <div className="flex flex-col gap-4 pb-6">
          <p className="text-base sm:text-lg text-gray-light-2 leading-relaxed">
            Welcome to Brillarix. These Terms and Conditions ("Terms") govern your access and use of our website and services (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Service.
          </p>
        </div>

        {/* Section 1: Acceptance of Terms */}
        <div className="flex flex-col gap-4 pb-6">
          <Heading
            variant="h2"
            as="h2"
            align="left"
            weight="medium"
            children="1. Acceptance of Terms"
            subtitleAs="p"
            subtitleClassName="text-base sm:text-lg text-gray-light-2"
            subtitle="By using the Brillarix website (www.brillarix.com) and/or any services provided by Brillarix, you agree to these Terms. Your continued use of our Service indicates your acceptance of any changes we may make in the future."
          />
        </div>

        {/* Section 2: Use of Our Service */}
        <div className="flex flex-col gap-4 pb-6">
          <Heading
            variant="h2"
            as="h2"
            align="left"
            weight="medium"
            children="2. Use of Our Service"
          />
          <div className="flex flex-col gap-3 pl-4">
            <div className="flex items-start gap-3">
              <span className="text-purple-500 mt-1">➤</span>
              <p className="text-base sm:text-lg text-gray-light-2 leading-relaxed">
                <strong>License:</strong> Brillarix and its licensors retain all intellectual property rights in the Service and its content. You are granted a limited, non-exclusive license to access and use the Service for personal, non-commercial purposes only.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-purple-500 mt-1">➤</span>
              <p className="text-base sm:text-lg text-gray-light-2 leading-relaxed">
                <strong>Restrictions:</strong> You agree not to:
              </p>
            </div>
            <div className="flex flex-col gap-2 pl-6">
              <p className="text-base sm:text-lg text-gray-light-2 leading-relaxed">
                • Modify, copy, reproduce, republish, upload, post, transmit, or distribute any material from our Service without our prior written consent.
              </p>
              <p className="text-base sm:text-lg text-gray-light-2 leading-relaxed">
                • Use the Service for any unlawful, harmful, or fraudulent purpose.
              </p>
              <p className="text-base sm:text-lg text-gray-light-2 leading-relaxed">
                • Interfere with or disrupt the operation of the Service or servers and networks connected to the Service.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Disclaimers & Limitation of Liability */}
        <div className="flex flex-col gap-4 pb-6">
          <Heading
            variant="h2"
            as="h2"
            align="left"
            weight="medium"
            children="3. Disclaimers & Limitation of Liability"
          />
          <div className="flex flex-col gap-3 pl-4">
            <div className="flex items-start gap-3">
              <span className="text-purple-500 mt-1">➤</span>
              <p className="text-base sm:text-lg text-gray-light-2 leading-relaxed">
                <strong>"As Is" Basis:</strong> The Service is provided on an "as is" and "as available" basis without any warranties, express or implied.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-purple-500 mt-1">➤</span>
              <p className="text-base sm:text-lg text-gray-light-2 leading-relaxed">
                <strong>No Guarantee:</strong> Brillarix does not guarantee the accuracy, completeness, or reliability of any information on the Service. Your use of the Service is at your sole risk.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-purple-500 mt-1">➤</span>
              <p className="text-base sm:text-lg text-gray-light-2 leading-relaxed">
                <strong>Limitation:</strong> In no event shall Brillarix be liable for any indirect, incidental, consequential, or punitive damages arising from the use of, or inability to use, the Service.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Intellectual Property */}
        <div className="flex flex-col gap-4 pb-6">
          <Heading
            variant="h2"
            as="h2"
            align="left"
            weight="medium"
            children="4. Intellectual Property"
            subtitleAs="p"
            subtitleClassName="text-base sm:text-lg text-gray-light-2"
            subtitle="All content on the Service, including text, graphics, logos, images, and software, is the property of Brillarix or its licensors and is protected by applicable copyright and trademark laws. You agree not to use any content without express written permission."
          />
        </div>

        {/* Section 5: Modifications to These Terms */}
        <div className="flex flex-col gap-4 pb-6">
          <Heading
            variant="h2"
            as="h2"
            align="left"
            weight="medium"
            children="5. Modifications to These Terms"
            subtitleAs="p"
            subtitleClassName="text-base sm:text-lg text-gray-light-2"
            subtitle="Brillarix reserves the right to update or modify these Terms at any time without prior notice. Changes will be posted on this page and will be effective immediately upon posting. Your continued use of the Service after changes constitutes acceptance of the new Terms."
          />
        </div>

        {/* Section 6: Governing Law */}
        <div className="flex flex-col gap-4 pb-6">
          <Heading
            variant="h2"
            as="h2"
            align="left"
            weight="medium"
            children="6. Governing Law"
            subtitleAs="p"
            subtitleClassName="text-base sm:text-lg text-gray-light-2"
            subtitle="These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of laws principles. Disputes related to these Terms are subject to the exclusive jurisdiction of the courts located in India."
          />
        </div>

        {/* Section 7: Contact Us */}
        <div className="flex flex-col gap-4 pb-6">
          <Heading
            variant="h2"
            as="h2"
            align="left"
            weight="medium"
            children="7. Contact Us"
          />
          <p className="text-base sm:text-lg text-gray-light-2 leading-relaxed">
            If you have any questions about these Terms or the Service, please contact us at <a href="mailto:contact@brillarix.com" className="underline">contact@brillarix.com</a> or write to us at Brillarix, India.
          </p>
        </div>
      </div>
    </div>
  );
}

