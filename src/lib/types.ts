export interface SalesPageContent {
  headline: string;
  subheadline: string;
  description: string;
  benefits: { title: string; description: string }[];
  features: { title: string; description: string }[];
  socialProof: { quote: string; author: string; role: string }[];
  pricing: { title: string; price: string; description: string; features: string[] };
  cta: { primary: string; secondary: string };
  faq?: { question: string; answer: string }[];
}

export type Template = "modern" | "bold" | "minimal" | "elegant";

export interface ProductInput {
  product_name: string;
  product_description: string;
  features: string;
  target_audience: string;
  price: string;
  unique_selling_point: string;
}
