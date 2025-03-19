import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuestions } from "@/services/api";
import { logout, checkAuth } from "@/services/auth";
import { toast } from "@/hooks/use-toast";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";
import ResponseView from "./ResponseView";
import { Question } from "@/types";
import { LogOut, Plus, BarChart, MessagesSquare, Menu, X } from "lucide-react";

const Dashboard: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"questions" | "responses">(
    "questions"
  );
  const [isCreating, setIsCreating] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | undefined>(
    undefined
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      const user = await checkAuth();
      if (!user) {
        navigate("/login");
      }
    };

    verifyAuth();
  }, [navigate]);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setIsLoading(true);
      const data = await fetchQuestions();
      setQuestions(data);
    } catch (error) {
      toast({
        title: "Failed to load questions",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleCreateSuccess = () => {
    setIsCreating(false);
    loadQuestions();
  };

  const handleEditSuccess = () => {
    setEditingQuestion(undefined);
    loadQuestions();
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
  };

  return (
    <div className="min-h-screen bg-feedback-light">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-medium text-feedback-dark">
          Feedback Dashboard
        </h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } lg:block lg:w-64 bg-white border-r border-gray-200 lg:h-screen lg:sticky lg:top-0`}
        >
          <div className="p-6">
            <h1 className="text-xl font-bold text-feedback-dark mb-6 hidden lg:block">
              Feedback Dashboard
            </h1>

            <nav className="space-y-1">
              <button
                onClick={() => {
                  setActiveTab("questions");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center px-4 py-2.5 rounded-lg text-left ${
                  activeTab === "questions"
                    ? "bg-blue-50 text-feedback-blue"
                    : "text-feedback-dark hover:bg-gray-50"
                }`}
              >
                <MessagesSquare size={18} className="mr-3" />
                <span>Questions</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("responses");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center px-4 py-2.5 rounded-lg text-left ${
                  activeTab === "responses"
                    ? "bg-blue-50 text-feedback-blue"
                    : "text-feedback-dark hover:bg-gray-50"
                }`}
              >
                <BarChart size={18} className="mr-3" />
                <span>Analytics</span>
              </button>
            </nav>
          </div>

          <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-2 rounded-lg text-feedback-dark hover:bg-gray-100 transition-colors"
            >
              <LogOut size={18} className="mr-2" />
              <span>Sign out</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          {activeTab === "questions" && (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-2xl font-semibold text-feedback-dark mb-4 sm:mb-0">
                  Feedback Questions
                </h2>

                <button
                  onClick={() => setIsCreating(true)}
                  className="px-4 py-2 rounded-lg bg-feedback-blue text-white flex items-center shadow-button hover:bg-blue-600 transition-colors button-float"
                >
                  <Plus size={18} className="mr-1.5" />
                  <span>New Question</span>
                </button>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-feedback-blue"></div>
                </div>
              ) : (
                <>
                  {isCreating && (
                    <div className="mb-6">
                      <QuestionForm
                        onSuccess={handleCreateSuccess}
                        onCancel={() => setIsCreating(false)}
                      />
                    </div>
                  )}

                  {editingQuestion && (
                    <div className="mb-6">
                      <QuestionForm
                        question={editingQuestion}
                        onSuccess={handleEditSuccess}
                        onCancel={() => setEditingQuestion(undefined)}
                      />
                    </div>
                  )}

                  <QuestionList
                    questions={questions}
                    onEdit={setEditingQuestion}
                    onDelete={handleDeleteQuestion}
                    onRefresh={loadQuestions}
                  />
                </>
              )}
            </>
          )}

          {activeTab === "responses" && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-feedback-dark">
                  Response Analytics
                </h2>
                <p className="text-feedback-gray mt-1">
                  View and analyze feedback responses
                </p>
              </div>

              <ResponseView />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
