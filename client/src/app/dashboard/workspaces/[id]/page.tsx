"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, FolderKanban, Users, CalendarDays } from "lucide-react";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

import { getWorkspaceById, Workspace } from "@/services/services";
import WorkspaceSkeleton from "@/components/workspace/WorkspaceSkeleton";

export default function WorkspaceDetailPage() {
  const params = useParams();
  const workspaceId = typeof params.id === "string" ? params.id : "";

  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkspace() {
      if (!workspaceId) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const data = await getWorkspaceById(workspaceId);

        if (!data) {
          toast.error("Workspace not found");
          setWorkspace(null);
          return;
        }

        setWorkspace(data);
      } catch {
        toast.error("Unable to load workspace");
      } finally {
        setLoading(false);
      }
    }

    loadWorkspace();
  }, [workspaceId]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-500">
            Workspace details
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            Workspace overview
          </h1>
        </div>

        <Link
          href="/dashboard/workspaces"
          className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <ArrowLeft size={18} />
          Back to workspaces
        </Link>
      </div>

      {loading ? (
        <WorkspaceSkeleton />
      ) : !workspace ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-10 text-center text-slate-500">
          Workspace not found.
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-500 text-white shadow-sm">
                <FolderKanban size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  {workspace.name}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {workspace.description || "No description provided."}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Workspace Owner</p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {typeof workspace.owner === "string"
                    ? workspace.owner
                    : workspace.owner.name}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Members</p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {workspace.members.length}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-5">
                <CalendarDays className="text-cyan-500" />
                <div>
                  <p className="text-sm text-slate-500">Created at</p>
                  <p className="mt-1 text-slate-900">
                    {new Date(workspace.createdAt).toLocaleDateString(
                      undefined,
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-5">
                <Users className="text-cyan-500" />
                <div>
                  <p className="text-sm text-slate-500">Last updated</p>
                  <p className="mt-1 text-slate-900">
                    {new Date(workspace.updatedAt).toLocaleDateString(
                      undefined,
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-slate-900">
                Workspace summary
              </h2>
              <p className="mt-3 text-sm text-slate-500">
                Use this workspace page to review the workspace metadata,
                members, and ownership.
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Workspace ID</p>
                  <p className="mt-2 break-all font-medium text-slate-900">
                    {workspace._id}
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">
                    Workspace description
                  </p>
                  <p className="mt-2 text-slate-900">
                    {workspace.description ||
                      "This workspace does not have a description yet."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
