import {
  CheckCircle2,
  Clock3,
  CircleDashed,
} from "lucide-react";

type Task = {
  _id: string;
  title: string;
  status: "Todo" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
  project?: {
    name: string;
  };
};

type RecentTasksProps = {
  tasks: Task[];
};

export default function RecentTasks({
  tasks,
}: RecentTasksProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Recent Tasks
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest project activities
          </p>

        </div>

        <button className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-cyan-400">
          View All
        </button>

      </div>

      <div className="space-y-4">

        {tasks.length === 0 ? (

          <p className="text-center text-slate-500">
            No tasks found
          </p>

        ) : (

          tasks.map((task) => (

            <div
              key={task._id}
              className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition hover:border-cyan-300 hover:bg-cyan-50/40"
            >

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-cyan-100 p-3">

                  {task.status === "Done" && (
                    <CheckCircle2
                      className="text-green-600"
                      size={20}
                    />
                  )}

                  {task.status === "In Progress" && (
                    <Clock3
                      className="text-orange-500"
                      size={20}
                    />
                  )}

                  {task.status === "Todo" && (
                    <CircleDashed
                      className="text-cyan-600"
                      size={20}
                    />
                  )}

                </div>

                <div>

                  <h3 className="font-semibold text-slate-800">
                    {task.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {task.project?.name ?? "No Project"}
                  </p>

                </div>

              </div>

              <div className="text-right">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold
                  ${
                    task.priority === "High"
                      ? "bg-red-100 text-red-600"
                      : task.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {task.priority}
                </span>

                <p className="mt-2 text-sm text-slate-500">
                  {task.status}
                </p>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}