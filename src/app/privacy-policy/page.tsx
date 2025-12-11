import { Heading } from '@/components/ui/Heading';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Brillarix - Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-[calc(100vh-120px)] bg-background">
      <div className="flex flex-col p-4 sm:p-6 md:p-8">
        {/* Title Section */}
        <div className="flex flex-col gap-4 pb-6">
          <div className="bg-gray-dark-3 rounded-lg px-6 py-4">
            <Heading variant="h1" weight="bold">
              Privacy Policy
            </Heading>
          </div>
          <p className="text-sm sm:text-base text-gray-light-3">
            <strong>Last Updated:</strong> 22 February 2025
          </p>
        </div>

        {/* Section 1: Introduction */}
        <div className="flex flex-col gap-4 pb-6">
          <Heading
            variant="h2"
            as="h2"
            align="left"
            weight="medium"
            children="1. Introduction"
            subtitleAs="p"
            subtitleClassName="text-base sm:text-lg text-gray-light-2"
            subtitle="Welcome to Brillarix. This Privacy Policy outlines our commitment to protecting your personal data and explains how we collect, use, store, and safeguard your information when you interact with our website. We only collect information that you voluntarily provide to us through our contact form. We adhere to applicable privacy laws and industry best practices to ensure your data remains secure and your rights are respected."
          />
        </div>

        {/* Section 2: Information We Collect */}
        <div className="flex flex-col gap-4 pb-6">
          <Heading
            variant="h2"
            as="h2"
            align="left"
            weight="medium"
            children="2. Information We Collect"
            subtitleAs="p"
            subtitleClassName="text-base sm:text-lg text-gray-light-2"
            subtitle="We only collect personal information that you voluntarily provide to us when you submit our contact form. This includes:"
          />
          <div className="flex flex-col gap-3 pl-4">
            <div className="flex items-start gap-3">
              <span className="text-purple-500 mt-1">➤</span>
              <p className="text-base sm:text-lg text-gray-light-2 leading-relaxed">
                <strong>Contact Information:</strong> Your name, email address, area of interest, and message when you submit our contact form.
              </p>
            </div>
          </div>
          <p className="text-base sm:text-lg text-gray-light-2 leading-relaxed mt-2">
            We do not collect any information automatically through cookies, tracking technologies, or analytics tools. We do not track your browsing behavior, IP address, device information, or any other usage data.
          </p>
        </div>

        {/* Section 3: How We Use Your Information */}
        <div className="flex flex-col gap-4 pb-6">
          <Heading
            variant="h2"
            as="h2"
            align="left"
            weight="medium"
            children="3. How We Use Your Information"
          />
          <p className="text-base sm:text-lg text-gray-light-2 leading-relaxed">
            Your data is used for multiple purposes, including:
          </p>
          <div className="flex flex-col gap-3 pl-4">
            <div className="flex items-start gap-3">
              <span className="text-purple-500 mt-1">➤</span>
              <p className="text-base sm:text-lg text-gray-light-2 leading-relaxed">
                Responding to your inquiries and providing customer support through our contact form.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-purple-500 mt-1">➤</span>
              <p className="text-base sm:text-lg text-gray-light-2 leading-relaxed">
                Communicating with you about our services, updates, and responding to your requests.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-purple-500 mt-1">➤</span>
              <p className="text-base sm:text-lg text-gray-light-2 leading-relaxed">
                Ensuring compliance with legal obligations and maintaining security.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Data Security and Retention */}
        <div className="flex flex-col gap-4 pb-6">
          <Heading
            variant="h2"
            as="h2"
            align="left"
            weight="medium"
            children="4. Data Security and Retention"
            subtitleAs="p"
            subtitleClassName="text-base sm:text-lg text-gray-light-2"
            subtitle="We implement robust security measures, including encryption, access controls, and secure server infrastructure, to protect your personal information from unauthorized access, alteration, or disclosure. Your data is retained only for as long as necessary to fulfill the purposes for which it was collected or as required by law."
          />
        </div>

        {/* Section 5: Third-Party Services */}
        <div className="flex flex-col gap-4 pb-6">
          <Heading
            variant="h2"
            as="h2"
            align="left"
            weight="medium"
            children="5. Third-Party Services"
            subtitleAs="p"
            subtitleClassName="text-base sm:text-lg text-gray-light-2"
            subtitle="We use SendGrid, a third-party email service provider, to process and deliver contact form submissions. SendGrid is contractually obligated to protect your data and use it solely for the purpose of delivering your contact form messages to us. We do not share your information with any other third-party service providers."
          />
        </div>

        {/* Section 6: Your Rights and Choices */}
        <div className="flex flex-col gap-4 pb-6">
          <Heading
            variant="h2"
            as="h2"
            align="left"
            weight="medium"
            children="6. Your Rights and Choices"
          />
          <p className="text-base sm:text-lg text-gray-light-2 leading-relaxed">
            You have the right to access, update, and correct your personal information. You may also request the deletion of your data, subject to legal and contractual restrictions. To exercise your rights, please contact us at <a href="mailto:contact@brillarix.com" className="underline">contact@brillarix.com</a>
          </p>
        </div>

        {/* Section 7: Children's Privacy */}
        <div className="flex flex-col gap-4 pb-6">
          <Heading
            variant="h2"
            as="h2"
            align="left"
            weight="medium"
            children="7. Children's Privacy"
            subtitleAs="p"
            subtitleClassName="text-base sm:text-lg text-gray-light-2"
            subtitle="Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children. If we discover that we have inadvertently collected information from a child under 13, we will promptly take steps to delete it."
          />
        </div>

        {/* Section 8: Policy Updates */}
        <div className="flex flex-col gap-4 pb-6">
          <Heading
            variant="h2"
            as="h2"
            align="left"
            weight="medium"
            children="8. Policy Updates"
            subtitleAs="p"
            subtitleClassName="text-base sm:text-lg text-gray-light-2"
            subtitle="We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. The updated policy will be posted on this page with a revised 'Last Updated' date."
          />
        </div>

        {/* Section 9: Contact Us */}
        <div className="flex flex-col gap-4 pb-6">
          <Heading
            variant="h2"
            as="h2"
            align="left"
            weight="medium"
            children="9. Contact Us"
          />
          <p className="text-base sm:text-lg text-gray-light-2 leading-relaxed">
            If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at <a href="mailto:contact@brillarix.com" className="underline">contact@brillarix.com</a> or write to us at Brillarix, India.
          </p>
        </div>
      </div>
    </div>
  );
}
