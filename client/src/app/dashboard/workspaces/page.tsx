"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  FolderKanban,
  Plus,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

import { getWorkspaces, deleteWorkspace, Workspace } from "@/services/services";
import CreateWorkspaceModal from "@/components/workspace/CreateWorkspaceModal";
import EditWorkspaceModal from "@/components/workspace/EditWorkspaceModal";
import DeleteWorkspaceConfirm from "@/components/workspace/DeleteWorkspaceConfirm";
import WorkspaceSkeleton from "@/components/workspace/WorkspaceSkeleton";
import Button from "@/components/ui/Button";

export default function WorkspacesPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function loadWorkspaces() {
      setLoading(true);

      try {
        const response = await getWorkspaces();
        setWorkspaces(response.workspaces);
      } catch {
        toast.error("Unable to load workspaces");
      } finally {
        setLoading(false);
      }
    }

    loadWorkspaces();
  }, []);

  const filteredWorkspaces = useMemo(() => {
    if (!searchTerm) {
      return workspaces;
    }

    return workspaces.filter(
      (workspace) =>
        workspace.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workspace.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, workspaces]);

  const refreshWorkspaces = async () => {
    setLoading(true);

    try {
      const response = await getWorkspaces();
      setWorkspaces(response.workspaces);
    } catch {
      toast.error("Unable to refresh workspaces");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (workspace: Workspace) => {
    setSelectedWorkspace(workspace);
    setEditOpen(true);
  };

  const handleDelete = (workspace: Workspace) => {
    setSelectedWorkspace(workspace);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedWorkspace) return;

    setDeleting(true);

    try {
      await deleteWorkspace(selectedWorkspace._id);
      toast.success("Workspace deleted successfully");
      setDeleteOpen(false);
      setSelectedWorkspace(null);
      await refreshWorkspaces();
    } catch {
      toast.error("Failed to delete workspace");
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
                Workspaces
              </p>
              <h1 className="mt-3 text-3xl font-bold text-slate-900">
                Manage your workspaces
              </h1>
            </div>

            <Button
              type="button"
              onClick={() => setCreateOpen(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-600 sm:w-auto"
            >
              <Plus size={18} />
              Create Workspace
            </Button>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search workspaces"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm placeholder:text-slate-400 text-slate-800 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
              />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-slate-900">
            Workspace insights
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            View workspace counts, active workspaces, and quick actions.
          </p>
          <div className="mt-6 grid gap-4">
            <div className="flex items-center justify-between rounded-3xl bg-cyan-100 p-5">
              <div>
                <p className="text-sm text-slate-600">Total workspaces</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">
                  {workspaces.length}
                </p>
              </div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-500 text-white">
                <FolderKanban size={20} />
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-600">Search active</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {searchTerm ? "Yes" : "No"}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-600">Filtered results</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {filteredWorkspaces.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <WorkspaceSkeleton />
      ) : filteredWorkspaces.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-10 text-center text-slate-500">
          <p className="text-lg font-semibold text-slate-900">
            No workspaces found
          </p>
          <p className="mt-3">
            Create a workspace to organize your projects and tasks.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-3">
          {filteredWorkspaces.map((workspace) => (
            <div
              key={workspace._id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-500">
                    Workspace
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                    {workspace.name}
                  </h2>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3 text-cyan-600">
                  <FolderKanban size={20} />
                </div>
              </div>

              <p className="min-h-16 text-sm leading-6 text-slate-600">
                {workspace.description || "No description available."}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href={`/dashboard/workspaces/${workspace._id}`}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                >
                  <MoreVertical size={16} />
                  Details
                </Link>
                <button
                  type="button"
                  onClick={() => handleEdit(workspace)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                >
                  <Pencil size={16} />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(workspace)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateWorkspaceModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSuccess={refreshWorkspaces}
      />

      <EditWorkspaceModal
        open={editOpen}
        workspace={selectedWorkspace}
        onClose={() => setEditOpen(false)}
        onSuccess={refreshWorkspaces}
      />

      <DeleteWorkspaceConfirm
        open={deleteOpen}
        workspaceName={selectedWorkspace?.name ?? ""}
        isDeleting={deleting}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
