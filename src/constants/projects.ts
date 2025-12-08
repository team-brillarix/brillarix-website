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
      'We helped a B2B startup launch a production-ready MVP using a fully no-code stack, enabling rapid iteration and real user feedback.',
    videoUrl: `https://res.cloudinary.com/${cloudName}/video/upload/v1764406780/Trialynx_zrcmyt.mp4`,
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
    videoUrl: `https://res.cloudinary.com/${cloudName}/video/upload/v1764406783/VisionaryClouds_m70imh.mp4`,
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
    videoUrl: `https://res.cloudinary.com/${cloudName}/video/upload/v1764406755/Signm_duk534.mp4`,
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
    videoUrl: `https://res.cloudinary.com/${cloudName}/video/upload/v1764406753/PromptVault_frbwbu.mp4`,
    metrics: {
      label: 'Increase in team productivity',
      value: '28%',
    },
  }
];

