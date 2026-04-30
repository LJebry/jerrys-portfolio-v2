"use client";

import { FormEvent, useMemo, useState } from "react";

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

const maxAttempts = 6;
const wordLength = 5;

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

export function WordleGame() {
  const [guess, setGuess] = useState("");
  const [rows, setRows] = useState<GuessRow[]>([]);
  const [message, setMessage] = useState(
    "Guess today's five-letter word in six tries.",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasWon = rows.some((row) =>
    row.statuses.every((status) => status === "correct"),
  );
  const isComplete = hasWon || rows.length >= maxAttempts;

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isComplete) return;

    const normalizedGuess = guess.trim().toLowerCase();
    if (!/^[a-z]{5}$/.test(normalizedGuess)) {
      setMessage("Enter exactly five letters.");
      return;
    }

    setIsSubmitting(true);
    setMessage("Checking...");

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
        setMessage(result.error || "Could not check that guess.");
        return;
      }

      const nextRows = [
        ...rows,
        {
          guess: normalizedGuess,
          statuses: getStatuses(result),
        },
      ];
      setRows(nextRows);
      setGuess("");

      if (result.was_correct) {
        setMessage("Nice. You solved today's word.");
      } else if (nextRows.length >= maxAttempts) {
        setMessage("Out of guesses. Come back tomorrow for a new word.");
      } else {
        setMessage(`${maxAttempts - nextRows.length} guesses left.`);
      }
    } catch {
      setMessage("The Wordle service is not responding right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="border border-secondary/25 bg-surface p-4 sm:p-5">
      <div className="mb-5 flex flex-col gap-2 border-b border-secondary/25 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.24em] text-accent">
            Daily Wordle
          </p>
          <h2 className="mt-2 font-display text-4xl font-semibold uppercase text-foreground">
            Play Break
          </h2>
        </div>
        <p className="text-sm text-secondary">
          {rows.length}/{maxAttempts} attempts
        </p>
      </div>

      <div className="mx-auto grid max-w-[270px] gap-1.5">
        {boardRows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-5 gap-1.5">
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

      <form onSubmit={handleSubmit} className="mx-auto mt-4 flex max-w-[270px] gap-3">
        <input
          value={guess}
          onChange={(event) => {
            const nextValue = event.target.value
              .replace(/[^a-zA-Z]/g, "")
              .slice(0, wordLength);
            setGuess(nextValue);
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

      <p className="mt-4 min-h-6 text-sm text-secondary" role="status">
        {message}
      </p>
    </div>
  );
}
