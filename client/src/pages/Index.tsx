import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FeedbackWidget from "@/components/widget/FeedbackWidget";

const Index = () => {
  const navigate = useNavigate();

  // Example widget configurations
  const widgetConfig = {
    position: "bottom-right",
    buttonText: "Feedback",
    thankYouMessage: "Thanks for your feedback!",
  };

  return (
    <div className="min-h-screen bg-feedback-light">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50 z-0"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-feedback-blue text-sm font-medium mb-6 animate-fade-in">
              Real-time Feedback Collection
            </span>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-feedback-dark mb-6 animate-fade-in"
              style={{ animationDelay: "100ms" }}
            >
              The Elegant Feedback Widget
            </h1>

            <p
              className="text-xl text-feedback-gray mb-8 animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              Collect feedback from your users with a beautiful, customizable
              widget that integrates seamlessly with any website.
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
              style={{ animationDelay: "300ms" }}
            >
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-3 rounded-xl bg-feedback-blue text-white font-medium shadow-button hover:bg-blue-600 transition-colors button-float"
              >
                Go to Dashboard
                <ArrowRight size={18} className="ml-2 inline" />
              </button>

              <a
                href="#embed-section"
                className="px-6 py-3 rounded-xl border border-gray-300 text-feedback-dark hover:bg-gray-50 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-feedback-dark mb-4">
              Powerful Features
            </h2>
            <p className="text-feedback-gray max-w-2xl mx-auto">
              Everything you need to collect and analyze user feedback on your
              website or application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-glass">
              <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-feedback-blue"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-feedback-dark mb-2">
                Customizable Widget
              </h3>
              <p className="text-feedback-gray">
                Easily customize the appearance and behavior of your feedback
                widget to match your brand.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-glass">
              <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-feedback-blue"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-feedback-dark mb-2">
                Detailed Analytics
              </h3>
              <p className="text-feedback-gray">
                Track response rates, analyze feedback trends, and export
                reports with ease.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-glass">
              <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-feedback-blue"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-feedback-dark mb-2">
                Real-time Updates
              </h3>
              <p className="text-feedback-gray">
                Questions are pushed to the widget instantly when published or
                updated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Embed Section */}
      <section id="embed-section" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-feedback-dark mb-4">
              Easy to Embed
            </h2>
            <p className="text-feedback-gray max-w-2xl mx-auto">
              Just add a single script tag to your website to get started.
            </p>
          </div>

          <div className="bg-gray-900 rounded-xl p-5 overflow-x-auto">
            <pre className="text-green-400 text-sm">
              <code>{`<script src="https://feedback-widget.example.com/widget.js"></script>
<script>
  window.FeedbackWidget.init({
    position: 'bottom-right',
    buttonText: 'Feedback',
    primaryColor: '#0071e3'
  });
</script>`}</code>
            </pre>
          </div>

          <div className="mt-12 text-center">
            <p className="text-feedback-dark mb-4">
              <strong>Want to see it in action?</strong> The widget is already
              embedded on this page!
            </p>
            <p className="text-feedback-gray">
              Try it by clicking the "Feedback" button in the bottom-right
              corner.
            </p>
          </div>
        </div>
      </section>

      {/* Admin Section */}
      <section className="py-16 bg-gradient-to-b from-feedback-light to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-feedback-dark mb-4">
                Admin Dashboard
              </h2>
              <p className="text-feedback-gray mb-6">
                Create custom questions, view responses, and analyze feedback
                data from a beautiful, intuitive dashboard.
              </p>
              <ul className="space-y-3">
                {[
                  "Create, edit, and publish questions",
                  "Choose from multiple response types",
                  "View detailed analytics and reports",
                  "Export data for further analysis",
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-green-500 mt-0.5 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-3 rounded-xl bg-feedback-blue text-white font-medium shadow-button hover:bg-blue-600 transition-colors button-float"
                >
                  Try the Dashboard
                  <ArrowRight size={18} className="ml-2 inline" />
                </button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-float">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-medium text-feedback-dark mb-4">
                    Preview
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-feedback-gray">
                        Question Text
                      </label>
                      <div className="bg-gray-100 p-3 rounded-lg text-gray-500 text-sm">
                        How would you rate your experience?
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-feedback-gray">
                        Response Type
                      </label>
                      <div className="flex space-x-2">
                        <div className="bg-blue-50 text-feedback-blue px-3 py-1.5 rounded-lg text-sm">
                          Rating Scale
                        </div>
                        <div className="bg-gray-100 text-gray-500 px-3 py-1.5 rounded-lg text-sm">
                          Yes/No
                        </div>
                        <div className="bg-gray-100 text-gray-500 px-3 py-1.5 rounded-lg text-sm">
                          Open Text
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 flex justify-end">
                      <button className="px-4 py-2 rounded-lg bg-feedback-blue text-white text-sm shadow-sm">
                        Publish Question
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embed the feedback widget */}
      <FeedbackWidget config={widgetConfig} />
    </div>
  );
};

export default Index;
