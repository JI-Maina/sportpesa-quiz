"use client";

import Image from "next/image";
import { Calendar, Clock, Trophy, Lock, Play } from "lucide-react";
import { Button } from "./ui/button";
import { QuizSet } from "@/types/quiz-types";

export const QuizCard = ({ quizSet }: { quizSet: QuizSet }) => {
  const {
    category_name,
    description,
    theme_image,
    start_datetime,
    end_datetime,
    status,
    is_payable,
    amount_payable,
    prize_won,
  } = quizSet;

  // Format date and time
  const startDate = new Date(start_datetime);
  const endDate = new Date(end_datetime);
  const now = new Date();

  const isActive = now >= startDate && now <= endDate;
  const isUpcoming = now < startDate;
  const isEnded = now > endDate;

  // Status badges
  const getStatusBadge = () => {
    if (isEnded) return { text: "Ended", color: "bg-gray-500" };
    if (isUpcoming) return { text: "Upcoming", color: "bg-blue-500" };
    return { text: "Active", color: "bg-green-500" };
  };

  const statusBadge = getStatusBadge();

  // Payment badge
  const paymentBadge =
    is_payable === "PA"
      ? { text: `KSh ${amount_payable}`, color: "bg-orange-500" }
      : { text: "Free", color: "bg-green-500" };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
        {theme_image ? (
          <Image src={""} alt={category_name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Trophy className="w-16 h-16 text-white opacity-20" />
          </div>
        )}

        {/* Status and Payment Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${statusBadge.color}`}
          >
            {statusBadge.text}
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${paymentBadge.color}`}
          >
            {paymentBadge.text}
          </span>
        </div>

        {/* Prize Overlay */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-lg p-2">
          <div className="flex items-center gap-1 text-white">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-bold">KSh {prize_won}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
            {category_name}
          </h3>
          {description && (
            <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
          )}
        </div>

        {/* Date and Time Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>
              {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>
              {startDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -
              {endDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        {/* Time Progress Bar */}
        {isActive && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                style={{
                  width: `${Math.max(
                    5,
                    Math.min(
                      95,
                      ((now.getTime() - startDate.getTime()) /
                        (endDate.getTime() - startDate.getTime())) *
                        100
                    )
                  )}%`,
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Started</span>
              <span>
                Ends in{" "}
                {Math.ceil(
                  (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
                )}{" "}
                days
              </span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <Button
          className={`w-full ${
            isActive
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 hover:bg-gray-500"
          } text-white font-semibold py-3 rounded-lg transition-colors`}
          disabled={!isActive}
        >
          {isActive ? (
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Play Now
            </div>
          ) : isUpcoming ? (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Starting Soon
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Quiz Ended
            </div>
          )}
        </Button>

        {!isActive && <Button className="w-full mt-3">Leaderboard</Button>}
      </div>
    </div>
  );
};
