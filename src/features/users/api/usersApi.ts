import type { ApiUser, UserRow } from "../types";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export async function fetchUsers(signal?: AbortSignal): Promise<ApiUser[]> {
  const res = await fetch(USERS_URL, { signal });
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
  return res.json();
}

export const toUserRow = (u: ApiUser): UserRow => ({
  id: u.id,
  name: u.name,
  username: u.username,
  email: u.email,
  phone: u.phone,
  website: u.website,
  company: u.company.name,
  city: u.address.city,
});
