
"use client"

interface SidebarType {
  icon: React.ReactNode
  title: string;
  href: string;
}
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import React from "react";
export function Sidebar({ icon, title, href }: SidebarType) {
  const router = useRouter();
  const pathname = usePathname()
  console.log("pathname", pathname);
  
  const selected = pathname === href
  return (
    <div className="pl-8 p-2  flex cursor-pointer"
      onClick={() => {
        router.push(href);
      }}
    >
      <div className="pr-2">{icon}</div>
      <div className={` font-poppins font-bold   ${selected? "text-heheblu" : "text-slate-500"}`}  >{title}</div>
    </div>
  );
}
