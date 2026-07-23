import Link from "next/link";
import { Plus } from "lucide-react";
import ProductTable from "./_components/ProductTable";

export default function ProductsPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            Products
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Manage your menu products
          </p>
        </div>

        <Link
          href="/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-sm bg-taupe-600 px-3 py-2.5 text-center font-semibold text-stone-50 transition hover:bg-taupe-600/90 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60"
        >
          <Plus />
          Create product
        </Link>
      </div>

      <section className="pt-6">
        <ProductTable />
      </section>
    </main>
  );
}
