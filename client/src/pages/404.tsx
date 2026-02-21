"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import TRIVIA from "@/trivia.json";

interface Trivia {
  question: string;
  answer: string;
}

export default function Custom404() {
  const [gameQuestions, setGameQuestions] = useState<Trivia[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);

  const currentTrivia = gameQuestions[currentQuestionIndex];

  const generateQuestions = () => {
    const shuffled = TRIVIA.sort(() => Math.random() - 0.5).slice(0, 10);
    setGameQuestions(shuffled);
  };

  useEffect(() => {
    if (!currentTrivia) return;

    const wrongAnswers = TRIVIA.filter((t) => t.answer !== currentTrivia.answer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((t) => t.answer);

    const allOptions = [currentTrivia.answer, ...wrongAnswers].sort(
      () => Math.random() - 0.5,
    );
    setOptions(allOptions);
  }, [currentQuestionIndex, currentTrivia]);

  useEffect(() => {
    if (!gameActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  const startGame = () => {
    generateQuestions();
    setGameActive(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(30);
    setAnswered(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = (answer: string) => {
    if (answered) return;

    setSelectedAnswer(answer);
    setAnswered(true);

    if (answer === currentTrivia.answer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < gameQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setAnswered(false);
        setSelectedAnswer(null);
      } else {
        setGameActive(false);
      }
    }, 1000);
  };

  const getButtonClass = (option: string) => {
    const baseClass =
      "w-full rounded border p-2.5 text-left text-sm transition-all cursor-pointer md:p-3 md:text-base";

    if (!answered) {
      return `${baseClass} bg-card border-border text-foreground hover:border-accent`;
    }

    if (option === currentTrivia.answer) {
      return `${baseClass} bg-primary border-accent text-accent-foreground font-semibold`;
    }

    if (option === selectedAnswer && option !== currentTrivia.answer) {
      return `${baseClass} bg-accent border-secondary text-secondary-foreground`;
    }

    return `${baseClass} bg-muted border-border text-muted-foreground`;
  };

  return (
    <main className="mx-auto flex h-dvh max-w-6xl items-center overflow-hidden px-4 py-4 sm:px-6 sm:py-6 md:px-16 md:py-8 lg:px-20 lg:py-10">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="mb-4 text-center font-jersey10 text-5xl text-primary md:mb-5 md:text-[3.25rem]">
          404
        </h1>
        <h2 className="mb-2 text-center font-jersey10 text-xl text-foreground md:mb-3 md:text-[1.4rem]">
          Page Not Found
        </h2>

        <p className="mb-4 text-center text-sm text-foreground md:mb-5 md:text-base">
          Test your game knowledge with some rapid-fire trivia instead!!!
        </p>

        {!gameActive ? (
          <div className="mb-4 space-y-3 md:mb-5 md:space-y-3.5">
            {gameQuestions.length === 0 ? (
              <>
                <p className="mb-3 text-sm text-muted-foreground md:mb-3 md:text-base">
                  Answer 10 random gaming trivia questions in 30 seconds!
                </p>
                <Button onClick={startGame} className="w-full">
                  Start Trivia
                </Button>
              </>
            ) : (
              <>
                <p className="mb-3 text-center font-jersey10 text-2xl font-bold text-primary md:mb-3">
                  Game Over!
                </p>
                <p className="mb-3 text-center text-sm text-foreground md:mb-3 md:text-base">
                  Final Score:
                  <span className="text-xl font-bold text-primary">
                    {score}
                  </span>{" "}
                  / 10
                </p>
                <Button onClick={startGame} className="w-full">
                  Play Again
                </Button>
              </>
            )}
          </div>
        ) : (
          <div className="md:space-y-4.5 mb-4 space-y-4 md:mb-5">
            <div className="mb-2 flex items-center justify-between md:mb-3">
              <p className="text-xs text-muted-foreground md:text-sm">
                Question {currentQuestionIndex + 1} / 10
              </p>
              <div
                className={`font-jersey10 text-2xl font-bold md:text-[1.9rem] ${
                  timeLeft <= 10 ? "text-destructive" : "text-primary"
                }`}
              >
                {timeLeft}s
              </div>
            </div>

            <div className="md:space-y-4.5 space-y-4 rounded border border-border bg-card p-4 md:p-5">
              <p className="text-base leading-snug text-foreground md:text-[1.05rem]">
                {currentTrivia.question}
              </p>

              <div className="space-y-2.5 md:space-y-3">
                {options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    className={getButtonClass(option)}
                    disabled={answered}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <p className="text-xs text-foreground md:text-sm">
                Score:{" "}
                <span className="font-jersey10 font-bold text-primary">
                  {score} / 10
                </span>
              </p>
            </div>
          </div>
        )}

        <Link href="/">
          <Button variant="outline" className="w-full">
            Go Home
          </Button>
        </Link>
      </div>
    </main>
  );
}
