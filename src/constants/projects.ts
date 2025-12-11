const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';

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
    id: '2',
    title: 'Trialynx',
    description:
      'Transform clinical trial development with AI. Generate 90%+ complete protocols, consents, and study documents in hours, not months. Save 70%+ time and costs with 500+ AI agents.',
    videoUrl: `https://res.cloudinary.com/dv860labz/video/upload/v1765449078/Trialynx_wlyptp.mp4`,
    metrics: {
      label: 'Increased medical writing speed',
      value: '90%',
    },
  },
  {
    id: '3',
    title: 'Visionary Clouds',
    description:
      'Visionary Clouds offers premium commercial film and photography services, creating captivating visual stories to elevate your brand.',
    videoUrl: `https://res.cloudinary.com/${cloudName}/video/upload/v1764406783/VisionaryClouds_m70imh.mp4`,
    metrics: {
      label: 'Extended market reach',
      value: '1.35x',
    },
  },
  {
    id: '4',
    title: 'Signm',
    description:
      'Get an investing edge with AI powered stock analysis. Easily monitor millions of conversations about the stock market.',
    videoUrl: `https://res.cloudinary.com/${cloudName}/video/upload/v1764406755/Signm_duk534.mp4`,
    metrics: {
      label: 'User engagements growth',
      value: '4000+ users',
    },
  },
  {
    id: '5',
    title: 'KW Fitness',
    description:
      'A personal training studio with locations in Vestal, Fayetteville & Cicero, NY -- serving Greater Binghamton & Syracuse with personalized workout & nutrition plans.',
    videoUrl: `https://res.cloudinary.com/dv860labz/video/upload/v1765449162/KW_zxfnsn.mp4`,
    metrics: {
      label: 'Over 4000 user engagements',
      value: '1000 paying customers',
    },
  },
  {
    id: '6',
    title: 'Gym Builder',
    description:
      'Signm is a platform that allows you to sign documents with your team.',
    videoUrl: `https://res.cloudinary.com/dv860labz/video/upload/v1765450067/GymBuilder_si7yi6.mp4`,
    metrics: {
      label: 'Over 4000 user engagements',
      value: '1000 paying customers',
    },
  },
];

