"use client";

import Link from "next/link";
import { Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Newsletter */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-2xl font-bold text-stone-100">
            Join the Nordico Club
          </h3>

          <p className="max-w-md text-sm text-stone-400">
            Get seasonal flavors, exclusive offers and cozy fika inspiration
            delivered straight to your inbox.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-2 max-w-md pt-2"
          >
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 rounded-md bg-stone-800 border border-stone-700 px-4 py-2.5 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600"
            />

            <button className="flex items-center gap-2 rounded-md bg-amber-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-amber-600 cursor-pointer">
              Join
              <Send size={16} />
            </button>
          </form>
        </div>

        {/* Explore */}
        <div>
          <h4 className="mb-4 font-semibold uppercase tracking-wider text-stone-100">
            Explore
          </h4>

          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:text-amber-400 transition">
                Home
              </Link>
            </li>

            <li>
              <Link href="/menu" className="hover:text-amber-400 transition">
                Menu
              </Link>
            </li>

            <li>
              <Link href="/about" className="hover:text-amber-400 transition">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-4 font-semibold uppercase tracking-wider text-stone-100">
            Contact
          </h4>

          <ul className="space-y-3 text-sm text-stone-400">
            <li>123 Coffee Street</li>
            <li>Stockholm, Sweden</li>
            <li>+46 123 456 789</li>
            <li>hello@nordico.com</li>
          </ul>
        </div>
      </div>

      <div className="my-10 border-t border-stone-800" />

      <div className="max-w-7xl mx-auto flex flex-col gap-3 md:flex-row md:justify-between md:items-center text-xs text-stone-500">
        <p>
          © {new Date().getFullYear()} Nordico Coffee & Ice Cream. All rights
          reserved.
        </p>

        <p>
          Designed & developed by{" "}
          <a
            href="https://github.com/miguellozano03"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-300 hover:text-amber-400 transition"
          >
            miguellozano03
          </a>
        </p>
      </div>
    </footer>
  );
}
