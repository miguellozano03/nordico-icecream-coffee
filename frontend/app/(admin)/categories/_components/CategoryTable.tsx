"use client";

import Link from "next/link";
import { Trash2, SquarePen, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCategories, useDeleteCategory } from "@/hooks/useCategories";
import type { Category } from "@/api/schemas";

function TableRowItem({
  category,
  onDelete,
  isDeleting,
}: {
  category: Category;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}) {
  const { id, name } = category;

  return (
    <TableRow className="group align-top">
      <TableCell className="font-medium whitespace-normal break-words">
        {name}
      </TableCell>

      <TableCell className="text-right">
        <button
          type="button"
          aria-label={`Delete ${name}`}
          disabled={isDeleting}
          onClick={() => onDelete(id)}
          className="inline-flex items-center justify-center rounded-md p-1.5 text-mauve-400 opacity-90 transition-all group-hover:opacity-100 hover:bg-red-100 hover:text-red-600 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
        >
          {isDeleting ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Trash2 size={20} />
          )}
        </button>
      </TableCell>

      <TableCell className="text-right">
        <Link
          href={`/categories/${id}/edit`}
          aria-label={`Update ${name}`}
          className="inline-flex items-center justify-center rounded-md p-1.5 text-mauve-400 opacity-90 transition-all group-hover:opacity-100 hover:bg-blue-100 hover:text-blue-600 cursor-pointer"
        >
          <SquarePen size={20} />
        </Link>
      </TableCell>
    </TableRow>
  );
}

function CategoryCard({
  category,
  onDelete,
  isDeleting,
}: {
  category: Category;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}) {
  const { id, name } = category;

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-mauve-200 bg-white p-4 shadow-sm">
      <h3 className="min-w-0 break-words font-medium text-mauve-900">{name}</h3>

      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          aria-label={`Delete ${name}`}
          disabled={isDeleting}
          onClick={() => onDelete(id)}
          className="inline-flex items-center justify-center rounded-md p-1.5 text-mauve-400 hover:bg-red-100 hover:text-red-600 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
        >
          {isDeleting ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Trash2 size={18} />
          )}
        </button>

        <Link
          href={`/categories/${id}/edit`}
          aria-label={`Update ${name}`}
          className="inline-flex items-center justify-center rounded-md p-1.5 text-mauve-400 hover:bg-blue-100 hover:text-blue-600 cursor-pointer"
        >
          <SquarePen size={18} />
        </Link>
      </div>
    </div>
  );
}

export default function CategoryTable() {
  const { data, isLoading, isError } = useCategories();
  const deleteCategory = useDeleteCategory();

  function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta categoría?")) return;

    deleteCategory.mutate(id, {
      onError: () => {
        alert("No se pudo eliminar la categoría. Intenta de nuevo.");
      },
    });
  }

  if (isLoading) {
    return <p className="text-sm text-stone-500">Cargando categorías...</p>;
  }

  if (isError) {
    return (
      <p className="text-sm text-red-600">
        No se pudieron cargar las categorías. Intenta de nuevo.
      </p>
    );
  }

  if (!data || data.length === 0) {
    return <p className="text-sm text-stone-500">Todavía no hay categorías.</p>;
  }

  return (
    <>
      {/* Mobile: tarjetas apiladas */}
      <div className="grid gap-3 md:hidden">
        {data.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onDelete={handleDelete}
            isDeleting={
              deleteCategory.isPending &&
              deleteCategory.variables === category.id
            }
          />
        ))}
      </div>

      {/* Desktop: tabla */}
      <div className="hidden overflow-hidden rounded-sm border border-mauve-200 shadow-sm md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-mauve-700 hover:bg-mauve-700">
              <TableHead className="text-mauve-50 font-bold text-sm">
                Name
              </TableHead>
              <TableHead className="w-[60px] text-right text-mauve-50 font-bold text-sm" />
              <TableHead className="w-[60px] text-right text-mauve-50 font-bold text-sm" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((category) => (
              <TableRowItem
                key={category.id}
                category={category}
                onDelete={handleDelete}
                isDeleting={
                  deleteCategory.isPending &&
                  deleteCategory.variables === category.id
                }
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
