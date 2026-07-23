import EditProductForm from "./EditProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
      <div className="border-b border-stone-200 pb-6">
        <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">
          Edit product
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Actualiza la información de este producto.
        </p>
      </div>

      <section className="pt-6">
        <EditProductForm productId={id} />
      </section>
    </main>
  );
}
