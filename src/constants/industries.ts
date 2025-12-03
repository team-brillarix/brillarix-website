import { FiLayers, FiShoppingCart, FiHeart, FiBarChart2, FiBook, FiSettings } from 'react-icons/fi';

export interface Industry {
  id: string;
  title: string;
  headline: string;
  description: string;
  buttonText: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const industries: Industry[] = [
  {
    id: 'tech-startups',
    title: 'Tech Startups',
    headline: 'Launch Your Startup at Lightning Speed',
    description: 'From idea to market in record time — with AI and no-code tools, your product is ready faster, scaling as you grow.',
    buttonText: 'Start Your Journey',
    icon: FiLayers,
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce',
    headline: 'Boost Conversions with Seamless E-Commerce',
    description: 'Create an optimized, scalable e-commerce platform with AI-driven insights and no-code solutions for faster growth.',
    buttonText: 'Transform Your Store',
    icon: FiShoppingCart,
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    headline: 'Smarter Healthcare Solutions, Delivered Faster',
    description: 'Automate processes, improve patient experiences, and build secure healthcare apps with AI-powered solutions.',
    buttonText: 'Innovate Healthcare',
    icon: FiHeart,
  },
  {
    id: 'finance',
    title: 'Finance',
    headline: 'Revolutionize Finance with AI & No-Code',
    description: 'From real-time data analytics to fraud prevention build scalable, secure financial solutions with speed and accuracy',
    buttonText: 'Future-Proof Finance',
    icon: FiBarChart2,
  },
  {
    id: 'education',
    title: 'Education',
    headline: 'Transform Learning with AI and No-Code',
    description: 'Create personalized, scalable educational platforms that engage learners, powered by AI and no-code tools.',
    buttonText: 'Innovate Education',
    icon: FiBook,
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    headline: 'Optimize Operations with AI-Powered Automation',
    description: 'Automate processes, predict maintenance, and improve supply chain efficiency with AI-driven solutions tailored for manufacturing.',
    buttonText: 'Streamline Your Process',
    icon: FiSettings,
  },
];

