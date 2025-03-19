import { User } from "@/types";

// Mock user data for demo
const ADMIN_USER: User = {
  id: "1",
  email: "admin@example.com",
  name: "Admin User",
  role: "admin",
};

// In a real app, we would use a proper authentication system
// This is a mock implementation for demonstration
let currentUser: User | null = null;
let isAuthenticated = false;

// Helper to simulate API delays
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Login function
export const login = async (email: string, password: string): Promise<User> => {
  await delay(1000); // Simulate network request

  // Demo credentials
  if (email === "admin@example.com" && password === "password") {
    currentUser = ADMIN_USER;
    isAuthenticated = true;

    // Save to localStorage to persist login
    localStorage.setItem("user", JSON.stringify(currentUser));

    return currentUser;
  }

  throw new Error("Invalid credentials");
};

// Logout function
export const logout = async (): Promise<void> => {
  await delay(500); // Simulate network request

  currentUser = null;
  isAuthenticated = false;

  // Clear from localStorage
  localStorage.removeItem("user");
};

// Check if user is logged in
export const checkAuth = async (): Promise<User | null> => {
  await delay(500); // Simulate network request

  // Try to get user from localStorage
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
    isAuthenticated = true;
    return currentUser;
  }

  return null;
};

// Get current user
export const getCurrentUser = (): User | null => {
  return currentUser;
};

// Check if user is authenticated
export const isUserAuthenticated = (): boolean => {
  return isAuthenticated;
};

// Protected route helper
export const requireAuth = (callback: () => void): void => {
  if (!isAuthenticated) {
    window.location.href = "/login";
    return;
  }

  callback();
};
