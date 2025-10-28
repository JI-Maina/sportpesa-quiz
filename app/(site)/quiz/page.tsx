import { QuizCard } from "@/components/question-set-card";
import { getQuizSets } from "@/data/quiz/get-quiz";

export default async function Home() {
  const quizSets = await getQuizSets();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            SportPesa Quizzes
          </h1>
          <p className="text-gray-600">Play, compete, and win cash prizes</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {quizSets && quizSets.length > 0 ? (
          <>
            {/* Results Count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{quizSets.length}</span>{" "}
                quizzes
              </p>

              {/* Sort Dropdown */}
              <select className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>Sort by: Newest</option>
                <option>Sort by: Prize Amount</option>
                <option>Sort by: Ending Soon</option>
              </select>
            </div>

            {/* Quiz Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizSets.map((quiz) => (
                <QuizCard key={quiz.uid} quizSet={quiz} />
              ))}
            </div>
          </>
        ) : (
          // Empty State
          <div className="text-center py-16">
            <div className="max-w-sm mx-auto">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚽</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Quizzes Available
              </h3>
              <p className="text-gray-500">
                New quizzes are coming soon. Stay tuned!
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
