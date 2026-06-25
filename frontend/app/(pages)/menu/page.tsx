"use client";
import { useState } from "react";
import { Paginator } from "../_components/ui/Paginator";

function MenuItem() {
  return (
    <article className="flex gap-4 rounded-xl border p-3 md:block md:overflow-hidden md:p-0">
      <div className="h-24 w-24 shrink-0 overflow-hidden roundeed-lg md:h-56 md:w-full md:rounded-none bg-amber-200">
        <img src="" alt="" />
      </div>
      {/* Info */}
      <div className="flex flex-1 flex-col justify-between md:p-4">
        <div>
          <h3 className="font-semibold">Cafe latte</h3>
          <p className="text-sm">Expresso con leche vaporizada</p>
        </div>
        <p className="mt-2 font-bold text-amber-600">price</p>
      </div>
    </article>
  );
}

export default function MenuPage() {
  const [page, setPage] = useState(1);
  return (
    <section className="min-h-[calc(100dvh-4rem)] px-4 py-8 md:px-8 lg:px-12">
      <h2 className="mb-8 text-3xl font-bold text-slate-800">Nuestro Menú</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>

      <div className="mt-8">
        <Paginator currentPage={page} totalPages={5} onPageChange={setPage} />
      </div>
    </section>
  );
}
