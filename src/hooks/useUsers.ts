import { useEffect, useState } from "react";

export type User = { id: number; name: string; email: string };

export function useUsers() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(r => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then((data: User[]) => alive && setUsers(data))
      .catch(err => alive && setError(String(err)))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  return { users, loading, error };
}
