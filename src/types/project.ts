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
