"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ErrorComponent from "../ErrorComponent";
import { useGlobalStateContext } from "@/app/context/StateContext";
import axios from "axios";
import BlogAuthorDetails from "../BlogAuthorDetails";

interface BlogDetailsProps {
  authorId: string;
  blogDetail: {
    id: string;
    title: string;
    authorId: string;
    content: string;
    createdAt: string;
    published: true;
    summary: string;
    updatedAt: string;
    author: {
      image: any;
      email: string;
      name: string;
    };
  };
}

const Blogdetail = ({ authorId, blogDetail }: BlogDetailsProps) => {
  const { data: session } = useSession();

  console.log("authorId", authorId);

  useEffect(() => {}, [authorId]);

  return (
    <>
      {session && session?.user ? (
        <>
          <div className=" flex flex-col justify-center">
            <div className=" md:mx-40">
              <div className=" mb-5 md:mb-10">
                <h1 className=" text-[34px] md:text-[40px] font-black font-Montserrat">
                  {blogDetail?.title}
                </h1>
                <BlogAuthorDetails
                  authorImage={blogDetail?.author?.image}
                  author={blogDetail?.author?.name}
                  publishedDate={blogDetail?.createdAt}
                />
              </div>

              <div>
                <div>
                  <p className=" text-justify md:text-lg">{blogDetail?.content}</p>
                </div>
                <div className=" mt-10">
                  <p className=" text-lg font-semibold mb-2">Summary : </p>
                  <p>{blogDetail?.summary}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <ErrorComponent />
        </>
      )}
    </>
  );
};

export default Blogdetail;
