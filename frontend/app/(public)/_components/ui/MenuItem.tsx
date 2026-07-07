interface MenuItemProps {
  image?: string;
  title: string;
  description: string;
  price?: string;
}

export function MenuItem({ image, title, description, price }: MenuItemProps) {
  return (
    <article className="flex gap-4 rounded-xl border border-stone-200 bg-stone-50 p-3 transition-shadow hover:shadow-md md:block md:overflow-hidden md:p-0">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-stone-200 md:h-56 md:w-full md:rounded-none">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-1 flex-col justify-between p-1 md:p-4">
        <div>
          <h3 className="text-stone-900 font-semibold md:text-lg">{title}</h3>

          <p className="mt-1 text-sm leading-snug text-stone-600">
            {description}
          </p>
        </div>

        <p className="mt-4 text-lg font-bold text-stone-900">{price}</p>
      </div>
    </article>
  );
}
