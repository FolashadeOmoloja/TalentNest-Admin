"use client";
import { Loader2 } from "lucide-react";
import { validationRules } from "@/utilities/constants";
import { FieldError, useForm } from "react-hook-form";
import { RegisterAdmin } from "@/hooks/admin-users-hook";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Dropdown from "../Elements/Dropdown";
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const RegisterNewAdmin = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const { onSubmit: Create, loading } = RegisterAdmin();

  const onSubmit = (data: any) => {
    if (data) {
      const admin = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        phoneNumber: data.mobileNo.trim(),
        emailAddress: data.email.trim(),
        password: data.password.trim(),
        accountRole: data.accountRole.trim(),
      };
      Create(admin);
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
      <h2 className="text-2xl font-bold mb-1 bg-text">Register New Admin</h2>
      <section className="flex justify-center w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
          <div className="flex   md:text-lg font-bold mt-16  justify-center">
            <span
              className={`tab active max-sm:h-[50px] text-xl w-full xsm:w-[200px]`}
            >
              Register
            </span>
          </div>
          <p className=" text-[#010D3E] text-xl font-medium mt-9">
            Fill the form below to register a new admin
          </p>
          <section className="mt-8">
            <div className="flex formdivs max-sm:flex-col mb-[20px] gap-[20px]">
              <div className="basis-1/2">
                <label>
                  First Name <span className="text-red-600 text-base">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  {...register("firstName", {
                    required: validationRules.firstName.required,
                  })}
                />
                {errors.firstName && (
                  <span className="text-red-500 text-sm">{`${errors.firstName.message}`}</span>
                )}
              </div>
              {/* Last Name */}
              <div className="basis-1/2">
                <label>
                  Last Name <span className="text-red-600 text-base">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  {...register("lastName", {
                    required: validationRules.lastName.required,
                  })}
                />
                {errors.lastName && (
                  <span className="text-red-500 text-sm">{`${errors.lastName.message}`}</span>
                )}
              </div>
            </div>
            {/* Email */}
            <div className="flex formdivs flex-col mb-4 gap-[6px]">
              <label>
                Email Address <span className="text-red-600 text-base">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter email address"
                {...register("email", {
                  required: validationRules.email.required,
                  pattern: validationRules.email.pattern,
                })}
              />
              {errors.email && (
                <span className="text-red-600 text-sm">{`${errors.email.message}`}</span>
              )}
            </div>
            {/* Mobile No. */}
            <div className="flex formdivs flex-col mb-4 gap-[6px]">
              <label>
                Phone Number <span className="text-red-600 text-base">*</span>
              </label>
              <input
                type="tel"
                placeholder="Enter phone number"
                {...register("mobileNo", {
                  required: validationRules.mobileNo.required,
                  pattern: validationRules.mobileNo.pattern,
                })}
              />

              {errors.mobileNo && (
                <span className="text-red-600 text-sm">{`${errors.mobileNo.message}`}</span>
              )}
            </div>
            <Dropdown
              ItemsArr={["SuperAdmin", "Admin"]}
              label="Admin role (super admin/ admin)"
              placeholder="Select admin role"
              name={"accountRole"}
              required={true}
              register={register}
              errors={errors.accountRole as FieldError}
              validationRules={validationRules.accountRole.required}
              setValue={setValue}
            />
            <br className="mb-4" />
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
                "Register Admin"
              )}
            </button>
          </section>
        </form>
      </section>
    </section>
  );
};

export default RegisterNewAdmin;
