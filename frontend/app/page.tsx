"use client";
import Link from "next/link";
import { useAuthStore } from "@/src/stores/authStore";

export default function Home() {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <section className="w-full max-w-5xl text-center space-y-12 py-12">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-foreground">
            Random Chat
          </h1>
          <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
            Connect with random people around the world in real-time conversations. Discover new perspectives and make friends globally.
          </p>
        </div>
        {user ? (
          <div className="space-y-6">
            <p className="text-2xl text-foreground">Welcome back, {user.username}!</p>
            <div className="space-y-4">
              <button className="w-full max-w-sm mx-auto bg-green hover:bg-green-muted text-foreground py-3 px-8 rounded-lg transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105">
                Start Chatting
              </button>
              <br />
              <button onClick={logout} className="text-red hover:text-red-muted transition-colors underline">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex gap-6 justify-center flex-col sm:flex-row">
              <Link
                href="/login"
                className="bg-green hover:bg-green-muted text-foreground py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-background-secondary hover:bg-background text-foreground py-3 px-8 rounded-lg border-2 border-foreground transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}