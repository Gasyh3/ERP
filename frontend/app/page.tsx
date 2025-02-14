"use client";

import Login from "@/components/login";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

export default function Home() {
  const { isAuthentificated, error } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex flex-col items-center justify-center max-h-screen w-[100vw] p-8 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 items-center justify-center sm:items-start w-full max-w-md text-center">
   
          <Login />

      </main>
    </div>
  );
}
