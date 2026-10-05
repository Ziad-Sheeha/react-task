import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { UsersTable } from './UsersTable'
import { useUsers } from './hooks/useUsers'

export function UsersPage() {
  const { users, loading, error, refetch } = useUsers()

  if (error) {
    return (
      <div className="flex flex-column align-items-start gap-3">
        <Message severity="error" text={`Could not load users: ${error}`} />
        <Button label="Try again" icon="pi pi-refresh" onClick={refetch} />
      </div>
    )
  }

  return <UsersTable users={users} loading={loading} />
}
