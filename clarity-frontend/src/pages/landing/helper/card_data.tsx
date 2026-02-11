import { Smile, ChartNoAxesColumnIncreasing, Heart } from "lucide-react";
import { Card } from "../../../interfaces/landing/Card";

export const cards: Card[] = [
  {
    icon: <Smile className="w-6 h-6 text-clarity-green" />,
    title: "Emotional Tracking",
    desc: "Track how each expense makes you feel: worth it, neutral, or regret.",
  },
  {
    icon: <ChartNoAxesColumnIncreasing className="w-6 h-6 text-clarity-green" />,
    title: "Mindful Insights",
    desc: "Discover patterns in your spending behavior without judgment or guilt.",
  },
  {
    icon: <Heart className="w-6 h-6 text-clarity-green" />,
    title: "Reduce Anxiety",
    desc: "Build a healthier relationship with money through reflection and awareness.",
  },
];
