"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import { changePassword } from "@/services/api";
import DeleteAccountConfirm from "@/components/account/DeleteAccountConfirm";

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  // Security: change password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changing, setChanging] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setChanging(true);
    try {
      const response = await changePassword({ currentPassword, newPassword });
      toast.success(response.message || "Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to change password";
      toast.error(errorMessage);
    } finally {
      setChanging(false);
    }
  };

  // deletion handled by DeleteAccountConfirm component

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Profile */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-medium text-slate-800">
              Profile Information
            </h2>
            <p className="mt-2 text-sm text-slate-500">Your account details</p>

            <div className="mt-4 space-y-3">
              <div>
                <p className="text-sm text-slate-600">Name</p>
                <p className="text-lg font-medium text-slate-900">
                  {user?.name ?? "-"}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Email</p>
                <p className="text-lg font-medium text-slate-900">
                  {user?.email ?? "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
            <h2 className="text-lg font-medium text-slate-800">Security</h2>
            <p className="mt-2 text-sm text-slate-500">Change your password</p>

            <form
              onSubmit={handleChangePassword}
              className="mt-4 grid gap-4 sm:grid-cols-3"
            >
              <Input
                label="Current password"
                placeholder="Current password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <Input
                label="New password"
                placeholder="New password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Input
                label="Confirm password"
                placeholder="Confirm password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <div className="sm:col-span-3 flex justify-end">
                <Button type="submit" disabled={changing}>
                  {changing ? "Saving..." : "Change Password"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-1">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          <h2 className="text-lg font-medium text-slate-800">Account</h2>
          <p className="mt-2 text-sm text-slate-500">Manage your account</p>

          <div className="mt-4 space-y-3">
            <Button
              onClick={() => {
                logout();
                window.location.href = "/login";
              }}
              className="bg-slate-400 text-white hover:bg-slate-600"
            >
              Logout
            </Button>
            <Button
              onClick={() => setDeleteOpen(true)}
              className="bg-red-400 text-white hover:bg-red-500"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      <DeleteAccountConfirm
        open={deleteOpen}
        isDeleting={false}
        onClose={() => setDeleteOpen(false)}
      />
    </div>
  );
}
