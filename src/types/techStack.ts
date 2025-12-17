export interface TechItem {
  name: string;
  image: string;
  description: string;
}

export interface TechCategory {
  title: string;
  description: string;
  items: TechItem[];
  icon: React.ReactNode;
}

export interface TechStackProps {
  categories: TechCategory[];
  title?: string;
  subtitle?: string;
}

