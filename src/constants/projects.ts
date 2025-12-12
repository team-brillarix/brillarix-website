const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';

export interface ImpactProject {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  metrics: {
    label: string;
    value: string;
    valueLabel: string;
  };
  submetrics?: {
    label: string;
    value: string;
  }[];
}

export const impactProjects: ImpactProject[] = [
  {
    id: '1',
    title: 'Trialynx',
    description:
      'Transform clinical trial development with AI. Generate 90%+ complete protocols, consents, and study documents in hours, not months. Save 70%+ time and costs with 500+ AI agents.',
    videoUrl: `https://res.cloudinary.com/dv860labz/video/upload/v1765449078/Trialynx_wlyptp.mp4`,
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
        label: 'Improved Efficiency By',
        value: '90%',
      },
    ],
  },
  {
    id: '2',
    title: 'KW Fitness',
    description:
      'A personal training studio with locations in Vestal, Fayetteville & Cicero, NY -- serving Greater Binghamton & Syracuse with personalized workout & nutrition plans.',
    videoUrl: `https://res.cloudinary.com/dv860labz/video/upload/v1765449162/KW_zxfnsn.mp4`,
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
    videoUrl: `https://res.cloudinary.com/${cloudName}/video/upload/v1764406783/VisionaryClouds_m70imh.mp4`,
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
    videoUrl: `https://res.cloudinary.com/${cloudName}/video/upload/v1764406755/Signm_duk534.mp4`,
    metrics: {
      label: 'User Engagement Growth',
      value: '4000+',
      valueLabel: 'Up to',
    },
  },
  {
    id: '5',
    title: 'Gym Builder',
    description:
      'GymBuilder Network gives gym owners real-time dashboards, leaderboards, and AI monthly summaries to track metrics, manage targets, and grow their gyms effortlessly.',
    videoUrl: `https://res.cloudinary.com/dv860labz/video/upload/v1765450067/GymBuilder_si7yi6.mp4`,
    metrics: {
      label: 'Conversion Rate Increased',
      value: '8 - 10%',
      valueLabel: 'By',
    },
  },
];

