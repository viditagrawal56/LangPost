import Footer from "@/components/navigation/footer";
import GetCurrentUser from "@/components/GetCurrentUser";
import Loading from "@/components/Loading";
import { cookies } from "next/headers";
import React, { Suspense } from "react";
import { cn } from "@/lib/utils";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className=" mx-auto w-full z-0 relative">{children}</main>
    </>
  );
};

export default HomeLayout;
