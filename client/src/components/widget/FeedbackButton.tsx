import React, { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";

interface FeedbackButtonProps {
  onClick: () => void;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  text?: string;
  primaryColor?: string;
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({
  onClick,
  position = "bottom-right",
  text = "Feedback",
  primaryColor,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Position styles
  const positionStyles = {
    "bottom-right": "bottom-5 right-5",
    "bottom-left": "bottom-5 left-5",
    "top-right": "top-5 right-5",
    "top-left": "top-5 left-5",
  };

  // Custom color style
  const customColorStyle = primaryColor
    ? { backgroundColor: primaryColor }
    : {};

  useEffect(() => {
    // Animate in after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <button
      onClick={onClick}
      className={`fixed ${
        positionStyles[position]
      } flex items-center gap-2 px-4 py-3 rounded-full bg-feedback-blue text-white shadow-button hover:shadow-float transition-all duration-300 ease-out transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } z-50 button-float`}
      style={customColorStyle}
      aria-label="Open feedback form"
    >
      <MessageSquare size={18} />
      <span className="font-medium">{text}</span>
    </button>
  );
};

export default FeedbackButton;
