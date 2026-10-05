import { useCallback, useEffect, useState } from 'react'
import { fetchUsers, toUserRow } from '../api/usersApi'
import type { UserRow } from '../types'

export function useUsers() {
  const [users, setUsers] = useState<UserRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    fetchUsers(controller.signal)
      .then((data) => setUsers(data.map(toUserRow)))
      .catch((e: Error) => {
        if (e.name !== 'AbortError') setError(e.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [reloadKey])

  const refetch = useCallback(() => {
    setLoading(true)
    setError(null)
    setReloadKey((k) => k + 1)
  }, [])

  return { users, loading, error, refetch }
}
