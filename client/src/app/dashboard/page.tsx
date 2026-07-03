"use client";

import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  FolderKanban,
} from "lucide-react";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentTasks from "@/components/dashboard/RecentTasks";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import StatCard from "@/components/dashboard/StatCard";
import ProjectProgress from "@/components/dashboard/ProjectProgress";
import RecentProjects from "@/components/dashboard/RecentProjects";
import useDashboard from "@/hooks/useDashboard";

export default function DashboardPage() {
  const { dashboard, loading } = useDashboard();
  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <WelcomeBanner />

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Workspaces"
          value={dashboard?.stats.totalWorkspaces ?? 0}
          subtitle="2 New This Month"
          icon={FolderKanban}
          progress={65}
        />

        <StatCard
          title="Projects"
          value={dashboard?.stats.totalProjects ?? 0}
          subtitle="5 Active Projects"
          icon={BriefcaseBusiness}
          progress={80}
        />

        <StatCard
          title="Completed"
          value={dashboard?.stats.completedTasks ?? 0}
          subtitle="Great Performance"
          icon={CheckCircle2}
          progress={90}
        />

        <StatCard
          title="Pending"
          value={dashboard?.stats.pendingTasks ?? 0}
          subtitle="Need Attention"
          icon={Clock3}
          progress={35}
        />
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentTasks tasks={dashboard?.recentTasks ?? []} />
        </div>

        <QuickActions />
      </section>

      <section className="mt-8">
        <ProjectProgress />
      </section>

      <section className="mt-8">
        <RecentProjects projects={dashboard?.recentProjects ?? []} />
      </section>
    </div>
  );
}
