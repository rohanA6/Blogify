"use client";
import React from "react";
import { VscChromeClose } from "react-icons/vsc";
import SignInForm from "./Forms/SignInForm";
import SignUpForm from "./Forms/SignUpForm";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ModalProps {
  formHeading: string;
  onClose: () => void;
}

const ModalBody = ({ onClose, formHeading }: ModalProps) => {
  const router = useRouter();
  const handleClick = () => {
    try {
      signIn("google", { redirect: false });
    } catch (error) {
      console.log("googleError", error);
      router.push("/");
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <div className="bg-white w-[40rem] p-5 md:p-8 rounded-lg shadow-xl md:m-0 m-5">
        <div className=" relative">
          <h2 className=" text-lg md:text-[1.8rem] font-Pacifico font-bold text-center mb-4">
            {formHeading}
          </h2>
          <div
            onClick={onClose}
            className=" absolute top-1 right-3 text-2xl cursor-pointer"
          >
            <VscChromeClose className=" hover:scale-110" />
          </div>
        </div>
        <hr />
        <div className=" py-5">
          {formHeading === "Login to your account" ? (
            <SignInForm />
          ) : (
            <SignUpForm />
          )}
        </div>

        <div className=" flex justify-center items-center my-5">
          <div className=" w-full border border-gray-200"></div>
          <p className=" md:text-lg font-medium text-gray-500 font-Montserrat mx-5">
            OR
          </p>
          <div className=" w-full border border-gray-200"></div>
        </div>

        <button
          onClick={handleClick}
          className=" w-full py-2 text-2xl  md:text-3xl font-semibold font-Caveat border border-gray-400 rounded-lg hover:border-black"
        >
          <div className=" flex justify-center items-center gap-3">
            <FcGoogle /> Continue With Google
          </div>
        </button>
      </div>
    </div>
  );
};

export default ModalBody;
