import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductForm from "./ProductForm";

export default function CreateProduct() {
  return (
    <main className="flex flex-col py-5">
      <h1 className="text-3xl font-bold text-stone-900 pb-5">Create new product</h1>
      <div className="flex w-full p-2 justify-end">
        <Link
          href="/products"
          className="flex items-center justify-evenly w-32 bg-taupe-600 text-stone-50 text-center font-semibold py-2 rounded-sm hover:bg-taupe-600/90 active:scale-[0.99] transition disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
        >
          <ArrowLeft />
          Go back
        </Link>
      </div>

      <ProductForm />
    </main>
  );
}
