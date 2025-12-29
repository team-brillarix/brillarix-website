import { ImpactProject } from '@/types/project';

export const impactProjects: ImpactProject[] = [
  {
    id: '1',
    title: 'Trialynx',
    description:
      'Revolutionizing clinical trials. Our AI agents generate 90% of protocols autonomously, cutting months of work down to hours.',
    videoUrl: '/projects/Trialynx.mp4',
    metrics: {
      label: 'Total Clinical Trials Launched',
      value: '50',
      valueLabel: 'Over',
    },
    submetrics: [
      {
        label: 'Operations Across',
        value: '4 Countries',
      },
      {
        label: 'Increased Medical Writing Speed By',
        value: '90%',
      },
    ],
  },
  {
    id: '2',
    title: 'PT Metrics',
    description:
      'A personal training studio with locations in Vestal, Fayetteville & Cicero, NY, serving Greater Binghamton & Syracuse with personalized workout & nutrition plans.',
    videoUrl: '/projects/PTMetric.mp4',
    metrics: {
      label: 'Idea to MVP',
      value: '2 Weeks',
      valueLabel: 'In',
    },
  },
  {
    id: '3',
    title: 'Visionary Clouds',
    description:
      'Visionary Clouds offers premium commercial film and photography services, creating captivating visual stories to elevate your brand.',
    videoUrl: '/projects/VisionaryClouds.mp4',
    metrics: {
      label: 'Client Acquisition Growth',
      value: '80%',
      valueLabel: 'By',
    },
  },
  {
    id: '4',
    title: 'Signm',
    description:
      'Get an investing edge with AI powered stock analysis. Easily monitor millions of conversations about the stock market.',
    videoUrl: '/projects/Signm.mp4',
    metrics: {
      label: 'Total Paid Customers',
      value: '1000',
      valueLabel: 'More Than',
    },
  },
  {
    id: '5',
    title: 'Gym Builder',
    description:
      'Empowering gym owners with real-time intelligence. Custom dashboards and AI analytics that drive retention and effortless growth.',
    videoUrl: '/projects/GymBuilder.mp4',
    metrics: {
      label: 'Conversion Rate Increased',
      value: '8 - 10%',
      valueLabel: 'By',
    },
  },
];

