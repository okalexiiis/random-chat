"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { InputForm } from "@/src/components/forms/InputForm";
import { Login } from "@/src/services/user.service";
import { useAuthStore } from "@/src/stores/authStore";

type LoginForm = {
  username: string;
  password: string;
};

export function LoginForm() {
  const router = useRouter();
  const loginStore = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await Login(data);

      // Guardamos token y usuario en Zustand
      loginStore.login(res.token, res.user);

      console.log("Logged in:", res.user);
      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.message);
      setError("root", { message: error.message || "Error en login" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputForm<LoginForm>
        label="Username"
        name="username"
        type="text"
        register={register}
        error={errors.username}
      />

      <InputForm<LoginForm>
        label="Password"
        name="password"
        type="password"
        register={register}
        error={errors.password}
      />

      <button
        className="w-full bg-green hover:bg-green-muted text-foreground py-2 rounded transition-colors cursor-pointer"
        type="submit"
      >
        Log In
      </button>

      <div className="min-h-5 flex items-center">
        {errors.root && (
          <span className="text-sm text-red">{errors.root.message}</span>
        )}
      </div>
    </form>
  );
}
