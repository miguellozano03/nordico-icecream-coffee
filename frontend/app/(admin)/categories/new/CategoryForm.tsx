"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useCreateCategory } from "@/hooks/useCategories";

export default function CategoryForm() {
  const [name, setName] = useState("");
  const createCategory = useCreateCategory();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function resetForm() {
    setName("");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    createCategory.mutate(
      { name },
      {
        onSuccess: () => {
          resetForm();
        },
      },
    );
  }

  function handleCancel() {
    resetForm();
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
          disabled={createCategory.isPending}
          className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none transition focus:border-taupe-600 disabled:opacity-60"
        />

        {createCategory.isError && (
          <p className="mt-2 text-sm text-red-600">
            {createCategory.error instanceof Error
              ? createCategory.error.message
              : "Ocurrió un error al crear la categoría."}
          </p>
        )}
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <button
          type="button"
          disabled={createCategory.isPending}
          className="rounded-lg border border-stone-300 px-6 py-3 font-semibold transition hover:bg-stone-100 disabled:opacity-60"
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={createCategory.isPending}
          className="rounded-lg bg-taupe-600 px-8 py-3 font-semibold text-white transition hover:bg-taupe-700 disabled:opacity-60"
        >
          {createCategory.isPending ? "Creando..." : "Create category"}
        </button>
      </div>
    </form>
  );
}
