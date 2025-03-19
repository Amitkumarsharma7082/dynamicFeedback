import React, { useState, useEffect, useRef } from "react";
import FeedbackButton from "./FeedbackButton";
import FeedbackForm from "./FeedbackForm";
import ThankYouMessage from "./ThankYouMessage";
import { Question, WidgetConfig } from "@/types";
import { fetchPublishedQuestions, createResponse } from "@/services/api";

interface FeedbackWidgetProps {
  config?: Partial<WidgetConfig>;
}

const defaultConfig: WidgetConfig = {
  position: "bottom-right",
  primaryColor: "#0071e3",
  textColor: "#ffffff",
  buttonText: "Feedback",
  thankYouMessage: "Thank you for your feedback!",
};

const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({ config = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Merge default config with user config
  const mergedConfig = { ...defaultConfig, ...config };

  // Fetch questions from the API
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchPublishedQuestions();
        setQuestions(data);
        if (data.length > 0) {
          setActiveQuestion(data[0]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load questions:", error);
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, []);

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling
  };

  const handleClose = () => {
    if (isOpen && !isClosing) {
      setIsClosing(true);

      // Trigger closing animation
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
        setIsSubmitted(false);
        document.body.style.overflow = ""; // Restore scrolling
      }, 300);
    }
  };

  const handleSubmit = async (answer: string | number | boolean) => {
    if (!activeQuestion) return;

    try {
      // Submit the response to the API
      await createResponse({
        questionId: activeQuestion.id || "",
        answer,
        timestamp: new Date(),
      });

      // Show thank you message
      setIsSubmitted(true);

      // Close after delay
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      console.error("Failed to submit response:", error);
    }
  };

  // Don't render if there are no questions
  if (!isLoading && questions.length === 0) {
    return null;
  }

  return (
    <>
      <FeedbackButton
        onClick={handleOpen}
        position={mergedConfig.position}
        text={mergedConfig.buttonText}
        primaryColor={mergedConfig.primaryColor}
      />

      {isOpen && (
        <>
          <div className={`modal-backdrop ${isClosing ? "closing" : ""}`}></div>
          <div
            className={`modal-content card-glass bg-white ${
              isClosing ? "closing" : ""
            }`}
            ref={modalRef}
          >
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin-slow rounded-full h-12 w-12 border-t-2 border-b-2 border-feedback-blue"></div>
              </div>
            ) : isSubmitted ? (
              <ThankYouMessage message={mergedConfig.thankYouMessage} />
            ) : activeQuestion ? (
              <FeedbackForm
                question={activeQuestion}
                onSubmit={handleSubmit}
                onClose={handleClose}
              />
            ) : (
              <div className="p-6 text-center text-gray-500">
                No feedback questions available at this time.
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default FeedbackWidget;
