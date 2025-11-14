import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

type F = { email: string; password: string };

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<F>();
  const { login } = useAuth();
  const nav = useNavigate();
  const [error, setError] = useState("");

  // ✅ aplica o fundo no BODY quando esta página monta
  useEffect(() => {
    // mantém compatibilidade com a classe existente
    document.body.classList.add("bg-hero");

    // também aplica via estilo inline (garante que a imagem em /public seja usada)
    const prev = {
      backgroundImage: document.body.style.backgroundImage,
      backgroundSize: document.body.style.backgroundSize,
      backgroundPosition: document.body.style.backgroundPosition,
      backgroundRepeat: document.body.style.backgroundRepeat,
      backgroundAttachment: document.body.style.backgroundAttachment,
    };
    document.body.style.backgroundImage = "url('/bg-landing-hd.webp')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";

    return () => {
      document.body.classList.remove("bg-hero");
      document.body.style.backgroundImage = prev.backgroundImage;
      document.body.style.backgroundSize = prev.backgroundSize;
      document.body.style.backgroundPosition = prev.backgroundPosition;
      document.body.style.backgroundRepeat = prev.backgroundRepeat;
      document.body.style.backgroundAttachment = prev.backgroundAttachment;
    };
  }, []);

  const onSubmit = async (data: F) => {
    try {
      setError("");
      await login(data.email, data.password);
      // redirecionamento (se já não estiver no AuthContext)
      nav("/dashboard", { replace: true });
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <section className="container" style={{ maxWidth: 760, paddingTop: 32, paddingBottom: 64 }}>
      <div className="card" style={{ padding: 32, maxWidth: 640, margin: "0 auto" }}>
        <h1 className="h1">Login</h1>

        {error && (
          <div style={{
            color: "red", marginBottom: 16, padding: 12,
            background: "#ffe6e6", borderRadius: 4, border: "1px solid #ffcccc"
          }}>
            {error}
          </div>
        )}

        <form className="form form--narrow" onSubmit={handleSubmit(onSubmit)}>
          <label>
            E-mail
            <input
              type="email"
              {...register("email", {
                required: "E-mail é obrigatório",
                pattern: { value: /^\S+@\S+$/i, message: "E-mail inválido" }
              })}
              style={{ height: 44 }}
            />
            {errors.email && <span style={{ color: "red", fontSize: 14 }}>{errors.email.message}</span>}
          </label>

          <label>
            Senha
            <input
              type="password"
              {...register("password", {
                required: "Senha é obrigatória",
                minLength: { value: 6, message: "Senha deve ter pelo menos 6 caracteres" }
              })}
              style={{ height: 44 }}
            />
            {errors.password && <span style={{ color: "red", fontSize: 14 }}>{errors.password.message}</span>}
          </label>

          <button type="submit" style={{ height: 44 }}>Entrar</button>
        </form>

        <p style={{ marginTop: 12, textAlign: "center" }}>
          Novo aqui? <Link to="/signup">Crie sua conta</Link>
        </p>
      </div>
    </section>
  );
}
