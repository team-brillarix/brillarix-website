export interface TechItem {
  name: string;
  image: string;
}

export interface TechCategory {
  title: string;
  items: TechItem[];
}

export interface TechStackProps {
  categories: TechCategory[];
  title?: string;
  subtitle?: string;
}

