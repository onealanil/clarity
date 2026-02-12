import { Frown, Meh, Smile } from "lucide-react";

export const moods = [
    {
      value: "Worth It",
      icon: Smile,
      color: "text-clarity-green",
      bg: "bg-clarity-green/10",
      activeBg: "bg-clarity-green",
    },
    {
      value: "Neutral",
      icon: Meh,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      activeBg: "bg-amber-500",
    },
    {
      value: "Regret",
      icon: Frown,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      activeBg: "bg-rose-500",
    },
  ];