import { setApplication } from "@/redux/slices/applicationSlice";
import { APPLICATION_API_END_POINT } from "@/utilities/constants/constants";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CTABTN from "../Elements/CTA-Button";

const steps = ["Extracting", "Embedding", "Comparing", "Match Complete"];
const stepToProgress = {
  extract: 25,
  embed: 50,
  compare: 75,
  done: 100,
};

const TalentMatchProgress = ({
  jobId,
  activeFunc,
}: {
  jobId: string;
  activeFunc: (idx: number) => void;
}) => {
  const [currentStep, setCurrentStep] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const startMatching = async () => {
    setProgress(0);
    setError("");
    setCurrentStep("Starting...");

    try {
      const response = await fetch(
        `${APPLICATION_API_END_POINT}/match-talents/${jobId}`,
        {
          method: "GET",
          credentials: "include",
        }
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
              dispatch(setApplication(data.updatedJob.applicants));
              setTimeout(() => {
                activeFunc(1);
              }, 1000);
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
    <div className="max-w-xl ">
      <CTABTN
        route={""}
        isFunc
        func={startMatching}
        CTA={progress == 100 ? "Re-Match" : "Start Matching"}
        backGround="bg-[#001E80]"
        width="w-[200px] max-xxsm:w-full"
        height2="h-[50px] text-sm"
      />
      <div className="mt-4">
        <div className="mb-2 text-gray-700 font-medium text-sm">
          {currentStep || "Not started"}
        </div>
        <div className="w-full bg-gray-200 h-4 rounded overflow-hidden">
          <div
            className="bg-[#001E80] h-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {error && <div className="mt-4 text-red-600 font-semibold">{error}</div>}
    </div>
  );
};

export default TalentMatchProgress;
