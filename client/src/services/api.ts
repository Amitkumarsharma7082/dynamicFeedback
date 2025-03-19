import { Question, Response } from "@/types";

// Normally these would be stored in a .env file, but for demo purposes:
const API_URL = "https://api.example.com";
// In a production app, we would use a real backend
// This is a mock implementation for demonstration

// Mock data
let questions: Question[] = [
  {
    id: "1",
    text: "How would you rate your experience with our service?",
    type: "rating",
    isPublished: true,
    createdAt: new Date("2023-05-15"),
    updatedAt: new Date("2023-05-15"),
  },
  {
    id: "2",
    text: "Did you find what you were looking for today?",
    type: "yesno",
    isPublished: true,
    createdAt: new Date("2023-06-20"),
    updatedAt: new Date("2023-06-22"),
  },
  {
    id: "3",
    text: "Please tell us how we can improve our service",
    type: "text",
    isPublished: false,
    createdAt: new Date("2023-07-10"),
    updatedAt: new Date("2023-07-10"),
  },
];

let responses: Response[] = [
  {
    id: "1",
    questionId: "1",
    answer: 4,
    timestamp: new Date("2023-07-15T10:30:00"),
  },
  {
    id: "2",
    questionId: "1",
    answer: 5,
    timestamp: new Date("2023-07-16T14:20:00"),
  },
  {
    id: "3",
    questionId: "2",
    answer: true,
    timestamp: new Date("2023-07-16T15:45:00"),
  },
];

// Helper to simulate API delays
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Questions API
export const fetchQuestions = async (): Promise<Question[]> => {
  await delay(800);
  return [...questions];
};

export const fetchPublishedQuestions = async (): Promise<Question[]> => {
  await delay(500);
  return questions.filter((q) => q.isPublished);
};

export const fetchQuestion = async (
  id: string
): Promise<Question | undefined> => {
  await delay(300);
  return questions.find((q) => q.id === id);
};

export const createQuestion = async (
  question: Omit<Question, "id" | "createdAt" | "updatedAt">
): Promise<Question> => {
  await delay(500);
  const newQuestion: Question = {
    ...question,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  questions = [...questions, newQuestion];
  return newQuestion;
};

export const updateQuestion = async (
  id: string,
  question: Partial<Question>
): Promise<Question> => {
  await delay(500);
  const index = questions.findIndex((q) => q.id === id);
  if (index === -1) throw new Error("Question not found");

  const updatedQuestion = {
    ...questions[index],
    ...question,
    updatedAt: new Date(),
  };

  questions = [
    ...questions.slice(0, index),
    updatedQuestion,
    ...questions.slice(index + 1),
  ];

  return updatedQuestion;
};

export const deleteQuestion = async (id: string): Promise<void> => {
  await delay(500);
  questions = questions.filter((q) => q.id !== id);
};

// Responses API
export const fetchResponses = async (): Promise<Response[]> => {
  await delay(800);
  return [...responses];
};

export const fetchResponsesByQuestion = async (
  questionId: string
): Promise<Response[]> => {
  await delay(500);
  return responses.filter((r) => r.questionId === questionId);
};

export const createResponse = async (
  response: Omit<Response, "id">
): Promise<Response> => {
  await delay(300);
  const newResponse: Response = {
    ...response,
    id: Date.now().toString(),
  };
  responses = [...responses, newResponse];
  return newResponse;
};

// Analytics
export const getResponseStats = async (): Promise<{
  totalResponses: number;
  averageRating: number;
  yesPercentage: number;
}> => {
  await delay(1000);

  const totalResponses = responses.length;

  const ratingResponses = responses.filter(
    (r) => questions.find((q) => q.id === r.questionId)?.type === "rating"
  );

  const averageRating =
    ratingResponses.length > 0
      ? ratingResponses.reduce((sum, r) => sum + (r.answer as number), 0) /
        ratingResponses.length
      : 0;

  const yesnoResponses = responses.filter(
    (r) => questions.find((q) => q.id === r.questionId)?.type === "yesno"
  );

  const yesCount = yesnoResponses.filter((r) => r.answer === true).length;
  const yesPercentage =
    yesnoResponses.length > 0 ? (yesCount / yesnoResponses.length) * 100 : 0;

  return {
    totalResponses,
    averageRating,
    yesPercentage,
  };
};
