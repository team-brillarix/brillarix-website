import { FiCode, FiTarget, FiZap } from "react-icons/fi";
import { WhyUs } from "@/types/whyUs";

export const whyUsData: WhyUs[] = [
    {
      icon: FiTarget,
      title: 'Validate Before Build',
      description: 'We validate product-market fit through market research and user testing before writing code.',
    },
    {
      icon: FiCode,
      title: 'Design for Conversion',
      description: 'Every design decision is data-driven to maximize engagement and revenue.',
    },
    {
      icon: FiZap,
      title: 'Build to Scale',
      description: 'We architect systems that grow with you from startup to enterprise.',
    },
  ];