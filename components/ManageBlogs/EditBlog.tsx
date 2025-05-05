"use client";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { EditBlogPost, DeleteBlogPost } from "@/hooks/content-hook";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const EditBlog = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      author: "",
      content: "",
    },
  });

  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const router = useRouter();
  const { onSubmit: Edit, loading } = EditBlogPost();
  const { onSubmit: Delete } = DeleteBlogPost();
  const { blogPost } = useSelector((store: any) => store.blogPost);

  // Populate form with blogPost data when component mounts
  useEffect(() => {
    if (blogPost) {
      setValue("title", blogPost.title);
      setValue("author", blogPost.author);
      setContent(blogPost.content); // Set content for ReactQuill
    }
  }, [blogPost, setValue]);

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("content", content);
    if (image) formData.append("file", image);

    Edit(formData, blogPost._id);
  };

  const DeleteBlog = () => {
    Delete(blogPost._id);
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
      <h2 className="text-2xl font-bold mb-1">Edit Blog Post</h2>
      <section className="flex justify-center w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-sm md:w-[70%] py-8 md:px-16 sm:px-6 px-4 mt-16 max-sm:mt-10 max-sm:py-6"
        >
          <div className="flex md:text-lg font-bold mt-16 justify-center">
            <span
              className={`tab active max-sm:h-[50px] text-xl w-full xsm:w-[200px]`}
            >
              Blog Post Details
            </span>
          </div>
          <p className="text-gray-500 text-lg mt-9">
            Fill the form below to edit the post
          </p>
          <section className="mt-8">
            <div className="flex formdivs flex-col mb-4 sm:mb-5 gap-[6px]">
              <label>
                Post Title <span className="text-red-600 text-base">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter a title for your post"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <span className="text-red-600 text-sm">
                  {errors.title.message}
                </span>
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
                  required: "Author's name is required",
                })}
              />
              {errors.author && (
                <span className="text-red-600 text-sm">
                  {errors.author.message}
                </span>
              )}
            </div>
            <div className="flex formdivs flex-col mb-4 sm:mb-5 gap-[6px]">
              <label>Choose an image for blog post</label>
              <input
                type="file"
                accept=".webp, .jpg, .jpeg, .png"
                onChange={handleImageChange}
                className="file:text-white file:rounded-md file:cursor-pointer file:border-0 file:p-2 file:bg-[#010D3E]"
              />
              {blogPost.blogImage && !image && (
                <img
                  src={blogPost.blogImage}
                  alt="Current Blog Image"
                  className="mt-4 h-24 w-24 object-cover"
                />
              )}
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
            <div className="mt-20 flex gap-10 max-xsm:gap-5">
              <button
                type="submit"
                className="w-full h-12 bg-[#010D3E] text-white shadow-sm rounded-lg btn-hover "
                disabled={isSubmitting}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </div>
                ) : (
                  "Update Blog"
                )}
              </button>
              <div
                className="login-btn centered gap-3 cursor-pointer icon-animate"
                onClick={DeleteBlog}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </div>
                ) : (
                  "Delete Post"
                )}
              </div>
            </div>
          </section>
        </form>
      </section>
    </section>
  );
};

export default EditBlog;
