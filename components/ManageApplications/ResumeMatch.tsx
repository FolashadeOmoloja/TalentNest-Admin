import { setApplication } from "@/redux/slices/applicationSlice";
import { APPLICATION_API_END_POINT } from "@/utilities/constants/constants";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const steps = ["Extracting", "Embedding", "Comparing", "Match Complete"];

interface stepToProgressType {
  extract: number;
  embed: number;
  compare: number;
  done: number;
}

const stepToProgress = {
  extract: 25,
  embed: 50,
  compare: 75,
  done: 100,
};

const TalentMatchProgress = ({ jobId }: { jobId: string }) => {
  const [currentStep, setCurrentStep] = useState("");
  const [progress, setProgress] = useState(0);
  const [matches, setMatches] = useState<{ talentId: string; score: number }[]>(
    []
  );
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const startMatching = async () => {
    setProgress(0);
    setMatches([]);
    setError("");
    setCurrentStep("Starting...");

    try {
      const response = await fetch(
        `${APPLICATION_API_END_POINT}/match-talents/${jobId}`
      );
      const reader = response?.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let partial = "";

      if (!reader) {
        setError("Unable to read response stream.");
        return;
      }

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        partial += decoder.decode(value, { stream: true });

        // Handle possible multiple chunks
        const chunks = partial.split("}{").map((chunk, index, arr) => {
          if (arr.length === 1) return chunk;
          if (index === 0) return chunk + "}";
          else if (index === arr.length - 1) return "{" + chunk;
          return "{" + chunk + "}";
        });

        for (const chunk of chunks) {
          try {
            const clean = chunk.trim();
            if (!clean) continue;

            const data = JSON.parse(clean);

            // Update progress
            if (
              data.step &&
              stepToProgress[data.step as keyof typeof stepToProgress]
            ) {
              setCurrentStep(
                steps[Object.keys(stepToProgress).indexOf(data.step)]
              );
              setProgress(
                stepToProgress[data.step as keyof typeof stepToProgress]
              );
            }

            if (data.step === "done" && data.matches) {
              setMatches(data.matches);
              dispatch(setApplication(data.updatedJob.applicants));
            }

            if (data.success === false) {
              setError(data.message || "Something went wrong");
              setProgress(0);
              return;
            }
          } catch (e) {
            // Ignore invalid JSON until next chunk
          }
        }
      }
    } catch (err: any) {
      setError("Connection error: " + err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Match Talents to Job</h2>

      <button
        onClick={startMatching}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Start Matching
      </button>

      <div className="mt-6">
        <div className="mb-2 text-gray-700 font-medium">
          {currentStep || "Not started"}
        </div>
        <div className="w-full bg-gray-200 h-4 rounded overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {error && <div className="mt-4 text-red-600 font-semibold">{error}</div>}

      {matches.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Match Results:</h3>
          <ul className="list-disc list-inside text-sm">
            {matches.map((match) => (
              <li key={match.talentId}>
                Talent: <span className="font-mono">{match.talentId}</span> →
                Score:{" "}
                <span className="font-bold">
                  {(match.score * 100).toFixed(2)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TalentMatchProgress;
