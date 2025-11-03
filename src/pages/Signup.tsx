import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    name: z.string().min(3, "Mínimo 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirm: z.string(),
    terms: z.boolean().refine((v) => v, { message: "Aceite os termos" }),
  })
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Senhas diferentes",
  });

type FormData = z.infer<typeof schema>;

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { terms: false },
  });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 600)); // simula request
    alert(`OK!\n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <section className="container" style={{ maxWidth: 560 }}>
      <div className="card" style={{ padding: 28 }}>
        <h1 className="h1">Cadastro</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="form form--narrow">
          <label>
            Nome
            <input {...register("name")} placeholder="Seu nome" />
            {errors.name && <small className="error">{errors.name.message}</small>}
          </label>

          <label>
            E-mail
            <input {...register("email")} placeholder="voce@exemplo.com" />
            {errors.email && <small className="error">{errors.email.message}</small>}
          </label>

          <label>
            Senha
            <input type="password" {...register("password")} />
            {errors.password && <small className="error">{errors.password.message}</small>}
          </label>

          <label>
            Confirmar senha
            <input type="password" {...register("confirm")} />
            {errors.confirm && <small className="error">{errors.confirm.message}</small>}
          </label>

          {/* Checkbox alinhada à esquerda */}
          <label className="checkbox-row">
            <input type="checkbox" {...register("terms")} />
            <span>Aceito os termos</span>
          </label>
          {errors.terms && <small className="error">{errors.terms.message}</small>}

          <button disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Criar conta"}
          </button>
        </form>
      </div>
    </section>
  );
}
