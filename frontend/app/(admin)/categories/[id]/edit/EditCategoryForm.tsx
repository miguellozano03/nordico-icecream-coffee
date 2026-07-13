"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCategory, useUpdateCategory } from "@/hooks/useCategories";

export default function EditCategoryForm({
  categoryId,
}: {
  categoryId: string;
}) {
  const router = useRouter();

  const { data: category, isLoading, isError } = useCategory(categoryId);
  const updateCategory = useUpdateCategory();

  const [name, setName] = useState("");

  useEffect(() => {
    if (!category) return;
    setName(category.name);
  }, [category]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    updateCategory.mutate(
      { id: categoryId, data: { name } },
      {
        onSuccess: () => {
          router.push("/categories");
        },
      },
    );
  }

  function handleCancel() {
    router.push("/categories");
  }

  if (isLoading) {
    return <p className="text-sm text-stone-500">Cargando categoría...</p>;
  }

  if (isError || !category) {
    return (
      <p className="text-sm text-red-600">
        No se pudo cargar la categoría. Intenta de nuevo.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8 shadow-lg"
    >
      <div>
        <label className="mb-2 block font-medium text-stone-700">
          Category name
        </label>

        <input
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Coffee"
          disabled={updateCategory.isPending}
          className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none transition focus:border-taupe-600 disabled:opacity-60"
        />

        {updateCategory.isError && (
          <p className="mt-2 text-sm text-red-600">
            {updateCategory.error instanceof Error
              ? updateCategory.error.message
              : "Ocurrió un error al actualizar la categoría."}
          </p>
        )}
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <button
          type="button"
          disabled={updateCategory.isPending}
          className="rounded-lg border border-stone-300 px-6 py-3 font-semibold transition hover:bg-stone-100 disabled:opacity-60"
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={updateCategory.isPending}
          className="rounded-lg bg-taupe-600 px-8 py-3 font-semibold text-white transition hover:bg-taupe-700 disabled:opacity-60"
        >
          {updateCategory.isPending ? "Guardando..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
