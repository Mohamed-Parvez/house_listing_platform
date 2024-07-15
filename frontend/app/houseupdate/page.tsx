"use client";

import React from "react";

interface FormProps {
  houseName: string;
  housePrice: number;
  password: string;
}

import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

const page = ({ searchParams }: any) => {
  const router = useRouter();
  const { register, reset, handleSubmit } = useForm<FormProps>();
  return (
    <main className="flex flex-col items-center justify-center space-y-4 mt-10">
      <p className="text-center text-black text-[20px] font-medium">
        List your Property
      </p>
      <form
        className="flex flex-col items-start justify-start space-y-8"
        onSubmit={handleSubmit(
          async ({ houseName, housePrice, password }: FormProps) => {
            await fetch("http://localhost:8080/api/house", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                _id: searchParams.search,
                houseName: houseName,
                housePrice: housePrice,
                password: password,
              }),
            }).then(() => {
              router.push("/");
              console.log("posted successfully");
            });
            reset();
            router.push("/");
          }
        )}
      >
        <input
          required
          placeholder="Enter House Name"
          className="rounded-[6px] p-3 ring-1 ring-slate-500 pl-10"
          {...register("houseName")}
        />
        <input
          required
          placeholder="Enter House Price"
          className="rounded-[6px] p-3 ring-1 ring-slate-500 pl-10"
          {...register("housePrice")}
        />
        <input
          required
          placeholder="Enter Your Password"
          className="rounded-[6px] p-3 ring-1 ring-slate-500 pl-10"
          {...register("password")}
        />
        <button className="bg-black hover:bg-white text-white hover:text-black ring-1 ring-black rounded-[6px] px-4 py-2">
          Post
        </button>
      </form>
    </main>
  );
};

export default page;
