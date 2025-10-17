import { 
  TrendingUp, 
  Calculator, 
  FileText, 
  MessageSquare, 
  Lightbulb,
  Headphones
} from "lucide-react";

export type Category = {
  icon: any;
  title: string;
  description: string;
  features: string[];
  color: string;
  bgColor: string;
  price: string;
  details: string;
};

export const categories: Category[] = [
  {
    icon: MessageSquare,
    title: "Social Media AI Assistant",
    description:
      "Never run out of content ideas again. Your AI learns your brand voice, creates engaging posts, schedules them perfectly, and even responds to comments - all while you focus on running your business.",
    features: [
      "Daily Post Creation",
      "Brand Voice Learning",
      "Auto Scheduling",
      "Comment Management",
      "Hashtag Research",
      "Performance Insights",
    ],
    color: "text-primary",
    bgColor: "bg-primary/10",
    price: "£19.99/month",
    details:
      "Perfect for restaurants, retail stores, service providers, and any business wanting consistent social media presence without the daily hassle.",
  },
  {
    icon: Calculator,
    title: "Financial AI Advisor",
    description:
      "Make smarter money decisions with AI that understands your business. Get instant answers about cash flow, pricing strategies, tax planning, and growth investments tailored to your industry.",
    features: [
      "Cash Flow Forecasting",
      "Pricing Optimization",
      "Tax Planning",
      "Expense Tracking",
      "Profit Analysis",
      "Growth Recommendations",
    ],
    color: "text-primary",
    bgColor: "bg-primary/10",
    price: "£19.99/month",
    details:
      "Ideal for consultants, contractors, small manufacturers, and service businesses who need financial clarity without expensive accountants.",
  },
  {
    icon: FileText,
    title: "Tender & Sales AI Expert",
    description:
      "Win more deals with AI that writes compelling proposals, analyzes RFPs, creates persuasive quotes, and helps you close sales. It knows your strengths and highlights them perfectly.",
    features: [
      "Proposal Writing",
      "RFP Analysis",
      "Quote Generation",
      "Win/Loss Tracking",
      "Competitor Research",
      "Follow-up Sequences",
    ],
    color: "text-primary",
    bgColor: "bg-primary/10",
    price: "£19.99/month",
    details:
      "Essential for B2B services, contractors, agencies, and any business that needs to write proposals or respond to tenders regularly.",
  },
  {
    icon: TrendingUp,
    title: "Marketing AI Specialist",
    description:
      "Grow your customer base with AI that creates targeted campaigns, writes compelling emails, designs ads, and tracks what actually works for your specific business and audience.",
    features: [
      "Campaign Creation",
      "Email Sequences",
      "Ad Copywriting",
      "Landing Pages",
      "A/B Testing",
      "ROI Tracking",
    ],
    color: "text-primary",
    bgColor: "bg-primary/10",
    price: "£19.99/month",
    details:
      "Perfect for e-commerce, local services, B2B companies, and any business wanting to attract more customers systematically.",
  },
  {
    icon: Headphones,
    title: "Customer Service AI Assistant",
    description:
      "Deliver exceptional customer support 24/7 with AI that handles inquiries, resolves issues, and maintains your customer relationships while you sleep. Never miss a customer question again.",
    features: [
      "24/7 Chat Support",
      "FAQ Automation",
      "Ticket Management",
      "Customer Insights",
      "Multi-Channel Support",
      "Sentiment Analysis",
    ],
    color: "text-primary",
    bgColor: "bg-primary/10",
    price: "£19.99/month",
    details:
      "Essential for online stores, service providers, and any business that values customer satisfaction and wants to provide instant support.",
  },
  {
    icon: Lightbulb,
    title: "Custom AI Solutions",
    description:
      "Get AI that solves your unique business challenges. Whether it's automating your CRM, creating business cases, streamlining processes, or something entirely specific to your industry.",
    features: [
      "CRM Automation",
      "Process Optimization",
      "Business Case Writing",
      "Industry-Specific Solutions",
      "Workflow Design",
      "Custom Integrations",
    ],
    color: "text-primary",
    bgColor: "bg-primary/10",
    price: "£99 setup + £19/month",
    details:
      "Tailored for businesses with specific needs - from medical practices to manufacturing, construction to consulting - we build AI that fits your exact requirements.",
  },
];