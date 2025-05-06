"use client";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { validationRules } from "@/utilities/constants";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { CreateBlogPost } from "@/hooks/content-hook";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreateBlog = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const router = useRouter();

  const { onSubmit: Create, loading } = CreateBlogPost();

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("content", content);
    if (image) formData.append("file", image);

    Create(formData);
  };

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0]);
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
      <h2 className="text-2xl font-bold mb-1 bg-text">Create New Blog Post</h2>
      <section className="flex justify-center w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
          <div className="flex   md:text-lg font-bold mt-16  justify-center">
            <span
              className={`tab active max-sm:h-[50px] text-xl w-full xsm:w-[200px]`}
            >
              Blog Post Details
            </span>
          </div>
          <p className=" text-[#010D3E] text-xl font-medium mt-9">
            Fill the form below to create a post
          </p>
          <section className="mt-8">
            <div className="flex formdivs flex-col mb-4 sm:mb-5 gap-[6px]">
              <label>
                Post Title <span className="text-red-600 text-base">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter a title for your post"
                {...register("title", {
                  required: validationRules.title.required,
                })}
              />
              {errors.title && (
                <span className="text-red-600 text-sm">{`${errors.title.message}`}</span>
              )}
            </div>
            <div className="flex formdivs flex-col mb-4 sm:mb-5 gap-[6px]">
              <label>
                Author's full name{" "}
                <span className="text-red-600 text-base">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter author's full name"
                {...register("author", {
                  required: validationRules.author.required,
                })}
              />
              {errors.author && (
                <span className="text-red-600 text-sm">{`${errors.author.message}`}</span>
              )}
            </div>
            <div className="flex formdivs flex-col mb-4 sm:mb-5 gap-[6px]">
              <label>Choose an image for blog post</label>
              <input
                type="file"
                accept=".webp, .jpg, .jpeg, .png" // Only allow .webp, .jpg, .jpeg, .png files
                onChange={handleImageChange}
                className="file:text-white file:rounded-md file:cursor-pointer file:border-0 file:p-2 file:bg-[#010D3E]"
              />
            </div>
            <div className="flex formdivs flex-col mb-4 sm:mb-5 gap-[6px]">
              <label>Blog Content</label>
              <ReactQuill
                value={content}
                onChange={setContent}
                theme="snow"
                style={{ height: "400px" }}
              />
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
                "Create Blog"
              )}
            </button>
          </section>
        </form>
      </section>
    </section>
  );
};

export default CreateBlog;
