"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";

const NavBarLinks = ({ onClose }: { onClose?: () => void }) => {
  return (
    <nav className="flex flex-col p-6 space-y-4 font-medium text-lg md:flex-row md:justify-center md:gap-4 md:p-0">
      <Link href="/" className="hover:text-slate-500" onClick={onClose}>
        Inicio
      </Link>
      <Link href="/menu" className="hover:text-slate-500" onClick={onClose}>
        Menu
      </Link>
      <Link href="/about" className="hover:text-slate-500" onClick={onClose}>
        About
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
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-40 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 h-full w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="cursor-pointer">
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
    <header className="flex flex-col px-6">
      <div className="flex w-full h-16 justify-between items-center py-4 md:justify-center ">
        <div className="cursor-pointer md:hidden">
          <Menu size={26} onClick={() => setIsMenuOpen(true)} />
        </div>
        <div>
          <h1 className="text-4xl font-bold">Nordico</h1>
        </div>
        <div className="cursor-pointer md:hidden">
          <Search size={26} />
        </div>

        <Sidebar
          isOpen={isMenuOpen}
          onClose={() => {
            setIsMenuOpen(false);
          }}
        />
      </div>

      <div className="hidden md:flex md:justify-center">
        <NavBarLinks />
      </div>
    </header>
  );
}
