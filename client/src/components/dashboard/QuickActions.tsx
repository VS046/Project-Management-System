import {
  FolderPlus,
  BriefcaseBusiness,
  CheckSquare,
  Users,
  ArrowRight,
} from "lucide-react";

const actions = [
  {
    title: "Create Workspace",
    description: "Start a new workspace",
    icon: FolderPlus,
    color: "bg-cyan-500",
  },
  {
    title: "New Project",
    description: "Create a new project",
    icon: BriefcaseBusiness,
    color: "bg-violet-500",
  },
  {
    title: "Add Task",
    description: "Assign a task",
    icon: CheckSquare,
    color: "bg-emerald-500",
  },
  {
    title: "Invite Team",
    description: "Coming Soon",
    icon: Users,
    color: "bg-orange-500",
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-xl">

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Frequently used shortcuts
        </p>

      </div>

      <div className="space-y-4">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
  key={action.title}
  className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:bg-cyan-50 hover:shadow-xl hover:shadow-cyan-100"
>
              <div className="flex items-center gap-4">

                <div
                  className={`${action.color} flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg`}
                >
                  <Icon size={24} />
                </div>

                <div className="text-left">

                  <h3 className="font-semibold text-slate-800">
                    {action.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {action.description}
                  </p>

                </div>

              </div>

              <ArrowRight
                size={20}
                className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-cyan-500"
              />

            </button>
          );
        })}

      </div>

    </div>
  );
}