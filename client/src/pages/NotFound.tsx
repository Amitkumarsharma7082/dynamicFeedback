import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-feedback-light p-4">
      <div className="card-glass w-full max-w-md p-8 text-center animate-fade-in">
        <h1 className="text-4xl font-bold text-feedback-dark mb-4">404</h1>
        <p className="text-xl text-feedback-gray mb-6">
          This page doesn't exist
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-5 py-2.5 rounded-xl bg-feedback-blue text-white font-medium hover:bg-blue-600 transition-colors shadow-button button-float"
        >
          <ArrowLeft size={18} className="mr-2" />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
