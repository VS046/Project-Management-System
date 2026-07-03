"use client";

import { useAuthStore } from "@/store/authStore";

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
      <h1 className="text-2xl font-semibold text-slate-900">Profile</h1>

      {user ? (
        <div className="mt-4 space-y-2">
          <p className="text-sm text-slate-600">Name</p>
          <p className="text-lg font-medium text-slate-900">{user.name}</p>

          <p className="mt-4 text-sm text-slate-600">Email</p>
          <p className="text-lg font-medium text-slate-900">{user.email}</p>
        </div>
      ) : (
        <p className="mt-3 text-sm text-slate-500">You are not signed in.</p>
      )}
    </div>
  );
}
