import { Metadata } from "next";
import { MenuCategoryFilter } from "./_components/MenuCategoryFilter";
import { MenuProductGrid } from "./_components/MenuProductGrid";

export const metadata: Metadata = {
  title: "Nordico - Menu",
  description: "Check out our menu ",
};

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const { category } = await searchParams;

  return (
    <section className="min-h-[calc(100dvh-4rem)] px-4 py-8 md:px-8 lg:px-12">
      <h2 className="mb-8 text-3xl font-bold text-slate-800">Our Menu</h2>

      <div className="flex justify-end pb-10 gap-2">
        <MenuCategoryFilter currentCategory={category} />
      </div>

      <MenuProductGrid categoryId={category} />

      <div className="mt-8">{/* <Paginator currentPage={currentPage} totalPages={5} /> */}</div>
    </section>
  );
}
