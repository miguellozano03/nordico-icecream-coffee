import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nordico - About Us",
  description:
    "Discover the story behind our passion for coffee and artisan ice cream.",
};

export default function AboutPage() {
  return (
    <section className="min-h-[calc(100dvh-4rem)] px-4 py-12 md:px-8 lg:px-12 bg-stone-50">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-4xl font-bold tracking-wide text-stone-800">
          Our Story
        </h1>

        <p className="mb-12 font-medium text-stone-600">
          A deep passion for coffee, a love for artisan ice cream, and a warm
          space designed to share.
        </p>

        <div className="space-y-16">
          <article className="grid gap-8 md:grid-cols-2 md:items-center">
            <img
              src="/about-1.jpg"
              alt="Where it all began"
              className="h-72 w-full rounded-xl object-cover shadow-sm"
            />

            <div>
              <h2 className="mb-4 text-2xl font-bold text-stone-800">
                Where It All Began
              </h2>

              <p className="leading-relaxed text-stone-600">
                Nordico was born out of a simple yet profound idea: to create a
                cozy sanctuary where the rich, complex aroma of freshly brewed
                specialty coffee meets the smooth, comforting coldness of
                house-made artisan ice cream. What started as a tiny project
                driven by pure craftsmanship has naturally evolved into a
                favorite local retreat.
              </p>
            </div>
          </article>

          <article className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="order-2 md:order-1">
              <h2 className="mb-4 text-2xl font-bold text-stone-800">
                Honest, Pure Ingredients
              </h2>

              <p className="leading-relaxed text-stone-600">
                We believe that great flavors start at the source. We carefully
                select every single ingredient to offer an authentic
                experience—from partnering with small-scale coffee farmers for
                ethically sourced beans, to selecting fresh, organic seasonal
                fruits and premium toppings for our small-batch ice creams. No
                shortcuts, no artificial additions.
              </p>
            </div>

            <img
              src="/about-2.jpg"
              alt="Quality ingredients"
              className="order-1 h-72 w-full rounded-xl object-cover shadow-sm md:order-2"
            />
          </article>

          <article className="rounded-2xl border border-stone-200 bg-stone-100 p-8 text-center shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-stone-800">
              More Than Just a Coffee Shop
            </h2>

            <p className="mx-auto max-w-3xl leading-relaxed text-stone-600">
              Our ultimate goal is to inspire a *fika* state of mind—the
              beautiful Scandinavian custom of making space in your day to pause
              and appreciate life. We want to be that familiar corner where
              conversations run a little longer, coffee is savored without any
              rush, and every single visit leaves you with a warm, lasting
              memory.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
