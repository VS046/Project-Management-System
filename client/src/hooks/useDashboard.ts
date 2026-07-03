import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/services";

type DashboardStats = {
  totalWorkspaces: number;
  totalProjects: number;
  completedTasks: number;
  pendingTasks: number;
};

type RecentTask = {
  _id: string;
  title: string;
  status: "Todo" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
  project?: {
    name: string;
  };
};

type RecentProject = {
  _id: string;
  name: string;
  status: string;
};

type DashboardData = {
  stats: DashboardStats;
  recentTasks: RecentTask[];
  recentProjects: RecentProject[];
};

export default function useDashboard() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const data = await getDashboardStats();

        setDashboard(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  return {
    dashboard,
    loading,
  };
}
