import type { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Nordico - SignIn",
  description: "Only for admins. Don't pass if you're not authorized",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 px-6">
      <div className="w-full max-w-sm">
        {/* Logo / Marca */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/nordico_icon.png"
            width={72}
            height={72}
            alt="Nordico"
            className="mb-4"
          />
          <h1 className="text-2xl font-bold text-taupe-800 tracking-wide">
            Nordico
          </h1>
          <p className="text-sm text-stone-500 mt-1 text-center">
            Only admins are authorized
          </p>
        </div>

        {/* Card del formulario */}
        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-8">
          <LoginForm />
        </div>

        <p className="text-center text-xs text-stone-400 mt-6">
          Nordico © {new Date().getFullYear()} — Where Coffee & Ice Cream Unite
        </p>
      </div>
    </div>
  );
}
