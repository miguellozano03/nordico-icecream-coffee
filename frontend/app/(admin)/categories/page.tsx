import Link from "next/link";
import CategoryTable from "./_components/CategoryTable";

export default function CategoriesPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            Categories
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Manage your product categories.
          </p>
        </div>

        <Link
          href="/categories/new"
          className="inline-flex items-center justify-center rounded-sm bg-taupe-600 px-5 py-2.5 text-center font-semibold text-stone-50 transition hover:bg-taupe-600/90 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60"
        >
          Create category
        </Link>
      </div>

      <section className="pt-6">
        <CategoryTable />
      </section>
    </main>
  );
}
