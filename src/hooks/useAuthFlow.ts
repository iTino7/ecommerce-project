import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLogin, useRegister } from "./useAuth";
import { ApiError } from "../api/auth";
import type { LoginPayload, RegisterPayload } from "../types/auth";

export function useAuthFlow(isLogin: boolean) {
  const navigate = useNavigate();
  const loginMut = useLogin();
  const registerMut = useRegister();
  const activeMut = isLogin ? loginMut : registerMut;

  const handleSuccess = (message: string) => {
    toast.success(message);
    navigate("/");
  };

  const handleError = (err: Error) => {
    const isConflict = err instanceof ApiError && err.status === 409;
    const looksLikeEmailDup = /email/i.test(err.message) && /(exist|gi[aà]|registr|use)/i.test(err.message);
    toast.error(isConflict || looksLikeEmailDup ? "Email già registrata" : err.message);
  };

  const submit = (payload: LoginPayload | RegisterPayload) => {
    if (isLogin) {
      loginMut.mutate(payload as LoginPayload, {
        onSuccess: () => handleSuccess("Accesso effettuato!"),
        onError: handleError,
      });
    } else {
      registerMut.mutate(payload as RegisterPayload, {
        onSuccess: () => handleSuccess("Registrazione completata!"),
        onError: handleError,
      });
    }
  };

  const reset = () => {
    loginMut.reset();
    registerMut.reset();
  };

  return {
    submit,
    reset,
    isPending: activeMut.isPending,
    error: activeMut.error,
  };
}
