export type QuestionType = "yesno" | "rating" | "text";

export interface Question {
  id?: string;
  text: string;
  type: QuestionType;
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Response {
  id?: string;
  questionId: string;
  answer: string | number | boolean;
  userId?: string;
  timestamp: Date;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: "admin" | "user";
}

export interface WidgetConfig {
  position: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  primaryColor?: string;
  textColor?: string;
  buttonText?: string;
  thankYouMessage?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
