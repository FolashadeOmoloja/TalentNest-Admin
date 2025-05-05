"use client";

import { useGetAllBlogPosts } from "@/hooks/content-hook";
import MainTable from "../Elements/Table/MainTable";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { BlogPosts } from "@/utilities/typeDefs";
import { blogPostColumns } from "@/utilities/tableData";

const BlogTable = () => {
  const { blogPosts, loading } = useGetAllBlogPosts();
  const router = useRouter();

  return (
    <section className="dashboard-container min-h-svh">
      <div
        onClick={() => router.push("/control-room")}
        className="flex text-[#010D3E] gap-3 text-xl items-center font-bold mb-6 cursor-pointer"
      >
        <FaArrowLeft />
        <span>Go back</span>
      </div>
      <h2 className="text-2xl font-bold mb-1">Manage TalentNest Blog Posts</h2>
      <span className="text-[#7C8698]">
        Overview of blog posts on TalentNest
      </span>
      <div className="flex w-full text-[#010D3E] md:text-lg font-bold mt-16 border-b-[3px] border-[#010D3E]">
        <span className={`tab active max-sm:h-[50px]`}>
          TalentNest Blog posts
        </span>
      </div>

      {loading ? (
        <Loader2 className=" h-14 w-14 animate-spin ml-10 mt-10 text-[#010D3E]" />
      ) : blogPosts.length === 0 ? (
        <p className="mt-10 text-[#000040] italic text-2xl">
          No data available at the moment.
        </p>
      ) : (
        <MainTable<BlogPosts> data={blogPosts} columns={blogPostColumns} />
      )}

      <button
        onClick={() => router.push("/control-room/manage-blogs/create")}
        className="py-4 px-6 max-w-[300px] mt-10 bg-[#010D3E] text-white rounded-md font-semibold btn-hover"
      >
        Create Blog Post
      </button>
    </section>
  );
};

export default BlogTable;
