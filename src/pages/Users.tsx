import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { useDebounce } from "../hooks/useDebounce";

export default function Users() {
  const { users, loading, error } = useUsers();
  const [q, setQ] = useState("");
  const [order, setOrder] = useState<"name" | "email">("name");
  const debouncedQ = useDebounce(q, 250);

  // 👇 Hooks sempre chamados, mesmo quando loading/error
  const filtered = useMemo(() => {
    if (!users) return [] as typeof users extends (infer U)[] ? U[] : any[];
    const term = debouncedQ.toLowerCase().trim();
    const list = term
      ? users.filter(
          (u) =>
            u.name.toLowerCase().includes(term) ||
            u.email.toLowerCase().includes(term)
        )
      : users;
    return [...list].sort((a, b) => a[order].localeCompare(b[order]));
  }, [users, debouncedQ, order]);

  // 👇 Só depois fazemos os returns condicionais
  if (loading) return <p style={{ padding: 24 }}>Carregando usuários…</p>;
  if (error) return <p style={{ padding: 24 }}>Erro: {error}</p>;
  if (!filtered.length) return <p style={{ padding: 24 }}>Nenhum usuário.</p>;

  return (
    <section style={{ padding: 24 }}>
      <h1>Users (busca + debounce + ordenar)</h1>

      <div style={{ display: "flex", gap: 8, margin: "12px 0 20px" }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nome ou email…"
        />
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value as "name" | "email")}
        >
          <option value="name">Ordenar por nome</option>
          <option value="email">Ordenar por email</option>
        </select>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filtered.map((u) => (
          <li key={u.id} style={{ margin: "8px 0" }}>
            <Link to={`/users/${u.id}`} style={{ textDecoration: "none" }}>
              <strong>{u.name}</strong> — {u.email}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
