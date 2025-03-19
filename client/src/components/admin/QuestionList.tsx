import React, { useState } from "react";
import { Question } from "@/types";
import { updateQuestion, deleteQuestion } from "@/services/api";
import { toast } from "@/hooks/use-toast";
import { Edit, Trash2, EyeOff, Eye, MoreVertical } from "lucide-react";

interface QuestionListProps {
  questions: Question[];
  onEdit: (question: Question) => void;
  onDelete: (questionId: string) => void;
  onRefresh: () => void;
}

const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  onEdit,
  onDelete,
  onRefresh,
}) => {
  const [actionQuestion, setActionQuestion] = useState<string | null>(null);
  const [isToggling, setIsToggling] = useState(false);

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case "rating":
        return "Rating Scale";
      case "yesno":
        return "Yes/No";
      case "text":
        return "Open Text";
      default:
        return type;
    }
  };

  const togglePublishStatus = async (question: Question) => {
    if (isToggling || !question.id) return;

    setIsToggling(true);
    try {
      await updateQuestion(question.id, {
        isPublished: !question.isPublished,
      });

      toast({
        title: question.isPublished
          ? "Question unpublished"
          : "Question published",
        description: question.isPublished
          ? "The question is now hidden from users"
          : "The question is now visible to users",
      });

      onRefresh();
    } catch (error) {
      toast({
        title: "Operation failed",
        description: "Failed to update question status",
        variant: "destructive",
      });
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async (questionId: string) => {
    if (!questionId) return;

    if (
      window.confirm(
        "Are you sure you want to delete this question? This action cannot be undone."
      )
    ) {
      try {
        await deleteQuestion(questionId);
        onDelete(questionId);
        toast({
          title: "Question deleted",
          description: "The question has been permanently removed",
        });
      } catch (error) {
        toast({
          title: "Delete failed",
          description: "Failed to delete the question",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {questions.length === 0 ? (
        <div className="text-center py-12 px-4">
          <h3 className="text-lg font-medium text-feedback-dark mb-2">
            No questions yet
          </h3>
          <p className="text-feedback-gray">
            Create your first question to start collecting feedback.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {questions.map((question) => (
            <li
              key={question.id}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0 pr-4">
                  <h3 className="text-base font-medium text-feedback-dark truncate">
                    {question.text}
                  </h3>
                  <div className="flex items-center mt-1 space-x-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        question.isPublished
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {question.isPublished ? "Published" : "Draft"}
                    </span>
                    <span className="text-xs text-feedback-gray">
                      {getQuestionTypeLabel(question.type)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => togglePublishStatus(question)}
                    disabled={isToggling}
                    className="p-1.5 rounded-full hover:bg-gray-200 transition-colors"
                    title={question.isPublished ? "Unpublish" : "Publish"}
                  >
                    {question.isPublished ? (
                      <EyeOff size={18} className="text-feedback-gray" />
                    ) : (
                      <Eye size={18} className="text-feedback-gray" />
                    )}
                  </button>

                  <button
                    onClick={() => onEdit(question)}
                    className="p-1.5 rounded-full hover:bg-gray-200 transition-colors"
                    title="Edit"
                  >
                    <Edit size={18} className="text-feedback-gray" />
                  </button>

                  <button
                    onClick={() => handleDelete(question.id!)}
                    className="p-1.5 rounded-full hover:bg-gray-200 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} className="text-feedback-gray" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionList;
