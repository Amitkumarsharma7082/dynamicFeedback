import React, { useEffect, useRef } from "react";
import { Check } from "lucide-react";

interface ThankYouMessageProps {
  message?: string;
  onAnimationComplete?: () => void;
}

const ThankYouMessage: React.FC<ThankYouMessageProps> = ({
  message = "Thank you for your feedback!",
  onAnimationComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate check icon
    const iconElement = iconRef.current;
    if (iconElement) {
      iconElement.classList.add("animate-scale-in");

      // After animation completes
      const timer = setTimeout(() => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [onAnimationComplete]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center p-8 animate-fade-in"
    >
      <div
        ref={iconRef}
        className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-6 transform scale-0 opacity-0 transition-all duration-500 ease-out"
        style={{ animationFillMode: "forwards", animationDelay: "150ms" }}
      >
        <Check className="text-white" size={32} />
      </div>

      <h3
        className="text-xl font-medium text-gray-900 mb-2 animate-slide-in opacity-0"
        style={{ animationFillMode: "forwards", animationDelay: "300ms" }}
      >
        {message}
      </h3>

      <p
        className="text-feedback-gray text-center animate-slide-in opacity-0"
        style={{ animationFillMode: "forwards", animationDelay: "450ms" }}
      >
        Your input helps us improve our service.
      </p>
    </div>
  );
};

export default ThankYouMessage;
