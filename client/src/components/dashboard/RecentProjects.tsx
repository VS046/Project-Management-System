import {
  FolderKanban,
  MoreHorizontal,
} from "lucide-react";

type Project = {
  _id: string;
  name: string;
  status: string;
};

type RecentProjectsProps = {
  projects: Project[];
};

export default function RecentProjects({
  projects,
}: RecentProjectsProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-xl">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Recent Projects
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest active projects
          </p>

        </div>

        <button className="rounded-xl p-2 transition hover:bg-slate-100">
          <MoreHorizontal size={20} />
        </button>

      </div>

      <div className="space-y-5">

        {projects.length === 0 ? (

          <p className="text-center text-slate-500">
            No projects found
          </p>

        ) : (

          projects.map((project) => (

            <div
              key={project._id}
              className="rounded-2xl border border-slate-200 p-5 transition hover:border-cyan-300 hover:shadow-md"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-cyan-500 p-3 text-white">
                    <FolderKanban size={20} />
                  </div>

                  <div>

                    <h3 className="font-semibold text-slate-800">
                      {project.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {project.status}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}