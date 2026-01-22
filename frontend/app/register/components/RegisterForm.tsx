"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { InputForm } from "@/src/components/forms/InputForm";
import { Register, Login } from "@/src/services/user.service";
import { useAuthStore } from "@/src/stores/authStore";

type RegisterForm = {
  username: string;
  password: string;
};

export function RegisterForm() {
  const router = useRouter();
  const loginStore = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    try {
      await Register(data);

      // Auto-login after register
      const loginRes = await Login(data);
      loginStore.login(loginRes.token, loginRes.user);

      console.log("Registered and logged in:", loginRes.user);
      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.message);
      setError("root", { message: error.message || "Error en registro" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputForm<RegisterForm>
        label="Username"
        name="username"
        type="text"
        register={register}
        error={errors.username}
      />

      <InputForm<RegisterForm>
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
        Register
      </button>

      <div className="min-h-5 flex items-center">
        {errors.root && (
          <span
            className={`text-sm ${errors.root.message?.includes("exitoso") ? "text-green" : "text-red"}`}
          >
            {errors.root.message}
          </span>
        )}
      </div>
    </form>
  );
}
