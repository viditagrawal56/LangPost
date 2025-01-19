import GetCurrentUser from "@/components/GetCurrentUser";
import Loading from "@/components/Loading";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import React, { Suspense } from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const cookiesList = cookies();
  const token = cookiesList.has("token");

  return (
    <>
      <div
        className={cn(
          "min-h-screen text-foreground antialiased !font-default overflow-x-hidden"
        )}
      >
        {token && <GetCurrentUser />}
        <Suspense fallback={<Loading />}> {children} </Suspense>
      </div>
    </>
  );
};

export default HomeLayout;
