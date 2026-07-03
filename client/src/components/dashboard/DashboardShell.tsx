"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F5F7FB]">

      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <div className="flex min-w-0 flex-1 flex-col lg:ml-72">

        <Navbar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.05),transparent_40%),#F5F7FB] p-4 sm:p-6 lg:p-8">

          {children}

        </main>

      </div>

    </div>
  );
}