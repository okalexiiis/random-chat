"use client";
// components/form/InputForm.tsx
import { InputHTMLAttributes } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type InputFormProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
} & InputHTMLAttributes<HTMLInputElement>;

export function InputForm<T extends FieldValues>({
  label,
  name,
  register,
  error,
  ...props
}: InputFormProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-foreground">
        {label}
      </label>

      <input
        id={name}
        {...register(name)}
        {...props}
        className="border border-foreground rounded px-2 py-1 bg-background text-foreground focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-colors"
      />

      {error && <span className="text-sm text-red-500">{error.message}</span>}
    </div>
  );
}
