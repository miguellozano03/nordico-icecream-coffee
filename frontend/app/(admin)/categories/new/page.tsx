import CategoryForm from "./CategoryForm";

export default function CreateCategory() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
      <div className="border-b border-stone-200 pb-6">
        <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">
          New category
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Create a new category for organice your products.
        </p>
      </div>

      <section className="pt-6">
        <CategoryForm />
      </section>
    </main>
  );
}
