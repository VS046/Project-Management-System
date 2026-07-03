"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Search, FolderKanban } from "lucide-react";
import toast from "react-hot-toast";

import {
  getProjects,
  getWorkspaces,
  deleteProject,
  Project,
  Workspace,
} from "@/services/services";
import CreateProjectModal from "@/components/project/CreateProjectModal";
import EditProjectModal from "@/components/project/EditProjectModal";
import DeleteProjectConfirm from "@/components/project/DeleteProjectConfirm";
import ProjectSkeleton from "@/components/project/ProjectSkeleton";
import ProjectCard from "@/components/project/ProjectCard";
import Button from "@/components/ui/Button";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      try {
        const [projectResponse, workspaceResponse] = await Promise.all([
          getProjects(),
          getWorkspaces(),
        ]);

        setProjects(projectResponse.projects);
        setWorkspaces(workspaceResponse.workspaces);
      } catch {
        toast.error("Unable to load projects");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [projects, searchTerm],
  );

  const refreshProjects = async () => {
    setLoading(true);

    try {
      const [projectResponse, workspaceResponse] = await Promise.all([
        getProjects(),
        getWorkspaces(),
      ]);

      setProjects(projectResponse.projects);
      setWorkspaces(workspaceResponse.workspaces);
    } catch {
      toast.error("Unable to refresh projects");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setEditOpen(true);
  };

  const handleDelete = (project: Project) => {
    setSelectedProject(project);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedProject) return;

    setDeleting(true);

    try {
      await deleteProject(selectedProject._id);
      toast.success("Project deleted successfully");
      setDeleteOpen(false);
      setSelectedProject(null);
      await refreshProjects();
    } catch {
      toast.error("Failed to delete project");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-500">
                Projects
              </p>
              <h1 className="mt-3 text-3xl font-bold text-slate-900">
                Manage your projects
              </h1>
            </div>

            <Button
              type="button"
              onClick={() => setCreateOpen(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-600 sm:w-auto"
            >
              <Plus size={18} />
              Create Project
            </Button>
          </div>

          <div className="relative w-full sm:max-w-md">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search projects"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm placeholder:text-slate-400 text-slate-800 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
            />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-slate-900">
            Project insights
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Track active projects, workspace usage, and quick actions.
          </p>
          <div className="mt-6 grid gap-4">
            <div className="flex items-center justify-between rounded-3xl bg-cyan-100 p-5">
              <div>
                <p className="text-sm text-slate-600">Total projects</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">
                  {projects.length}
                </p>
              </div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-500 text-white">
                <FolderKanban size={20} />
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-600">Workspaces available</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {workspaces.length}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-600">Filtered results</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {filteredProjects.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <ProjectSkeleton />
      ) : filteredProjects.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-10 text-center text-slate-500">
          <p className="text-lg font-semibold text-slate-900">
            No projects found
          </p>
          <p className="mt-3">Create a project to get started.</p>
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <CreateProjectModal
        open={createOpen}
        workspaces={workspaces}
        onClose={() => setCreateOpen(false)}
        onSuccess={refreshProjects}
      />

      <EditProjectModal
        open={editOpen}
        project={selectedProject}
        onClose={() => setEditOpen(false)}
        onSuccess={refreshProjects}
      />

      <DeleteProjectConfirm
        open={deleteOpen}
        projectName={selectedProject?.name ?? ""}
        isDeleting={deleting}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
