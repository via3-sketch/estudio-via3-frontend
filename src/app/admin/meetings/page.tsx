import AdminLayout from "@/components/admin/AdminLayout";

import AdminRoute from "@/components/auth/AdminRoute";

import AdminMeetingsView from "@/app/views/admin/AdminMeetingsView";

export default function AdminMeetingsPage() {
  return (
    <AdminRoute>

      <AdminLayout>
        <AdminMeetingsView />
      </AdminLayout>

    </AdminRoute>
  );
}