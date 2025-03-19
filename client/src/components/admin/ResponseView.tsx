import React, { useState, useEffect } from "react";
import { Question, Response } from "@/types";
import {
  fetchResponses,
  fetchQuestion,
  getResponseStats,
} from "@/services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const ResponseView: React.FC = () => {
  const [responses, setResponses] = useState<Response[]>([]);
  const [questions, setQuestions] = useState<Record<string, Question>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<{
    totalResponses: number;
    averageRating: number;
    yesPercentage: number;
  }>({
    totalResponses: 0,
    averageRating: 0,
    yesPercentage: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // Fetch responses
        const responseData = await fetchResponses();
        setResponses(responseData);

        // Fetch stats
        const statsData = await getResponseStats();
        setStats(statsData);

        // Get unique question IDs
        const questionIds = [...new Set(responseData.map((r) => r.questionId))];

        // Fetch each question
        const questionMap: Record<string, Question> = {};
        for (const id of questionIds) {
          const question = await fetchQuestion(id);
          if (question) {
            questionMap[id] = question;
          }
        }

        setQuestions(questionMap);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load responses:", error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRatingData = () => {
    const ratingResponses = responses.filter(
      (r) => questions[r.questionId]?.type === "rating"
    );

    const ratingCounts = [1, 2, 3, 4, 5].map((rating) => ({
      name: `${rating} Star${rating !== 1 ? "s" : ""}`,
      count: ratingResponses.filter((r) => r.answer === rating).length,
    }));

    return ratingCounts;
  };

  const getYesNoData = () => {
    const yesNoResponses = responses.filter(
      (r) => questions[r.questionId]?.type === "yesno"
    );

    const yesCount = yesNoResponses.filter((r) => r.answer === true).length;
    const noCount = yesNoResponses.filter((r) => r.answer === false).length;

    return [
      { name: "Yes", value: yesCount },
      { name: "No", value: noCount },
    ];
  };

  const COLORS = ["#0088FE", "#FF8042"];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-feedback-blue"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-feedback-gray text-sm font-medium mb-1">
            Total Responses
          </h3>
          <p className="text-3xl font-semibold text-feedback-dark">
            {stats.totalResponses}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-feedback-gray text-sm font-medium mb-1">
            Average Rating
          </h3>
          <p className="text-3xl font-semibold text-feedback-dark">
            {stats.averageRating.toFixed(1)}{" "}
            <span className="text-sm text-feedback-gray">/ 5</span>
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-feedback-gray text-sm font-medium mb-1">
            Yes Responses
          </h3>
          <p className="text-3xl font-semibold text-feedback-dark">
            {stats.yesPercentage.toFixed(0)}%
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {getRatingData().some((d) => d.count > 0) && (
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium text-feedback-dark mb-4">
              Rating Distribution
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getRatingData()}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0071e3" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {getYesNoData().some((d) => d.value > 0) && (
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium text-feedback-dark mb-4">
              Yes/No Distribution
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getYesNoData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {getYesNoData().map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Response List */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-medium text-feedback-dark">
            Recent Responses
          </h3>
        </div>

        {responses.length === 0 ? (
          <div className="text-center py-12 px-4">
            <p className="text-feedback-gray">No responses yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {responses.slice(0, 10).map((response) => (
              <li key={response.id} className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-feedback-dark mb-1">
                      {questions[response.questionId]?.text ||
                        "Unknown Question"}
                    </h4>
                    <p className="text-base">
                      {questions[response.questionId]?.type === "yesno"
                        ? response.answer
                          ? "Yes"
                          : "No"
                        : questions[response.questionId]?.type === "rating"
                        ? `${response.answer} Star${
                            Number(response.answer) !== 1 ? "s" : ""
                          }`
                        : String(response.answer)}
                    </p>
                  </div>

                  <div className="text-xs text-feedback-gray mt-2 sm:mt-0">
                    <time dateTime={response.timestamp.toString()}>
                      {formatDate(response.timestamp)} at{" "}
                      {formatTime(response.timestamp)}
                    </time>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ResponseView;
