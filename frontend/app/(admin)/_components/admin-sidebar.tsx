"use client";
import Link from "next/link";
import { CookingPot, Tags, LogOut, type LucideIcon } from "lucide-react";

interface NavbarLinkProps {
  toGo: string;
  icon: LucideIcon;
  content: string;
}

const NavbarLink = ({ toGo, icon: Icon, content }: NavbarLinkProps) => {
  return (
    <Link
      href={toGo}
      className="flex w-full items-center justify-center md:justify-start gap-2 rounded-md text-white text-lg hover:text-amber-100"
    >
      <Icon size={32} />
      <p className="hidden md:block">{content}</p>
    </Link>
  );
};

const SidebarLinks = [
  { link: "/products", icon: CookingPot, content: "Products" },
  { link: "/categories", icon: Tags, content: "Categories" },
  { link: "/", icon: LogOut, content: "Logout" },
];

export default function AdminSidebar() {
  return (
    <aside className="flex flex-col min-h-screen w-24 md:w-64 py-4 items-center justify-center border-r rounded-r-xl bg-stone-900">
      <div className="w-full text-center text-4xl text-white font-bold pb-4 border-stone-600/60 border-b-2">
        <span className="md:hidden">N</span>
        <span className="hidden w-full text-center text-xl text-white font-bold md:inline md:text-3xl">
          Nordico <span className="font-light text-white">Admin</span>
        </span>
      </div>

      <nav className="flex h-full w-full flex-col p-4 gap-4">
        {SidebarLinks.map((item) => (
          <NavbarLink key={item.link} toGo={item.link} content={item.content} icon={item.icon} />
        ))}
      </nav>
    </aside>
  );
}
