import Link from "next/link";
import { RegisterForm } from "./components/RegisterForm";

export default function Register() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-background">
      <section className="w-full max-w-4xl min-h-96 border-2 border-background-secondary flex items-center justify-center bg-background-secondary shadow-lg">
        <div className="space-y-6 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-foreground">Register for Random Chat</h1>
          <RegisterForm />
          <p className="text-center text-foreground">
            Already have an account? <Link href="/login" className="text-green hover:text-green-muted transition-colors">Login</Link>
          </p>
        </div>
      </section>
    </div>
  );
}