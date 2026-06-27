"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";

const NavBarLinks = ({ onClose }: { onClose?: () => void }) => {
  const linkClass =
    "text-stone-700 hover:text-amber-700 transition-colors duration-200";

  return (
    <nav className="flex flex-col p-6 space-y-4 font-medium text-lg md:flex-row md:justify-center md:gap-10 md:p-0">
      <Link href="/" className={linkClass} onClick={onClose}>
        Home
      </Link>

      <Link href="/menu" className={linkClass} onClick={onClose}>
        Our Menu
      </Link>

      <Link href="/about" className={linkClass} onClick={onClose}>
        About Us
      </Link>
    </nav>
  );
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 z-50 h-full w-sm bg-stone-50 border-r border-stone-200 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="rounded-md p-2 text-stone-700 hover:bg-stone-200 hover:text-amber-700 transition-colors cursor-pointer"
          >
            <X size={26} />
          </button>
        </div>

        <NavBarLinks onClose={onClose} />
      </div>
    </>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative flex flex-col px-6 bg-stone-100 border-b border-stone-200">
      <div className="flex h-16 w-full items-center justify-center py-4 md:justify-center">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="absolute left-2 md:hidden rounded-md p-2 text-stone-700 hover:bg-stone-200 hover:text-amber-700 transition-colors cursor-pointer"
        >
          <Menu size={26} />
        </button>

        <div>
          <h1 className="text-4xl font-bold tracking-tight text-stone-900">
            Nordico
          </h1>
        </div>

        <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>

      <div className="hidden md:flex md:justify-center py-4">
        <NavBarLinks />
      </div>
    </header>
  );
}
