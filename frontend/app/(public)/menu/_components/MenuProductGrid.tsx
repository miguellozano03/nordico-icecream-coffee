"use client";

import { useProducts } from "@/hooks/useProducts";
import { MenuItem } from "@/app/(public)/_components/ui/MenuItem";

export function MenuProductGrid({ categoryId }: { categoryId?: string }) {
  const { data, isLoading, isError } = useProducts(categoryId ? { categoryId } : {});

  if (isLoading) {
    return <p className="text-slate-500">Loading menu...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Error to load menu.</p>;
  }

  const products = data?.data ?? [];

  if (products.length === 0) {
    return <p className="text-slate-500">This category does not have products.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {products.map((item) => (
        <MenuItem
          key={item.id}
          title={item.title}
          description={item.description}
          image={item.image}
          price={item.price}
        />
      ))}
    </div>
  );
}
