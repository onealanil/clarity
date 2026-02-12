export interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}