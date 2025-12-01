export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

