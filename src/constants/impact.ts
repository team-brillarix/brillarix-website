export interface ImpactProject {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  metrics: {
    label: string;
    value: string;
  };
}

export const impactProjects: ImpactProject[] = [
  {
    id: '1',
    title: 'Cleeri – AI Research Automation',
    description:
      'Cleeri partnered with Brillarix to automate participant recruitment, screening, and data workflows for complex clinical studies.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    metrics: {
      label: 'Reduction in manual operations workload',
      value: '45%',
    },
  },
  {
    id: '2',
    title: 'No-Code MVP Launch',
    description:
      'We helped a B2B startup launch a production-ready MVP using a fully no-code stack, enabling rapid iteration and real user feedback.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    metrics: {
      label: 'Time from idea to first paying customer',
      value: '6 weeks',
    },
  },
  {
    id: '3',
    title: 'AI-Powered Study Insights',
    description:
      'Advanced analytics pipelines transformed raw study data into real-time dashboards for sponsors and CRO teams.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    metrics: {
      label: 'Faster access to decision-ready insights',
      value: '3x',
    },
  },
  {
    id: '4',
    title: 'Healthcare Workflow Platform',
    description:
      'A modular workflow engine that orchestrates patient onboarding, scheduling, and compliance tasks across multiple systems.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    metrics: {
      label: 'Decrease in onboarding time per patient',
      value: '35%',
    },
  },
  {
    id: '5',
    title: 'Global E‑Commerce Rollout',
    description:
      'We architected a scalable storefront experience that supports multiple currencies, regions, and localized content.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    metrics: {
      label: 'Improvement in conversion rate across key markets',
      value: '+22%',
    },
  },
  {
    id: '6',
    title: 'Research Operations Hub',
    description:
      'A single pane of glass for research teams to manage participants, studies, and communication in one place.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    metrics: {
      label: 'Increase in study team productivity',
      value: '28%',
    },
  },
  {
    id: '7',
    title: 'Internal Tools Modernization',
    description:
      'Legacy internal tools were rebuilt with modern, user-friendly interfaces that dramatically reduced training time.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    metrics: {
      label: 'Reduction in support tickets for internal tools',
      value: '60%',
    },
  },
  {
    id: '8',
    title: 'Founder Prototype Studio',
    description:
      'For early-stage founders, we rapidly prototype product experiences to validate ideas before heavy engineering investment.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    metrics: {
      label: 'Average time to first interactive prototype',
      value: '10 days',
    },
  },
];

