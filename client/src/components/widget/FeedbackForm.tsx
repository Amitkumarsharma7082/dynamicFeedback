import React, { useState } from "react";
import { Star, Check, X } from "lucide-react";
import { Question } from "@/types";

interface FeedbackFormProps {
  question: Question;
  onSubmit: (answer: string | number | boolean) => void;
  onClose: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  question,
  onSubmit,
  onClose,
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [answer, setAnswer] = useState<string>("");
  const [yesNoAnswer, setYesNoAnswer] = useState<boolean | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (question.type === "rating" && rating !== null) {
      onSubmit(rating);
    } else if (question.type === "yesno" && yesNoAnswer !== null) {
      onSubmit(yesNoAnswer);
    } else if (question.type === "text" && answer.trim()) {
      onSubmit(answer);
    }
  };

  return (
    <div className="py-2">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-feedback-dark">Feedback</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X size={20} className="text-feedback-gray" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <h4 className="text-xl font-medium text-feedback-dark mb-4">
          {question.text}
        </h4>

        {question.type === "rating" && (
          <div className="flex justify-center space-x-2 py-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className={`p-2 rounded-full transition-all duration-200 ${
                  rating !== null && value <= rating
                    ? "text-yellow-500 transform scale-110"
                    : "text-gray-300 hover:text-yellow-400"
                }`}
                aria-label={`Rate ${value} stars`}
              >
                <Star
                  size={28}
                  fill={
                    rating !== null && value <= rating ? "currentColor" : "none"
                  }
                  strokeWidth={2}
                />
              </button>
            ))}
          </div>
        )}

        {question.type === "yesno" && (
          <div className="flex justify-center space-x-4 py-2">
            <button
              type="button"
              onClick={() => setYesNoAnswer(true)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                yesNoAnswer === true
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setYesNoAnswer(false)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                yesNoAnswer === false
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              No
            </button>
          </div>
        )}

        {question.type === "text" && (
          <div className="py-2">
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-feedback-blue focus:ring-1 focus:ring-feedback-blue transition-all duration-200 resize-none"
              placeholder="Write your feedback here..."
            />
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-feedback-blue text-white font-medium hover:bg-blue-600 transition-colors shadow-sm disabled:opacity-50 disabled:pointer-events-none"
            disabled={
              (question.type === "rating" && rating === null) ||
              (question.type === "yesno" && yesNoAnswer === null) ||
              (question.type === "text" && !answer.trim())
            }
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
