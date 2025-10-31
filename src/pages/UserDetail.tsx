// src/pages/UserDetail.tsx
import { useParams } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";

export default function UserDetail() {
  const { id } = useParams();           // /users/3 -> id = "3"
  const { users, loading, error } = useUsers();
  if (loading) return <p>Carregando…</p>;
  if (error) return <p>Erro: {error}</p>;
  const user = users?.find(u => u.id === Number(id));
  if (!user) return <p>Usuário não encontrado</p>;
  return <h2>{user.name} — {user.email}</h2>;
}
