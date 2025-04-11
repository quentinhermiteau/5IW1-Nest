"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { authContext } from "@/context/authContext";

export default function AuthedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useContext(authContext);
  const router = useRouter();

  useEffect(() => {
    if (user === "") {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <div className="w-full">{children}</div>
    </SidebarProvider>
  );
}
