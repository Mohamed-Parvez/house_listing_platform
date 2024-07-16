"use client";

import Link from "next/link";
import React from "react";

import { useSession } from "next-auth/react";

const UserAuthOptions = () => {
  const { status, data } = useSession();
  return (
    <div>
      {status === "loading" && <p>Loading ...</p>}
      {status === "unauthenticated" && (
        <Link
          className="bg-black text-white rounded-[6px] hover:bg-white hover:text-black px-4 py-2 ring-1 ring-black"
          href={"/api/auth/signin"}
        >
          Sign In
        </Link>
      )}
      {status === "authenticated" && (
        <div className="flex items-center justify-center gap-4">
          <p>{data.user!.name}</p>
          <Link
            className="bg-black text-white rounded-[6px] hover:bg-white hover:text-black px-4 py-2 ring-1 ring-black"
            href={"/api/auth/signout"}
          >
            Sign Out
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserAuthOptions;
