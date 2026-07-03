"use client";

import { Menu, ChevronDown, Plus } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import CreateWorkspaceModal from "@/components/workspace/CreateWorkspaceModal";
import CreateProjectModal from "@/components/project/CreateProjectModal";
import CreateTaskModal from "@/components/task/CreateTaskModal";
import {
  getWorkspaces,
  getProjects,
  Workspace,
  Project,
} from "@/services/services";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Navbar({ setOpen }: Props) {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const [greeting, setGreeting] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [workspaceModalOpen, setWorkspaceModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  // Get dynamic greeting based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good Afternoon");
    } else if (hour >= 17 && hour < 21) {
      setGreeting("Good Evening");
    } else {
      setGreeting("Good Night");
    }
  }, []);

  // Fetch workspaces and projects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [workspacesData, projectsData] = await Promise.all([
          getWorkspaces(),
          getProjects(),
        ]);
        setWorkspaces(workspacesData.workspaces);
        setProjects(projectsData.projects);
      } catch (error) {
        console.error("Failed to fetch workspaces and projects", error);
      }
    };
    fetchData();
  }, []);

  const handleProfileClick = () => {
    router.push("/dashboard/profile");
  };

  const initial = user?.name?.[0]?.toUpperCase() ?? "U";

  const handleCreateWorkspace = () => {
    setDropdownOpen(false);
    setWorkspaceModalOpen(true);
  };

  const handleCreateProject = () => {
    setDropdownOpen(false);
    setProjectModalOpen(true);
  };

  const handleCreateTask = () => {
    setDropdownOpen(false);
    setTaskModalOpen(true);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left */}

        <div className="flex items-center gap-4">
          {/* Mobile Menu */}

          <button
            onClick={() => setOpen(true)}
            className="rounded-2xl border border-cyan-100 bg-[#F8FCFD] p-3 shadow-sm transition-all duration-300 hover:border-cyan-300 hover:shadow-lg lg:hidden"
          >
            <Menu size={22} />
          </button>

          {/* Greeting and New Button */}

          <div className="hidden items-center gap-4 md:flex">
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-slate-800">
                {greeting}, {user?.name ?? "User"}!
              </p>
              <p className="text-xs text-slate-500">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* + New Dropdown */}

            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-2xl border border-cyan-200 bg-linear-to-r from-cyan-50 to-sky-50 px-4 py-2 text-sm font-semibold text-cyan-700 shadow-sm transition-all duration-300 hover:border-cyan-400 hover:shadow-md"
              >
                <Plus size={18} />
                New
              </button>

              {/* Dropdown Menu */}

              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-48 rounded-2xl border border-slate-200 bg-white shadow-lg">
                  <button
                    onClick={handleCreateWorkspace}
                    className="block w-full px-4 py-3 text-left text-sm text-slate-700 transition-colors duration-200 hover:bg-slate-50 first:rounded-t-2xl"
                  >
                    Create Workspace
                  </button>
                  <button
                    onClick={handleCreateProject}
                    className="block w-full px-4 py-3 text-left text-sm text-slate-700 transition-colors duration-200 hover:bg-slate-50"
                  >
                    Create Project
                  </button>
                  <button
                    onClick={handleCreateTask}
                    className="block w-full px-4 py-3 text-left text-sm text-slate-700 transition-colors duration-200 hover:bg-slate-50 last:rounded-b-2xl"
                  >
                    Create Task
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Profile */}

          <button
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-cyan-100
              bg-[#F8FCFD]
              px-4
              py-2
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-cyan-300
              hover:shadow-lg
              hover:shadow-cyan-100
            "
            onClick={handleProfileClick}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-r from-cyan-500 to-sky-400 text-lg font-bold text-black shadow-md">
              {initial}
            </div>

            <div className="hidden text-left lg:block">
              <h3 className="font-semibold text-slate-800">
                {user?.name ?? "User"}
              </h3>

              <p className="text-xs text-slate-500">{user?.email ?? ""}</p>
            </div>

            <ChevronDown size={18} className="hidden text-slate-500 lg:block" />
          </button>
        </div>
      </div>

      {/* Modals */}

      <CreateWorkspaceModal
        open={workspaceModalOpen}
        onClose={() => setWorkspaceModalOpen(false)}
        onSuccess={() => {}}
      />
      <CreateProjectModal
        open={projectModalOpen}
        workspaces={workspaces}
        onClose={() => setProjectModalOpen(false)}
        onSuccess={() => {}}
      />
      <CreateTaskModal
        open={taskModalOpen}
        projects={projects}
        onClose={() => setTaskModalOpen(false)}
        onSuccess={() => {}}
      />
    </header>
  );
}
