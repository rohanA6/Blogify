"use client";

import { useBlogFormContext } from "@/app/context/BlogFormStateContext";
import { useGlobalStateContext } from "@/app/context/StateContext";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import SigninModal from "../Modals/SigninModal";
import SignupModal from "../Modals/SignUpModal";
import { useRouter } from "next/navigation";

const AddBlogForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const authorId = session?.user?.email;
  const [isLoading, setIsLoading] = useState(false);
  const { isLoginOpen, isSignupOpen } = useGlobalStateContext();
  const {
    title,
    setBlogTitle,
    content,
    setBlogDetail,
    summary,
    setBlogSummary,
    published,
  } = useBlogFormContext();

  //Submit Handler
  const handelFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const data = { published, title, content, summary, authorId };

    axios
      .post("api/postBlog", data)
      .then((response) => {
        console.log("response", response);
        toast.success("Blog Posted successfully");
      })
      .catch((error) => {
        console.log("SubmitError", error.response.data);
        toast.error("Oops! Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
        router.push("/");
      });
  };

  return (
    <>
      {session && session?.user && (
        <>
          <div className=" w-full py-5  p-3 md:p-5 border-2 rounded-xl shadow-lg">
            <div className=" bg-left-bottom bg-gradient-to-r from-slate-500 to-pink-500 bg-no-repeat bg-[length:100%_3px] transition-all pb-[0.5px]">
              <p className=" text-gray-800 text-center text-[20px] md:text-[25px] font-semibold font-Pacifico mb-3 md:mb-5">
                Add Your Blog
              </p>
            </div>

            <form
              onSubmit={handelFormSubmit}
              className=" flex flex-col justify-center gap-y-5 md:gap-y-7 mt-5 mb-3 md:mt-10 md:mb-5"
            >
              <div>
                <p className=" font-Caveat md:text-xl font-semibold">
                  Blog Title
                </p>
                <input
                  type="text"
                  className=" w-full border border-black rounded-lg mt-1 md:mt-2 py-[9px] md:py-[13px] px-2 md:px-5 font-Montserrat font-medium"
                  value={title}
                  onChange={(e) => setBlogTitle(e.target.value)}
                />
              </div>

              <div>
                <p className=" font-Caveat text-xl font-semibold">
                  Blog Content
                </p>
                <textarea
                  rows={10}
                  className=" w-full border border-black rounded-lg mt-1 md:mt-2 py-[9px] md:py-[13px] px-2 md:px-5 font-Montserrat font-medium"
                  value={content}
                  onChange={(e) => setBlogDetail(e.target.value)}
                />
              </div>

              <div>
                <p className=" font-Caveat text-xl font-semibold">
                  Blog Summary
                </p>
                <textarea
                  rows={6}
                  minLength={20}
                  maxLength={500}
                  className=" w-full border border-black rounded-lg mt-1 md:mt-2 py-[9px] md:py-[13px] px-2 md:px-5 font-Montserrat font-medium"
                  value={summary}
                  onChange={(e) => setBlogSummary(e.target.value)}
                />
                <p
                  className={` ${
                    summary.length === 500 ? "text-red-700" : "text-gray-400"
                  } text-sm font-Montserrat font-medium `}
                >
                  {summary.length}/{500 - summary.length}
                </p>
              </div>

              <div className="flex justify-center items-center w-full">
                <button
                  type="submit"
                  className={` ${
                    isLoading && "cursor-not-allowed"
                  } w-full md:w-1/2 md:px-20 py-2 md:py-3 font-semibold text-lg md:text-2xl bg-gray-700 text-white rounded-xl hover:bg-gray-800`}
                >
                  {isLoading ? (
                    <div className=" flex justify-center items-center text-xl">
                      <AiOutlineLoading3Quarters className="animate-spin" />
                    </div>
                  ) : (
                    "Post Blog 🚀"
                  )}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      {isLoginOpen && <SigninModal />}
      {isSignupOpen && <SignupModal />}
    </>
  );
};

export default AddBlogForm;
