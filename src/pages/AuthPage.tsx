import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const registerSchema = z.object({
  name: z.string().min(1, "Nome e cognome obbligatorio"),
  email: z.string().email("Email non valida"),
  password: z.string()
    .min(8, "La password deve contenere almeno 8 caratteri")
    .regex(/[A-Z]/, "Deve contenere almeno una lettera maiuscola")
    .regex(/[a-z]/, "Deve contenere almeno una lettera minuscola")
    .regex(/[0-9]/, "Deve contenere almeno un numero")
    .regex(/[^A-Za-z0-9]/, "Deve contenere almeno un carattere speciale"),
  confirmPassword: z.string().min(1, "Conferma la password"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Le password non coincidono",
  path: ["confirmPassword"],
});

const loginSchema = z.object({
  email: z.string().email("Email non valida"),
  password: z.string().min(1, "Password obbligatoria"),
});

type FormErrors = Partial<Record<"name" | "email" | "password" | "confirmPassword", string>>;

function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === "/login";

  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setForm({ name: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
  }, [location.pathname]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const schema = isLogin
      ? loginSchema
      : registerSchema;

    const result = schema.safeParse(isLogin
      ? { email: form.email, password: form.password }
      : form
    );

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach(err => {
        const field = err.path[0] as keyof FormErrors;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
    }
  };

  const ErrorMsg = ({ field }: { field: keyof FormErrors }) =>
    errors[field] ? <p style={{ color: "red", fontSize: "0.75rem", marginTop: "0.25rem" }}>{errors[field]}</p> : null;

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <button
        onClick={() => navigate("/")}
        style={{ position: "absolute", top: "1.5rem", left: "1.5rem", display: "flex", alignItems: "center", background: "none", border: "none", cursor: "pointer" }}
      >
        <ArrowLeft size={28} />
      </button>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <Card className="w-[380px]">
          <CardHeader>
            <CardTitle>{isLogin ? "Bentornato" : "Crea un account"}</CardTitle>
            <CardDescription>
              {isLogin ? "Accedi al tuo account Shopia" : "Registrati per iniziare a fare shopping"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {!isLogin && (
              <div>
                <Input name="name" placeholder="Nome e cognome" value={form.name} onChange={handleChange} />
                <ErrorMsg field="name" />
              </div>
            )}
            <div>
              <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
              <ErrorMsg field="email" />
            </div>
            <div>
              <Input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
              <ErrorMsg field="password" />
            </div>
            {!isLogin && (
              <div>
                <Input name="confirmPassword" type="password" placeholder="Conferma password" value={form.confirmPassword} onChange={handleChange} />
                <ErrorMsg field="confirmPassword" />
              </div>
            )}
            <Button className="w-full mt-2" onClick={handleSubmit}>
              {isLogin ? "Accedi" : "Registrati"}
            </Button>
          </CardContent>
          <CardFooter className="justify-center text-sm">
            {isLogin ? "Non hai un account?" : "Hai già un account?"}
            <span
              onClick={() => navigate(isLogin ? "/register" : "/login")}
              style={{ marginLeft: "0.3rem", cursor: "pointer", textDecoration: "underline" }}
            >
              {isLogin ? "Registrati" : "Accedi"}
            </span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default AuthPage;
