"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { useCategories } from "@/hooks/useCategories";

export function MenuCategoryFilter({ currentCategory }: { currentCategory?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: categories, isLoading } = useCategories();

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <NativeSelect
      name="category"
      defaultValue={currentCategory ?? ""}
      disabled={isLoading}
      onChange={(e) => handleChange(e.target.value)}
    >
      <NativeSelectOption value="">All Categories</NativeSelectOption>
      {categories?.map((cat) => (
        <NativeSelectOption key={cat.id} value={cat.id}>
          {cat.name}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  );
}
