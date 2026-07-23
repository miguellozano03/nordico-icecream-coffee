"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProduct, useUpdateProduct } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";

export default function EditProductForm({ productId }: { productId: string }) {
  const router = useRouter();

  const { data: product, isLoading, isError } = useProduct(productId);
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const updateProduct = useUpdateProduct();

  const [form, setForm] = useState({
    categoryId: "",
    title: "",
    description: "",
    price: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>();

  // Prellenar el form cuando llega la data del producto
  useEffect(() => {
    if (!product) return;

    setForm({
      categoryId: product.categoryId,
      title: product.title,
      description: product.description,
      price: String(product.price),
    });

    setPreview(product.imageUrl); // ajusta el nombre del campo si tu Product usa otro
  }, [product]);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    updateProduct.mutate(
      {
        id: productId,
        data: {
          categoryId: form.categoryId,
          title: form.title,
          description: form.description,
          price: Number(form.price),
        },
        image: image ?? undefined,
      },
      {
        onSuccess: () => {
          router.push("/products");
        },
      },
    );
  }

  function handleCancel() {
    router.push("/products");
  }

  if (isLoading) {
    return <p className="text-sm text-stone-500">Cargando producto...</p>;
  }

  if (isError || !product) {
    return (
      <p className="text-sm text-red-600">
        No se pudo cargar el producto. Intenta de nuevo.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-6xl rounded-2xl border border-stone-200 bg-white p-8 shadow-lg"
    >
      <div className="grid gap-10 lg:grid-cols-[1.2fr_380px]">
        {/* Inputs */}
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium text-stone-700">
                Category
              </label>

              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                disabled={updateProduct.isPending || isLoadingCategories}
                className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 outline-none transition focus:border-taupe-600 disabled:opacity-60"
              >
                <option value="" disabled>
                  {isLoadingCategories
                    ? "Cargando categorías..."
                    : "Selecciona una categoría"}
                </option>

                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium text-stone-700">
                Price
              </label>

              <input
                type="number"
                step="0.01"
                min="0"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="12.99"
                disabled={updateProduct.isPending}
                className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none transition focus:border-taupe-600 disabled:opacity-60"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium text-stone-700">
              Product name
            </label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Classic Coffee"
              disabled={updateProduct.isPending}
              className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none transition focus:border-taupe-600 disabled:opacity-60"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-stone-700">
              Description
            </label>

            <textarea
              rows={7}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your product..."
              disabled={updateProduct.isPending}
              className="w-full resize-none rounded-lg border border-stone-300 px-4 py-3 outline-none transition focus:border-taupe-600 disabled:opacity-60"
            />
          </div>

          {updateProduct.isError && (
            <p className="text-sm text-red-600">
              {updateProduct.error instanceof Error
                ? updateProduct.error.message
                : "Ocurrió un error al actualizar el producto."}
            </p>
          )}
        </div>

        {/* Image */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium text-stone-700">
            Product image
          </label>

          <label className="flex h-80 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-stone-300 bg-stone-100 transition hover:border-taupe-600 hover:bg-stone-50">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-center text-stone-500">
                <p className="text-lg font-semibold">Click to upload</p>
                <p className="text-sm">PNG, JPG or WEBP</p>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              disabled={updateProduct.isPending}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <button
          type="button"
          disabled={updateProduct.isPending}
          className="rounded-lg border border-stone-300 px-6 py-3 font-semibold transition hover:bg-stone-100 disabled:opacity-60"
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={updateProduct.isPending}
          className="rounded-lg bg-taupe-600 px-8 py-3 font-semibold text-white transition hover:bg-taupe-700 disabled:opacity-60"
        >
          {updateProduct.isPending ? "Guardando..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
