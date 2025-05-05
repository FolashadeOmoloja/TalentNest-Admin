"use client";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { EditReview, DeleteReview } from "@/hooks/info-hook";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { validationRules } from "@/utilities/constants";

const EditReviewBox = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      _id: "",
      fullname: "",
      role: "",
      review: "",
    },
  });
  const router = useRouter();
  const { onSubmit: Edit, loading } = EditReview();
  const { onSubmit: Delete } = DeleteReview();
  const { review } = useSelector((store: any) => store.review);

  useEffect(() => {
    if (review) {
      setValue("fullname", review.fullname);
      setValue("role", review.role);
      setValue("review", review.review);
    }
  }, [review, setValue]);

  const onSubmit = (data: any) => {
    if (data) {
      const reviewData = {
        fullname: data.fullname.trim(),
        role: data.role.trim(),
        review: data.review.trim(),
      };
      Edit(reviewData, review._id);
    }
  };

  const DeleteRev = () => {
    Delete(review._id);
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
      <h2 className="text-2xl font-bold mb-1">Edit Review</h2>
      <section className="flex justify-center w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-sm md:w-[70%] py-8 md:px-16 sm:px-6 px-4 mt-16 max-sm:mt-10 max-sm:py-6"
        >
          <div className="flex   md:text-lg font-bold mt-16  justify-center">
            <span
              className={`tab active max-sm:h-[50px] text-xl w-full xsm:w-[200px]`}
            >
              Review Details
            </span>
          </div>
          <p className="text-gray-500 text-lg mt-9">Fill the form below</p>
          <section className="mt-8">
            <div className="flex formdivs flex-col mb-4 sm:mb-5 gap-[6px]">
              <label>
                Full Name <span className="text-red-600 text-base">*</span>
              </label>
              <input
                type="text"
                placeholder="Fullname of reviewer"
                {...register("fullname", {
                  required: validationRules.fullname.required,
                })}
              />
              {errors.fullname && (
                <span className="text-red-600 text-sm">{`${errors.fullname.message}`}</span>
              )}
            </div>
            <div className="flex formdivs flex-col mb-4 sm:mb-5 gap-[6px]">
              <label>
                Role <span className="text-red-600 text-base">*</span>
              </label>
              <input
                type="text"
                placeholder="Role of reviewer e.g CEO"
                {...register("role", {
                  required: validationRules.role.required,
                })}
              />
              {errors.role && (
                <span className="text-red-600 text-sm">{`${errors.role.message}`}</span>
              )}
            </div>
            <div className="flex formdivs flex-col mb-4 sm:mb-5 gap-[6px]">
              <label>
                Review <span className="text-red-600 text-base">*</span>
              </label>
              <textarea
                placeholder="Enter review"
                {...register("review", {
                  required: validationRules.review.required,
                  maxLength: {
                    value: 1000,
                    message: "review cannot exceed 1000 words",
                  },
                })}
                rows={10}
                className="resize-none"
              />
              {errors.review && (
                <span className="text-red-600 text-sm">{`${errors.review.message}`}</span>
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
                  "Edit Review"
                )}
              </button>
              <div
                className="login-btn centered gap-3 cursor-pointer icon-animate"
                onClick={DeleteRev}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </div>
                ) : (
                  "Delete Review"
                )}
              </div>
            </div>
          </section>
        </form>
      </section>
    </section>
  );
};

export default EditReviewBox;
