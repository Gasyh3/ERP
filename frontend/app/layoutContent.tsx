"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const isAuthentificated = useSelector((state: RootState) => state.auth.isAuthentificated);
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {isAuthentificated && <AppSidebar />}
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
}
