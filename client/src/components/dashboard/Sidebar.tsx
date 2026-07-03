"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import {
  LayoutDashboard,
  FolderKanban,
  BriefcaseBusiness,
  CheckSquare,
  Settings,
  LogOut,
  X,
} from "lucide-react";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const menu = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Workspaces",
    href: "/dashboard/workspaces",
    icon: FolderKanban,
  },
  {
    name: "Projects",
    href: "/dashboard/projects",
    icon: BriefcaseBusiness,
  },
  {
    name: "Tasks",
    href: "/dashboard/tasks",
    icon: CheckSquare,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar({ open, setOpen }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`
        fixed left-0 top-0 z-50 flex h-screen w-72 flex-col
        bg-[#0B1120] transition-transform duration-300

        ${open ? "translate-x-0" : "-translate-x-full"}

        lg:translate-x-0
      `}
      >
        <div className="flex items-center justify-between border-b border-slate-800 p-7">
          <div>
            <h1 className="text-3xl font-bold text-cyan-400">PMS</h1>

            <p className="text-sm text-slate-400">Project Management System</p>
          </div>

          <button onClick={() => setOpen(false)} className="lg:hidden">
            <X className="text-white" />
          </button>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {menu.map((item) => {
              const Icon = item.icon;

              const active = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-4 rounded-2xl px-5 py-3 transition

                  ${
                    active
                      ? "bg-cyan-500 text-black"
                      : "text-slate-300 hover:bg-slate-800 hover:text-cyan-300"
                  }`}
                >
                  <Icon size={20} />

                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-slate-800 p-5">
          <button
            onClick={() => {
              logout();
              setOpen(false);
              router.push("/login");
            }}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 py-3 text-slate-300 hover:border-red-500 hover:bg-red-500 hover:text-white"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
