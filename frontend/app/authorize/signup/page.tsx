"use client";

import React from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface UserProps {
  name: string;
  email: string;
  password: string;
}

const page = () => {
  const router = useRouter();
  const { handleSubmit, register, reset } = useForm<UserProps>();
  return (
    <div className="flex flex-col items-center justify-center mt-32 space-y-6">
      <Toaster position="bottom-center" />
      <form
        onSubmit={handleSubmit(async ({ name, email, password }: UserProps) => {
          await fetch("http://localhost:8080/api/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              email: email,
              password: password,
            }),
          }).then(() => {
            toast.success("signed up successfully");

            setTimeout(() => {
              router.push("/");
            }, 3000);
          });
          reset();
        })}
        className="flex flex-col items-center justify-center space-y-5"
      >
        <input
          type="text"
          placeholder="Enter Name"
          className="rounded-[6px] ring-1 ring-black pl-4 h-10 w-[300px]"
          required
          {...register("name")}
        />
        <input
          type="text"
          placeholder="Enter Email"
          className="rounded-[6px] ring-1 ring-black pl-4 h-10 w-[300px]"
          required
          {...register("email")}
        />
        <input
          type="text"
          placeholder="Enter Password"
          className="rounded-[6px] ring-1 ring-black pl-4 h-10 w-[300px]"
          required
          {...register("password")}
        />
        <button
          type="submit"
          className="bg-black text-white rounded-[6px] hover:bg-white hover:text-black px-4 py-2 ring-1 ring-black"
        >
          Sign Up
        </button>
      </form>
      <p>or</p>
      <Link
        className="bg-white text-black rounded-[6px] hover:bg-black hover:text-white px-4 py-2 ring-1 ring-black"
        href={"/api/auth/signin"}
      >
        Continue with Google
      </Link>
    </div>
  );
};

export default page;
