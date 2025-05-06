"use client";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { FieldError, useForm } from "react-hook-form";
import { UpdateAdmin, DeleteAdmin } from "@/hooks/admin-users-hook";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { validationRules } from "@/utilities/constants";
import Dropdown from "../Elements/Dropdown";

const UpdateAdminBox = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const router = useRouter();
  const { onSubmit: Update, loading: updateLoading } = UpdateAdmin();
  const { onSubmit: Delete, loading: deleteLoading } = DeleteAdmin();
  const { admin } = useSelector((store: any) => store.admin);

  useEffect(() => {
    if (admin) {
      setValue("firstName", admin.firstName || "");
      setValue("lastName", admin.lastName || "");
      setValue("mobileNo", admin.phoneNumber || "");
      setValue("email", admin.emailAddress || "");
      setValue("accountRole", admin.accountRole || "");
    }
  }, [admin, setValue]);

  const onSubmit = (data: any) => {
    const adminData = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      phoneNumber: data.mobileNo.trim(),
      emailAddress: data.email.trim(),
      accountRole: data.accountRole.trim(),
    };
    Update(adminData, admin._id);
  };

  const onDelete = () => {
    Delete(admin._id);
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
      <h2 className="text-2xl font-bold mb-1 bg-text">Update Admin</h2>
      <section className="flex justify-center w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
          <div className="text-[#010D3E] text-xl font-medium mb-8">
            Fill the form below
          </div>
          <div className="flex formdivs mb-[20px] gap-[20px]">
            {/* First Name */}
            <div className="basis-1/2">
              <label>
                First Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter First Name"
                {...register("firstName", {
                  required: validationRules.firstName.required,
                })}
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm">This is required</span>
              )}
            </div>
            {/* Last Name */}
            <div className="basis-1/2">
              <label>
                Last Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Last Name"
                {...register("lastName", {
                  required: validationRules.lastName.required,
                })}
              />
              {errors.lastName && (
                <span className="text-red-500 text-sm">This is required</span>
              )}
            </div>
          </div>
          {/* Email */}
          <div className="formdivs flex flex-col mb-4 gap-[6px]">
            <label>
              Email Address <span className="text-red-600">*</span>
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
              <span className="text-red-600 text-sm">This is required</span>
            )}
          </div>
          {/* Mobile No. */}
          <div className="formdivs flex flex-col mb-4 gap-[6px]">
            <label>
              Phone Number <span className="text-red-600">*</span>
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
              <span className="text-red-600 text-sm">This is required</span>
            )}
          </div>
          {/* Account Role */}
          <Dropdown
            ItemsArr={["SuperAdmin", "Admin"]}
            label="Admin Role"
            placeholder="Select Admin Role"
            name="accountRole"
            register={register}
            errors={errors.accountRole as FieldError}
            validationRules={validationRules.accountRole.required}
            setValue={setValue}
            selctedItem2={admin.accountRole}
            required={true}
          />

          {/* Submit & Delete Buttons */}
          <div className="mt-20 flex gap-10 max-xsm:gap-5">
            <button
              type="submit"
              className="w-full h-12 bg-[#010D3E] text-white shadow-sm rounded-lg btn-hover"
              disabled={isSubmitting || updateLoading}
            >
              {updateLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </div>
              ) : (
                "Update Admin"
              )}
            </button>
            <button
              type="button"
              className="login-btn centered gap-3 cursor-pointer icon-animate bg-red-500 text-white rounded-lg w-full h-12"
              onClick={onDelete}
              disabled={isSubmitting || deleteLoading}
            >
              {deleteLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </div>
              ) : (
                "Delete Admin"
              )}
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default UpdateAdminBox;
