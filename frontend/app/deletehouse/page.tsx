"use client";

import { useRouter } from "next/navigation";

const page = async ({ searchParams }: any) => {
  const router = useRouter();
  await fetch("http://localhost:8080/api/house", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id: searchParams.search }),
  }).then(() => {
    router.push("/");
  });
};
export default page;
