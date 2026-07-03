import {
  BriefcaseBusiness,
  CalendarDays,
  Users,
} from "lucide-react";

const projects = [
  {
    name: "Project Management System",
    progress: 82,
    status: "On Track",
    deadline: "15 July",
    color: "bg-cyan-500",
  },
  {
    name: "Portfolio Website",
    progress: 65,
    status: "In Progress",
    deadline: "20 July",
    color: "bg-violet-500",
  },
  {
    name: "CRM Dashboard",
    progress: 92,
    status: "Completed",
    deadline: "25 July",
    color: "bg-emerald-500",
  },
];

export default function ProjectProgress() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-xl">

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Project Progress
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Track your ongoing projects
        </p>

      </div>

      <div className="space-y-6">

        {projects.map((project) => (

          <div
            key={project.name}
            className="rounded-2xl border border-slate-200 p-5 transition hover:border-cyan-300 hover:shadow-md"
          >

            <div className="flex items-start justify-between">

              <div>

                <div className="flex items-center gap-2">

                  <BriefcaseBusiness
                    size={18}
                    className="text-cyan-500"
                  />

                  <h3 className="font-semibold text-slate-800">
                    {project.name}
                  </h3>

                </div>

                <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">

                  <span className="flex items-center gap-1">

                    <CalendarDays size={15} />

                    {project.deadline}

                  </span>

                  <span className="flex items-center gap-1">

                    <Users size={15} />

                    4 Members

                  </span>

                </div>

              </div>

              <span
                className={`rounded-full ${project.color} px-3 py-1 text-xs font-semibold text-white`}
              >
                {project.status}
              </span>

            </div>

            <div className="mt-5">

              <div className="mb-2 flex justify-between text-sm">

                <span className="text-slate-500">
                  Progress
                </span>

                <span className="font-semibold text-slate-700">
                  {project.progress}%
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-200">

                <div
                  className={`h-full rounded-full ${project.color}`}
                  style={{
                    width: `${project.progress}%`,
                  }}
                />

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}