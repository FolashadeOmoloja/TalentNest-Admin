"use client";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ResetAdminPassword } from "@/hooks/admin-users-hook";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { validationRules } from "@/utilities/constants";

import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const ResetPasswordBox = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const router = useRouter();
  const { onSubmit: Reset, loading } = ResetAdminPassword();
  const { admin } = useSelector((store: any) => store.admin);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data: any) => {
    const adminData = {
      password: data.password.trim(),
    };
    Reset(adminData, admin._id);
  };

  return (
    <section className="dashboard-container min-h-screen">
      <div
        onClick={() => router.back()}
        className="flex text-[#010D3E] gap-3 text-xl items-center font-bold mb-6 cursor-pointer"
      >
        <FaArrowLeft />
        <span>Go back</span>
      </div>
      <h2 className="text-2xl font-bold mb-1 bg-text">Reset Admin Password</h2>
      <section className="flex justify-center w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
          <div className="text-[#010D3E] text-xl font-medium mb-8">
            Fill the form below to reset {admin.firstName} {admin.lastName}'s
            password
          </div>
          <div className="flex formdivs flex-col mb-6 gap-[6px]">
            <label>Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pr-10"
                {...register("password", {
                  required: "Password is required",
                  pattern: validationRules.password.pattern,
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-600 text-sm">{`${errors.password.message}`}</span>
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
              "Reset password"
            )}
          </button>
        </form>
      </section>
    </section>
  );
};

export default ResetPasswordBox;
