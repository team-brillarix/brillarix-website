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
      'Over 12 months, we drove 90% growth in medical writing, retained most clients, and scaled operations to 4 countries.',
    videoUrl: `https://res.cloudinary.com/${cloudName}/video/upload/v1764406780/Trialynx_zrcmyt.mp4`,
    metrics: {
      label: '50+ clinical trials launched',
      value: '12 months',
    },
  },
  {
    id: '3',
    title: 'Visionary Clouds',
    description:
      'Advanced analytics pipelines transformed raw study data into real-time dashboards for sponsors and CRO teams.',
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
      'Signm is a platform that allows you to sign documents with your team.',
    videoUrl: `https://res.cloudinary.com/${cloudName}/video/upload/v1764406755/Signm_duk534.mp4`,
    metrics: {
      label: 'Decrease in onboarding time per patient',
      value: '35%',
    },
  },
];

