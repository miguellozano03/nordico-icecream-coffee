import Image from "next/image";

interface MenuItemProps {
  image?: string;
  title: string;
  description: string;
  price?: number;
}

export function MenuItem({ image, title, description, price }: MenuItemProps) {
  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm">
      <div className="relative h-52 w-full bg-slate-100">
        {image ? (
          <Image src={image} alt={title} fill unoptimized className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-400 text-sm">
            Sin imagen
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-500 mt-1">{description}</p>
        {price !== undefined && (
          <p className="mt-2 font-medium text-slate-800">${Number(price).toFixed(2)}</p>
        )}
      </div>
    </div>
  );
}
