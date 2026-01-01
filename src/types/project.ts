export interface ImpactProject {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
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
