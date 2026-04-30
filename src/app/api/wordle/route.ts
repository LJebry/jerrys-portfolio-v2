import englishWords from "an-array-of-english-words/index.json";

type WordleRequest = {
  guess?: unknown;
};

const validFiveLetterGuesses = new Set(
  (englishWords as string[]).filter((word) => /^[a-z]{5}$/.test(word)),
);

export async function POST(request: Request) {
  let body: WordleRequest;

  try {
    body = (await request.json()) as WordleRequest;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const guess =
    typeof body.guess === "string" ? body.guess.trim().toLowerCase() : "";

  if (!/^[a-z]{5}$/.test(guess)) {
    return Response.json(
      { error: "Guess must be exactly five letters." },
      { status: 400 },
    );
  }

  if (!validFiveLetterGuesses.has(guess)) {
    return Response.json(
      { error: "That does not look like a valid word." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch("https://wordle-api.vercel.app/api/wordle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ guess }),
      cache: "no-store",
    });

    if (!response.ok) {
      return Response.json(
        { error: "Wordle service is unavailable right now." },
        { status: 502 },
      );
    }

    const result = await response.json();
    return Response.json(result);
  } catch {
    return Response.json(
      { error: "Could not reach the Wordle service." },
      { status: 502 },
    );
  }
}
