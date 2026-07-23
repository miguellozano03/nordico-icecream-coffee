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
import { useProducts, useDeleteProduct } from "@/hooks/useProducts";
import type { Product } from "@/api/schemas";

function TableRowItem({
  product,
  onDelete,
  isDeleting,
}: {
  product: Product;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}) {
  const { id, category, title, description, price } = product;

  return (
    <TableRow className="group align-top">
      <TableCell className="font-medium whitespace-normal break-words">{category.name}</TableCell>

      <TableCell className="whitespace-normal break-words font-medium">{title}</TableCell>

      <TableCell className="whitespace-normal break-words text-mauve-600">{description}</TableCell>

      <TableCell className="text-right tabular-nums">${price.toFixed(2)}</TableCell>

      <TableCell className="text-right">
        <button
          type="button"
          aria-label={`Delete ${title}`}
          disabled={isDeleting}
          onClick={() => onDelete(id)}
          className="inline-flex items-center justify-center rounded-md p-1.5 text-mauve-400 opacity-90 transition-all group-hover:opacity-100 hover:bg-red-100 hover:text-red-600 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
        >
          {isDeleting ? <Loader2 size={20} className="animate-spin" /> : <Trash2 size={20} />}
        </button>
      </TableCell>

      <TableCell className="text-right">
        <Link
          href={`/products/${id}/edit`}
          aria-label={`Update ${title}`}
          className="inline-flex items-center justify-center rounded-md p-1.5 text-mauve-400 opacity-90 transition-all group-hover:opacity-100 hover:bg-blue-100 hover:text-blue-600 cursor-pointer"
        >
          <SquarePen size={20} />
        </Link>
      </TableCell>
    </TableRow>
  );
}

function ProductCard({
  product,
  onDelete,
  isDeleting,
}: {
  product: Product;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}) {
  const { id, categoryId, title, description, price } = product;

  return (
    <div className="rounded-lg border border-mauve-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {/* {category} */}
          <p className="text-xs font-semibold uppercase tracking-wide text-mauve-400">
            {categoryId}
          </p>
          <h3 className="mt-0.5 font-medium text-mauve-900 break-words">{title}</h3>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            aria-label={`Delete ${title}`}
            disabled={isDeleting}
            onClick={() => onDelete(id)}
            className="inline-flex items-center justify-center rounded-md p-1.5 text-mauve-400 hover:bg-red-100 hover:text-red-600 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
          >
            {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
          </button>

          <Link
            href={`/products/${id}/edit`}
            aria-label={`Update ${title}`}
            className="inline-flex items-center justify-center rounded-md p-1.5 text-mauve-400 hover:bg-blue-100 hover:text-blue-600 cursor-pointer"
          >
            <SquarePen size={18} />
          </Link>
        </div>
      </div>

      <p className="mt-2 text-sm text-mauve-600 break-words">{description}</p>

      <p className="mt-3 text-right font-semibold tabular-nums text-mauve-900">
        ${price.toFixed(2)}
      </p>
    </div>
  );
}

export default function ProductTable() {
  const { data, isLoading, isError } = useProducts();
  const deleteProduct = useDeleteProduct();

  function handleDelete(id: string) {
    if (!confirm("¿Eliminar este producto?")) return;

    deleteProduct.mutate(id, {
      onError: () => {
        alert("No se pudo eliminar el producto. Intenta de nuevo.");
      },
    });
  }

  if (isLoading) {
    return <p className="text-sm text-stone-500">Cargando productos...</p>;
  }

  if (isError) {
    return (
      <p className="text-sm text-red-600">No se pudieron cargar los productos. Intenta de nuevo.</p>
    );
  }

  if (!data || data.data.length === 0) {
    return <p className="text-sm text-stone-500">Todavía no hay productos.</p>;
  }

  return (
    <>
      {/* Mobile: tarjetas apiladas */}
      <div className="grid gap-3 md:hidden">
        {data.data.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDelete}
            isDeleting={deleteProduct.isPending && deleteProduct.variables === product.id}
          />
        ))}
      </div>

      {/* Desktop: tabla */}
      <div className="hidden overflow-hidden rounded-sm border border-mauve-200 shadow-sm md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-mauve-700 hover:bg-mauve-700">
              <TableHead className="w-[140px] text-mauve-50 font-bold text-sm">Category</TableHead>
              <TableHead className="w-[200px] text-mauve-50 font-bold text-sm">Item</TableHead>
              <TableHead className="text-mauve-50 font-bold text-sm">Description</TableHead>
              <TableHead className="w-[110px] text-right text-mauve-50 font-bold text-sm">
                Price
              </TableHead>
              <TableHead className="w-[60px] text-right text-mauve-50 font-bold text-sm" />
              <TableHead className="w-[60px] text-right text-mauve-50 font-bold text-sm" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((product) => (
              <TableRowItem
                key={product.id}
                product={product}
                onDelete={handleDelete}
                isDeleting={deleteProduct.isPending && deleteProduct.variables === product.id}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
