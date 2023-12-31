"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "../BlogCard";
import axios from "axios";
import Image from "next/image";
import Loading from "../Loading";

type Blog = {
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
  comments: {
    content: string;
  };
};

const HomePage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlogPosts = async () => {
    try {
      setIsLoading(true);
      const blogData = await axios.get("api/blogs");
      setBlogs(blogData.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  useEffect(() => {
    console.log("data", blogs);
  }, [blogs]);

  return (
    <>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <div className=" mt-16 mb-10 grid grid-cols-1 w-full justify-center gap-y-14">
          <>
            {blogs?.length ? (
              <>
                {blogs?.map((blog) => (
                  <>
                    <BlogCard
                      title={blog?.title}
                      summary={blog?.summary}
                      author={blog?.author?.name}
                      authorImage={blog?.author?.image}
                      publishedDate={blog?.createdAt}
                      key={blog?.id}
                      id={blog?.id}
                    />
                  </>
                ))}
              </>
            ) : (
              <div className=" text-center my-9">
                <Image
                  className=" felx justify-center items-center m-auto h-[400px] w-[400px]"
                  src={"/noBlogFound.png"}
                  alt="erroImg"
                  height={550}
                  width={550}
                />
                <p className=" text-2xl md:text-4xl font-Caveat font-medium">
                  No Blogs yet, Be The First one
                </p>
              </div>
            )}
          </>
        </div>
      )}
    </>
  );
};

export default HomePage;


