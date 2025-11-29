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
    id: '1',
    title: 'Cleeri',
    description:
      'Cleeri partnered with Brillarix to automate participant recruitment, screening, and data workflows for complex clinical studies.',
    videoUrl: `https://res.cloudinary.com/${cloudName}/video/upload/projects/Cleeri.mp4`,
    metrics: {
      label: 'Reduction in manual operations workload',
      value: '45%',
    },
  },
  {
    id: '2',
    title: 'Trialynx',
    description:
      'We helped a B2B startup launch a production-ready MVP using a fully no-code stack, enabling rapid iteration and real user feedback.',
    videoUrl: `https://res.cloudinary.com/${cloudName}/video/upload/projects/Trialynx.mp4`,
    metrics: {
      label: 'Time from idea to first paying customer',
      value: '6 weeks',
    },
  },
  {
    id: '3',
    title: 'Visionary Clouds',
    description:
      'Advanced analytics pipelines transformed raw study data into real-time dashboards for sponsors and CRO teams.',
    videoUrl: `https://res.cloudinary.com/${cloudName}/video/upload/projects/VisionaryClouds.mp4`,
    metrics: {
      label: 'Faster access to decision-ready insights',
      value: '3x',
    },
  },
  {
    id: '4',
    title: 'Signm',
    description:
      'Signm is a platform that allows you to sign documents with your team.',
    videoUrl: `https://res.cloudinary.com/${cloudName}/video/upload/projects/Signm.mp4`,
    metrics: {
      label: 'Decrease in onboarding time per patient',
      value: '35%',
    },
  },
  {
    id: '5',
    title: 'Prompt Vault',
    description:
      'Prompt Vault is a platform that allows you to store and share your prompts with your team.',
    videoUrl: `https://res.cloudinary.com/${cloudName}/video/upload/projects/PromptVault.mp4`,
    metrics: {
      label: 'Increase in team productivity',
      value: '28%',
    },
  }
];

