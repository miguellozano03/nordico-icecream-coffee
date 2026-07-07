"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const { error } = await authService.login(email, password);

    setIsLoading(false);

    if (error) {
      setError("Correo o contraseña incorrectos.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-stone-700 mb-1.5"
        >
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@nordico.com"
          disabled={isLoading}
          className="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-2.5 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-taupe-800/40 focus:border-taupe-800 transition disabled:opacity-60"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-stone-700 mb-1.5"
        >
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          name="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          disabled={isLoading}
          className="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-2.5 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-taupe-800/40 focus:border-taupe-800 transition disabled:opacity-60"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600 -mt-1">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-taupe-800 text-stone-50 font-semibold py-2.5 rounded-lg hover:bg-taupe-800/90 active:scale-[0.99] transition disabled:opacity-60 disabled:pointer-events-none"
      >
        {isLoading ? "Ingresando..." : "Iniciar sesión"}
      </button>
    </form>
  );
}
