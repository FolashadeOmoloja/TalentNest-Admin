"use client";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { EditFaq, DeleteFaq } from "@/hooks/info-hook";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { validationRules } from "@/utilities/constants";

const EditFaqBox = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      question: "",
      answer: "",
    },
  });
  const router = useRouter();
  const { onSubmit: Edit, loading } = EditFaq();
  const { onSubmit: Delete } = DeleteFaq();
  const { faq } = useSelector((store: any) => store.faq);

  useEffect(() => {
    if (faq) {
      setValue("question", faq.question);
      setValue("answer", faq.answer);
    }
  }, [faq, setValue]);

  const onSubmit = (data: any) => {
    if (data) {
      const faqData = {
        question: data.question.trim(),
        answer: data.answer.trim(),
        img: faq.img,
      };
      Edit(faqData, faq._id);
    }
  };

  const DeleteData = () => {
    Delete(faq._id);
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
      <h2 className="text-2xl font-bold mb-1">Edit Faq</h2>
      <section className="flex justify-center w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-sm md:w-[70%] py-8 md:px-16 sm:px-6 px-4 mt-16 max-sm:mt-10 max-sm:py-6"
        >
          <div className="flex   md:text-lg font-bold mt-16  justify-center">
            <span
              className={`tab active max-sm:h-[50px] text-xl w-full xsm:w-[200px]`}
            >
              Faq Details
            </span>
          </div>
          <p className="text-gray-500 text-lg mt-9">Fill the form below</p>
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
            <div className="mt-20 flex gap-10 max-xsm:gap-5">
              <button
                type="submit"
                className="w-full h-12 bg-[#010D3E] text-white shadow-sm rounded-lg btn-hover"
                disabled={isSubmitting}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </div>
                ) : (
                  "Edit Faq"
                )}
              </button>
              <div
                className="login-btn centered gap-3 cursor-pointer icon-animate"
                onClick={DeleteData}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </div>
                ) : (
                  "Delete Faq"
                )}
              </div>
            </div>
          </section>
        </form>
      </section>
    </section>
  );
};

export default EditFaqBox;
