export interface ImpactProject {
  id: string;
  title: string;
  description: string;
  theme: 'light' | 'dark';
  logo?: string;
  logoText?: string;
  logoSubtext?: string;
  navigation?: string[];
  mainContent: {
    type: 'image' | 'text';
    content: string;
    image?: string;
  };
  metrics?: {
    label: string;
    value: string;
  };
  button?: {
    text: string;
    variant: 'primary' | 'secondary';
  };
  socialIcons?: string[];
}

export const impactProjects: ImpactProject[] = [
  {
    id: '1',
    title: 'Cleeri',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the',
    theme: 'dark',
    logo: '/logos/VisionaryClouds.png',
    logoText: 'VISIONARY CLOUDS',
    navigation: ['HOME', 'ABOUT US', 'SERVICES', 'OUR TEAM', 'PROJECTS', 'TESTIMONIALS', 'CONTACT US'],
    mainContent: {
      type: 'image',
      content: 'Ice cream scooping image',
      image: '/images/ice-cream.jpg', // Placeholder - you'll need to add actual image
    },
    metrics: {
      label: 'Increase feature adoption by',
      value: 'Up to 30%',
    },
    socialIcons: ['instagram', 'vimeo', 'youtube'],
  },
  {
    id: '2',
    title: '',
    description: '',
    theme: 'light',
    button: {
      text: 'GET STARTED',
      variant: 'primary',
    },
    mainContent: {
      type: 'text',
      content: 'lot',
    },
  },
  {
    id: '3',
    title: 'AI-Powered Study',
    description: 'Study Details I',
    theme: 'light',
    logoText: 'EZ',
    logoSubtext: 'EZ RESEARCH SOLUTIONS',
    mainContent: {
      type: 'text',
      content: 'Cons_col',
    },
    button: {
      text: 'Get Started Today',
      variant: 'secondary',
    },
  },
  {
    id: '4',
    title: 'Cleeri',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the',
    theme: 'dark',
    logo: '/logos/VisionaryClouds.png',
    logoText: 'VISIONARY CLOUDS',
    navigation: ['HOME', 'ABOUT US', 'SERVICES', 'OUR TEAM', 'PROJECTS', 'TESTIMONIALS', 'CONTACT US'],
    mainContent: {
      type: 'image',
      content: 'Ice cream scooping image',
      image: '/images/ice-cream.jpg', // Placeholder - you'll need to add actual image
    },
    metrics: {
      label: 'Increase feature adoption by',
      value: 'Up to 30%',
    },
    socialIcons: ['instagram', 'vimeo', 'youtube'],
  },
  {
    id: '5',
    title: '',
    description: '',
    theme: 'light',
    button: {
      text: 'GET STARTED',
      variant: 'primary',
    },
    mainContent: {
      type: 'text',
      content: 'lot',
    },
  },
  {
    id: '6',
    title: 'AI-Powered Study',
    description: 'Study Details I',
    theme: 'light',
    logoText: 'EZ',
    logoSubtext: 'EZ RESEARCH SOLUTIONS',
    mainContent: {
      type: 'text',
      content: 'Cons_col',
    },
    button: {
      text: 'Get Started Today',
      variant: 'secondary',
    },
  },
];

