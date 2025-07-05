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
  const [loading, setLoading] = useState(false);
  const [failedMatch, setFailedMatch] = useState(false);
  const dispatch = useDispatch();
  const startMatching = () => {
    setLoading(true);
    setFailedMatch(false);
    const eventSource = new EventSource(
      `${APPLICATION_API_END_POINT}/match-talents/${jobId}`,
      { withCredentials: true }
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);

      if (
        data.step &&
        stepToProgress[data.step as keyof typeof stepToProgress]
      ) {
        setCurrentStep(steps[Object.keys(stepToProgress).indexOf(data.step)]);
        setProgress(stepToProgress[data.step as keyof typeof stepToProgress]);
      }

      if (data.step === "done" && data.matches) {
        dispatch(setApplication(data.updatedJob.applicants));
        setTimeout(() => activeFunc(1), 1000);
        setLoading(false);
        setFailedMatch(false);
        eventSource.close();
      }

      if (data.success === false) {
        setError(data.message || "Something went wrong");
        setProgress(0);
        eventSource.close();
        setLoading(false);
        setFailedMatch(true);
      }
    };

    eventSource.onerror = () => {
      setError("Connection error");
      eventSource.close();
      setLoading(false);
      setFailedMatch(true);
    };
  };

  return (
    <div className="max-w-xl ">
      <CTABTN
        route={""}
        isFunc
        func={startMatching}
        CTA={progress == 100 || failedMatch ? "Re-Match" : "Start Matching"}
        backGround={loading ? "bg-gray-700" : "bg-[#001E80]"}
        width="w-[200px] max-xxsm:w-full"
        height2="h-[50px] text-sm"
        disabled={loading}
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
