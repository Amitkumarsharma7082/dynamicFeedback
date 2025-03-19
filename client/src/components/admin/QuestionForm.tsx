import React, { useState, useEffect } from "react";
import { Question, QuestionType } from "@/types";
import { toast } from "@/hooks/use-toast";
import { createQuestion, updateQuestion } from "@/services/api";
import { Check, X } from "lucide-react";

interface QuestionFormProps {
  question?: Question;
  onSuccess: () => void;
  onCancel: () => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  onSuccess,
  onCancel,
}) => {
  const [text, setText] = useState("");
  const [type, setType] = useState<QuestionType>("rating");
  const [isPublished, setIsPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form with question data if editing
  useEffect(() => {
    if (question) {
      setText(question.text || "");
      setType(question.type || "rating");
      setIsPublished(question.isPublished || false);
    }
  }, [question]);

  const isEditing = !!question;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEditing && question?.id) {
        // Update existing question
        await updateQuestion(question.id, {
          text,
          type,
          isPublished,
        });
        toast({
          title: "Question updated",
          description: "Your changes have been saved",
        });
      } else {
        // Create new question
        await createQuestion({
          text,
          type,
          isPublished,
        });
        toast({
          title: "Question created",
          description: "New question has been added",
        });
      }

      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "create"} question`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-feedback-dark">
          {isEditing ? "Edit Question" : "Create New Question"}
        </h2>
        <button
          onClick={onCancel}
          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X size={18} className="text-feedback-gray" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="question-text"
            className="block text-sm font-medium text-feedback-gray mb-1"
          >
            Question Text
          </label>
          <input
            id="question-text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-feedback-blue focus:ring-1 focus:ring-feedback-blue transition-all"
            placeholder="How would you rate your experience?"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-feedback-gray mb-2">
            Response Type
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setType("rating")}
              className={`flex items-center justify-center px-4 py-2.5 rounded-xl border transition-colors ${
                type === "rating"
                  ? "border-feedback-blue bg-blue-50 text-feedback-blue"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Rating Scale
            </button>
            <button
              type="button"
              onClick={() => setType("yesno")}
              className={`flex items-center justify-center px-4 py-2.5 rounded-xl border transition-colors ${
                type === "yesno"
                  ? "border-feedback-blue bg-blue-50 text-feedback-blue"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Yes/No
            </button>
            <button
              type="button"
              onClick={() => setType("text")}
              className={`flex items-center justify-center px-4 py-2.5 rounded-xl border transition-colors ${
                type === "text"
                  ? "border-feedback-blue bg-blue-50 text-feedback-blue"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Open Text
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <input
            id="publish"
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-feedback-blue focus:ring-feedback-blue"
          />
          <label htmlFor="publish" className="ml-2 text-sm text-feedback-dark">
            Publish immediately
          </label>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-feedback-blue text-white font-medium hover:bg-blue-600 transition-colors shadow-sm disabled:opacity-50 button-float"
            disabled={isLoading || !text.trim()}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {isEditing ? "Saving..." : "Creating..."}
              </span>
            ) : (
              <span className="flex items-center">
                <Check size={18} className="mr-1.5" />
                {isEditing ? "Save Changes" : "Create Question"}
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
