import { Metadata } from "next";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

import { FullMenu, MenuCategories } from "@/data/restaurantMenu";
import { MenuItem } from "@/app/_components/MenuItem";

export const metadata: Metadata = {
  title: "Nordico - Menu",
  description: "Check out our menu ",
};

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const { page, category } = await searchParams;

  // const currentPage = Number(page ?? 1);
  const filteredMenu = category
    ? FullMenu.filter((item) => item.category === category)
    : FullMenu;

  return (
    <section className="min-h-[calc(100dvh-4rem)] px-4 py-8 md:px-8 lg:px-12">
      <h2 className="mb-8 text-3xl font-bold text-slate-800">Our Menu</h2>

      <form method="get" className="flex justify-end pb-10 gap-2">
        <NativeSelect name="category" defaultValue={category ?? ""}>
          <NativeSelectOption value="">All Categories</NativeSelectOption>
          {Object.entries(MenuCategories).map(([key, label]) => (
            <NativeSelectOption key={key} value={label}>
              {label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        <button
          type="submit"
          className="inline-flex h-8 items-center rounded-lg bg-slate-800 px-3 text-sm font-medium text-white hover:bg-slate-900"
        >
          Filter
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {filteredMenu.map((item) => (
          <MenuItem
            key={item.title}
            title={item.title}
            description={item.description}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>

      <div className="mt-8">
        {/* <Paginator currentPage={currentPage} totalPages={5} /> */}
      </div>
    </section>
  );
}
