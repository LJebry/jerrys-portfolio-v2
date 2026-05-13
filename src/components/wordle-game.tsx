"use client";

import { FormEvent, useEffect, useMemo, useReducer, useRef } from "react";
import Toaster, { type ToasterRef } from "@/components/ui/toast";

type LetterStatus = "empty" | "absent" | "present" | "correct";

type GuessRow = {
  guess: string;
  statuses: LetterStatus[];
};

type ApiCharacterInfo = {
  char: string;
  scoring: {
    in_word: boolean;
    correct_idx: boolean;
  };
};

type ApiResponse = {
  guess?: string;
  was_correct?: boolean;
  character_info?: ApiCharacterInfo[];
  error?: string;
};

type AnswerResponse = {
  answer?: string;
  error?: string;
};

type WordleState = {
  guess: string;
  rows: GuessRow[];
  message: string;
  isSubmitting: boolean;
  nextWordCountdown: string;
};

type WordleAction =
  | { type: "set-guess"; guess: string }
  | { type: "set-countdown"; nextWordCountdown: string }
  | {
      type: "notify";
      message: string;
    }
  | { type: "submit-start" }
  | { type: "submit-finish" }
  | { type: "commit-guess"; row: GuessRow };

const maxAttempts = 6;
const wordLength = 5;
const keyboardRows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
const initialWordleState: WordleState = {
  guess: "",
  rows: [],
  message: "Guess today's five-letter word in six tries.",
  isSubmitting: false,
  nextWordCountdown: "",
};
const statusRank: Record<LetterStatus, number> = {
  empty: 0,
  absent: 1,
  present: 2,
  correct: 3,
};

function wordleReducer(
  state: WordleState,
  action: WordleAction,
): WordleState {
  switch (action.type) {
    case "set-guess":
      return { ...state, guess: action.guess };
    case "set-countdown":
      return {
        ...state,
        nextWordCountdown: action.nextWordCountdown,
      };
    case "notify":
      return { ...state, message: action.message };
    case "submit-start":
      return { ...state, isSubmitting: true, message: "Checking..." };
    case "submit-finish":
      return { ...state, isSubmitting: false };
    case "commit-guess":
      return {
        ...state,
        guess: "",
        rows: [...state.rows, action.row],
      };
  }
}

function getNextWordCountdown() {
  const now = new Date();
  const nextUtcMidnight = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
  );
  const diff = Math.max(0, nextUtcMidnight - now.getTime());
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return [hours, minutes, seconds]
    .map((value) => value.toString().padStart(2, "0"))
    .join(":");
}

function getStatuses(response: ApiResponse): LetterStatus[] {
  if (response.was_correct) {
    return Array.from({ length: wordLength }, () => "correct");
  }

  return Array.from({ length: wordLength }, (_, index) => {
    const info = response.character_info?.[index];

    if (!info?.scoring.in_word) return "absent";
    if (info.scoring.correct_idx) return "correct";
    return "present";
  });
}

function getCellClass(status: LetterStatus) {
  switch (status) {
    case "correct":
      return "border-accent bg-accent text-foreground";
    case "present":
      return "border-[#d6a84f] bg-[#d6a84f] text-background";
    case "absent":
      return "border-secondary/25 bg-secondary/20 text-secondary";
    default:
      return "border-secondary/25 bg-background text-foreground";
  }
}

function getKeyClass(status: LetterStatus) {
  switch (status) {
    case "correct":
      return "border-accent bg-accent text-foreground";
    case "present":
      return "border-[#d6a84f] bg-[#d6a84f] text-background";
    case "absent":
      return "border-secondary/25 bg-secondary/20 text-secondary";
    default:
      return "border-secondary/25 bg-background text-foreground hover:border-accent/70";
  }
}

function WordleHeader({
  attempts,
  nextWordCountdown,
}: {
  attempts: number;
  nextWordCountdown: string;
}) {
  return (
    <div className="mb-4 flex flex-col gap-2 border-b border-secondary/25 pb-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="font-display text-xs uppercase tracking-[0.24em] text-accent">
          Daily Wordle
        </p>
        <h2 className="mt-2 font-display text-4xl font-semibold uppercase text-foreground">
          Play Break
        </h2>
      </div>
      <div className="text-left text-sm text-secondary sm:text-right">
        <p>
          {attempts}/{maxAttempts} attempts
        </p>
        <p className="mt-1 font-display text-xs uppercase tracking-[0.16em] text-secondary/75">
          Next word{" "}
          <span className="text-foreground">
            {nextWordCountdown || "--:--:--"}
          </span>
        </p>
      </div>
    </div>
  );
}

export function WordleGame() {
  const toasterRef = useRef<ToasterRef>(null);
  const [state, dispatch] = useReducer(wordleReducer, initialWordleState);
  const { guess, rows, message, isSubmitting, nextWordCountdown } = state;
  const hasWon = rows.some((row) =>
    row.statuses.every((status) => status === "correct"),
  );
  const isComplete = hasWon || rows.length >= maxAttempts;

  useEffect(() => {
    const updateCountdown = () =>
      dispatch({
        type: "set-countdown",
        nextWordCountdown: getNextWordCountdown(),
      });

    updateCountdown();
    const intervalId = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  function notify({
    title,
    nextMessage,
    variant = "default",
  }: {
    title: string;
    nextMessage: string;
    variant?: "default" | "success" | "error" | "warning";
  }) {
    dispatch({ type: "notify", message: nextMessage });
    toasterRef.current?.show({
      title,
      message: nextMessage,
      variant,
      position: "bottom-right",
      duration: 3000,
    });
  }

  const boardRows = useMemo(() => {
    const committedRows = rows.map((row) => ({
      letters: row.guess.toUpperCase().padEnd(wordLength).split(""),
      statuses: row.statuses,
    }));

    const activeRow =
      !isComplete && rows.length < maxAttempts
        ? [
            {
              letters: guess.toUpperCase().padEnd(wordLength).split(""),
              statuses: Array.from(
                { length: wordLength },
                () => "empty" as LetterStatus,
              ),
            },
          ]
        : [];

    const fillerCount = maxAttempts - committedRows.length - activeRow.length;
    const fillerRows = Array.from({ length: fillerCount }, () => ({
      letters: Array.from({ length: wordLength }, () => " "),
      statuses: Array.from(
        { length: wordLength },
        () => "empty" as LetterStatus,
      ),
    }));

    return [...committedRows, ...activeRow, ...fillerRows];
  }, [guess, isComplete, rows]);

  const keyboardStatuses = useMemo(() => {
    const statuses: Record<string, LetterStatus> = {};

    rows.forEach((row) => {
      row.guess.split("").forEach((letter, index) => {
        const currentStatus = statuses[letter] || "empty";
        const nextStatus = row.statuses[index] || "empty";

        if (statusRank[nextStatus] > statusRank[currentStatus]) {
          statuses[letter] = nextStatus;
        }
      });
    });

    return statuses;
  }, [rows]);

  function addLetter(letter: string) {
    if (isSubmitting || isComplete || guess.length >= wordLength) return;
    dispatch({
      type: "set-guess",
      guess: `${guess}${letter}`.slice(0, wordLength),
    });
  }

  async function revealAnswer() {
    try {
      const response = await fetch("/api/wordle", {
        method: "GET",
      });
      const result = (await response.json()) as AnswerResponse;

      if (!response.ok || !result.answer) {
        return "Out of guesses. Could not reveal today's word right now.";
      }

      return `Out of guesses. Today's word was ${result.answer.toUpperCase()}.`;
    } catch {
      return "Out of guesses. Could not reveal today's word right now.";
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isComplete) return;

    const normalizedGuess = guess.trim().toLowerCase();
    if (!/^[a-z]{5}$/.test(normalizedGuess)) {
      notify({
        title: "Not enough letters",
        nextMessage: "Enter exactly five letters.",
        variant: "warning",
      });
      return;
    }

    dispatch({ type: "submit-start" });

    try {
      const response = await fetch("/api/wordle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ guess: normalizedGuess }),
      });
      const result = (await response.json()) as ApiResponse;

      if (!response.ok || result.error) {
        notify({
          title: response.status === 400 ? "Invalid guess" : "Wordle error",
          nextMessage: result.error || "Could not check that guess.",
          variant: response.status === 400 ? "warning" : "error",
        });
        return;
      }

      const nextRows = [
        ...rows,
        {
          guess: normalizedGuess,
          statuses: getStatuses(result),
        },
      ];
      dispatch({
        type: "commit-guess",
        row: {
          guess: normalizedGuess,
          statuses: getStatuses(result),
        },
      });

      if (result.was_correct) {
        notify({
          title: "Solved",
          nextMessage: "Nice. You solved today's word.",
          variant: "success",
        });
      } else if (nextRows.length >= maxAttempts) {
        const answerMessage = await revealAnswer();
        notify({
          title: "Game over",
          nextMessage: answerMessage,
          variant: "warning",
        });
      } else {
        notify({
          title: "Guess checked",
          nextMessage: `${maxAttempts - nextRows.length} guesses left.`,
        });
      }
    } catch {
      notify({
        title: "Service unavailable",
        nextMessage: "The Wordle service is not responding right now.",
        variant: "error",
      });
    } finally {
      dispatch({ type: "submit-finish" });
    }
  }

  return (
    <div className="border border-secondary/25 bg-surface p-4 sm:p-5">
      <Toaster ref={toasterRef} defaultPosition="bottom-right" />

      <WordleHeader
        attempts={rows.length}
        nextWordCountdown={nextWordCountdown}
      />

      <div className="mx-auto grid max-w-60 gap-1">
        {boardRows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-5 gap-1">
            {row.letters.map((letter, letterIndex) => (
              <div
                key={`${rowIndex}-${letterIndex}`}
                className={`flex aspect-square items-center justify-center border font-display text-xl font-semibold uppercase transition-colors sm:text-2xl ${getCellClass(
                  row.statuses[letterIndex],
                )}`}
              >
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>

      <form
        id="wordle-guess-form"
        onSubmit={handleSubmit}
        className="mx-auto mt-3 flex max-w-67.5 gap-3"
      >
        <input
          value={guess}
          onChange={(event) => {
            const nextValue = event.target.value
              .replace(/[^a-zA-Z]/g, "")
              .slice(0, wordLength);
            dispatch({ type: "set-guess", guess: nextValue });
          }}
          disabled={isSubmitting || isComplete}
          aria-label="Five-letter guess"
          className="h-11 min-w-0 flex-1 border border-secondary/25 bg-background px-3 font-display text-lg uppercase tracking-[0.18em] text-foreground outline-none focus:border-accent disabled:opacity-50"
          maxLength={wordLength}
          placeholder="WORDS"
        />
        <button
          type="submit"
          disabled={isSubmitting || isComplete}
          className="h-11 border border-accent bg-accent px-4 font-display text-sm uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-transparent disabled:pointer-events-none disabled:opacity-50"
        >
          Guess
        </button>
      </form>

      <div
        className="mx-auto mt-4 grid max-w-105 gap-1.5"
        aria-label="Guessed letters keyboard"
      >
        {keyboardRows.map((keyboardRow, rowIndex) => (
          <div
            key={keyboardRow}
            className={`flex justify-center gap-1.5 ${
              rowIndex === 1 ? "px-4" : rowIndex === 2 ? "px-10" : ""
            }`}
          >
            {keyboardRow.split("").map((letter) => {
              const status = keyboardStatuses[letter] || "empty";

              return (
                <button
                  key={letter}
                  type="button"
                  onClick={() => addLetter(letter)}
                  disabled={isSubmitting || isComplete}
                  className={`flex h-9 min-w-8 flex-1 items-center justify-center border font-display text-sm uppercase transition-colors disabled:pointer-events-none disabled:opacity-50 sm:min-w-9 ${getKeyClass(
                    status,
                  )}`}
                  aria-label={`${letter.toUpperCase()}${
                    status === "empty" ? "" : ` ${status}`
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <p className="mt-3 min-h-6 text-sm text-secondary" role="status">
        {message}
      </p>
    </div>
  );
}
