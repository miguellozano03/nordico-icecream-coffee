"use client";
import { Send } from "lucide-react";

export function Footer() {
  return (
    // Cambiado a un fondo un poco más oscuro que el bg-slate-100 para dar profundidad, con texto base slate-600
    <footer className="bg-slate-50 text-slate-600 pt-16 pb-8 px-6 border-t border-slate-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* COLUMNA 1: Newsletter */}
        <div className="md:col-span-2 space-y-4">
          {/* Título en slate-800 para buen contraste sobre fondo claro */}
          <h3 className="text-slate-800 text-xl font-bold tracking-wide">
            Lorem, ipsum.
          </h3>
          <p className="text-sm text-slate-500 max-w-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae,
            fugiat.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex max-w-md gap-2 pt-2"
          >
            {/* Input claro con borde definido */}
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="w-full bg-white text-slate-800 px-4 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 border border-slate-300 text-sm transition-all placeholder:text-slate-400"
              required
            />
            {/* Botón oscuro tipo "Nordic Minimalist" que cambia suavemente al pasar el cursor */}
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-5 py-2.5 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm shadow-sm"
            >
              <span>Lorem.</span>
              <Send size={16} />
            </button>
          </form>
        </div>

        {/* COLUMNA 2: Enlaces - Tienda */}
        <div className="space-y-4">
          <h4 className="text-slate-800 font-semibold text-base tracking-wider uppercase">
            Lorem, ipsum.
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href="#" className="hover:text-slate-900 transition-colors">
                Lorem, ipsum.
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-slate-900 transition-colors">
                Lorem, ipsum.
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-slate-900 transition-colors">
                Lorem, ipsum.
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-slate-900 transition-colors">
                Lorem, ipsum.
              </a>
            </li>
          </ul>
        </div>

        {/* COLUMNA 3: Enlaces - Soporte */}
        <div className="space-y-4">
          <h4 className="text-slate-800 font-semibold text-base tracking-wider uppercase">
            Lorem, ipsum.
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href="#" className="hover:text-slate-900 transition-colors">
                Lorem, ipsum.
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-slate-900 transition-colors">
                Lorem, ipsum.
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-slate-900 transition-colors">
                Lorem, ipsum.
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-slate-900 transition-colors">
                Lorem, ipsum.
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Línea divisoria clara */}
      <hr className="border-slate-200 my-10" />

      {/* SECCIÓN INFERIOR: Copyright + Minitexto Lorem10 */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
        <p>
          &copy; {new Date().getFullYear()} Lorem ipsum dolor sit amet
          consectetur.
        </p>
        <p className="text-center md:text-right max-w-xs italic">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur,
          perferendis!
        </p>
      </div>
    </footer>
  );
}
