import { StateMessage } from "@/components/feedback/StateMessage";
import { UsersTable } from "./UsersTable";
import { UsersTableSkeleton } from "./UsersTableSkeleton";
import { useUsers } from "./hooks/useUsers";

export function UsersPage() {
  const { users, loading, error, refetch } = useUsers();

  if (loading) return <UsersTableSkeleton />;

  if (error) {
    return (
      <StateMessage
        tone="danger"
        icon="pi pi-exclamation-triangle"
        title="Couldn't load users"
        description={`${error}. Check your connection and try again.`}
        actionLabel="Try again"
        actionIcon="pi pi-refresh"
        onAction={refetch}
      />
    );
  }

  if (users.length === 0) {
    return (
      <StateMessage
        tone="info"
        icon="pi pi-users"
        title="No users yet"
        description="The server returned an empty list."
        actionLabel="Refresh"
        actionIcon="pi pi-refresh"
        onAction={refetch}
      />
    );
  }

  return <UsersTable users={users} />;
}
