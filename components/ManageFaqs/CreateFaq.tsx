"use client";
import { Loader2 } from "lucide-react";
import { validationRules } from "@/utilities/constants";
import { useForm } from "react-hook-form";
import { CreateFaq } from "@/hooks/info-hook";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const imgArr = [
  "images/homepage/icon.svg",
  "images/homepage/icon1.svg",
  "images/homepage/icon2.svg",
  "images/homepage/icon3.svg",
  "images/homepage/icon4.svg",
  "images/homepage/icon5.svg",
];

function getRandomImg() {
  const randomIndex = Math.floor(Math.random() * imgArr.length);
  return imgArr[randomIndex];
}

const CreateFaqBox = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const router = useRouter();

  const { onSubmit: Create, loading } = CreateFaq();

  const onSubmit = (data: any) => {
    const image = getRandomImg();
    if (data) {
      const faq = {
        question: data.question.trim(),
        answer: data.answer.trim(),
        img: image,
      };
      Create(faq);
    }
  };

  return (
    <section className="dashboard-container min-h-svh">
      <div
        onClick={() => router.back()}
        className="flex text-[#010D3E] gap-3 text-xl items-center font-bold mb-6 cursor-pointer"
      >
        <FaArrowLeft />
        <span>Go back</span>
      </div>
      <h2 className="text-2xl font-bold mb-1 bg-text">Create New Faq</h2>
      <section className="flex justify-center w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
          <div className="flex   md:text-lg font-bold mt-16  justify-center">
            <span
              className={`tab active max-sm:h-[50px] text-xl w-full xsm:w-[200px]`}
            >
              Faq Details
            </span>
          </div>
          <p className=" text-[#010D3E] text-xl font-medium mt-9">
            Fill the form below
          </p>
          <section className="mt-8">
            <div className="flex formdivs flex-col mb-4 sm:mb-5 gap-[6px]">
              <label>
                Question <span className="text-red-600 text-base">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter faq question"
                {...register("question", {
                  required: validationRules.question.required,
                })}
              />
              {errors.question && (
                <span className="text-red-600 text-sm">{`${errors.question.message}`}</span>
              )}
            </div>
            <div className="flex formdivs flex-col mb-4 sm:mb-5 gap-[6px]">
              <label>
                Answer <span className="text-red-600 text-base">*</span>
              </label>
              <textarea
                placeholder="Enter faq anwser"
                {...register("answer", {
                  required: validationRules.answer.required,
                  maxLength: {
                    value: 1000,
                    message: "This cannot exceed 1000 words",
                  },
                })}
                rows={10}
                className="resize-none"
              />
              {errors.answer && (
                <span className="text-red-600 text-sm">{`${errors.answer.message}`}</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-[#010D3E] text-white shadow-sm rounded-lg btn-hover mt-20"
              disabled={isSubmitting}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </div>
              ) : (
                "Create Faq"
              )}
            </button>
          </section>
        </form>
      </section>
    </section>
  );
};

export default CreateFaqBox;
