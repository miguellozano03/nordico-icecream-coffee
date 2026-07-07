import Image from "next/image";
import { MenuItem } from "./_components/ui/MenuItem";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative px-6 h-[calc(100dvh-4rem)] bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat bg-black/45 bg-blend-multiply">
        <div className="flex items-center justify-center h-full">
          <h1 className="text-3xl md:text-5xl font-bold text-center text-stone-100 drop-shadow-md">
            Where Coffee & Ice Cream Unite
          </h1>
        </div>
      </section>

      <section className="p-12">
        <h2 className="text-2xl font-bold mb-4 text-taupe-800/">Our Story</h2>
        <article className="grid grid-cols-1 md:grid-cols-5 gap-12 text-stone-800 leading-relaxed items-center">
          <div className="md:col-span-3 space-y-4">
            <p>
              Driven by a deep passion for crafting exceptional culinary
              moments, Nordico began over a decade ago as nothing more than a
              dream and a humble, handcrafted coffee cart. What started as a
              small daily ritual of serving freshly brewed cups on a quiet
              street corner has naturally blossomed into a beloved sanctuary for
              locals. Over the years, we have grown into a warm, minimalist
              space designed specifically for those who wish to slow down,
              offering an uncompromised, perfect blend of rich, single-origin
              aromatic coffee and exceptionally creamy, house-made artisan ice
              cream.
            </p>
            <p>
              At the heart of our philosophy is a steadfast commitment to purity
              and quality. We build direct, transparent relationships with
              small-scale coffee growers and local dairy farmers, ensuring that
              every single bean is ethically sourced and every scoop is churned
              from scratch using honest, seasonal ingredients—completely free
              from artificial preservatives or stabilizers. For us, it is about
              honoring the craft behind the flavor.
            </p>
            <p>
              Whether you are seeking your essential morning pick-me-up to
              kickstart the day, an afternoon escape to enjoy a quiet *fika*
              moment, or a sweet, refreshing treat to share with close friends,
              Nordico is your refuge. We invite you to step inside, take a deep
              breath, and let us delight your senses with the beautifully
              unexpected harmony of warmth and frost.
            </p>
          </div>
          <div className="md:col-span-2 flex justify-center md:justify-center">
            <Image src="/nordico_icon.png" width={250} height={250} alt="" />
          </div>
        </article>
      </section>

      <section className="p-12 max-w-6xl mx-auto bg-stone-50">
        <h2 className="text-2xl font-bold mb-8 text-center bg-stone-50 text-taupe-800 tracking-wide">
          Our Signature Delights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HomeItems.map((item) => (
            <MenuItem
              key={item.title}
              title={item.title}
              image={item.image}
              description={item.description}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

const HomeItems = [
  {
    image: "/americano_coffee.jpg",
    title: "Classic Coffee",
    description:
      "Our masterpiece. A double scoop of our signature sea-salt artisan vanilla ice cream, drowned in a freshly pulled shot of hot espresso.",
  },
  {
    image: "/affogato.webp",
    title: "The Nordico Affogato",
    description:
      "Our masterpiece. A double scoop of our signature sea-salt artisan vanilla ice cream, drowned in a freshly pulled shot of hot espresso.",
  },
  {
    image: "/ice-cream.jpg",
    title: "Artisan Ice Cream",
    description:
      "Made from scratch in small batches using local organic dairy and real, seasonal ingredients. No artificial colors, just pure flavor.",
  },
];
