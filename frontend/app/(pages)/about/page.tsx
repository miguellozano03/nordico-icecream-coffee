export default function AboutPage() {
  return (
    <section className="min-h-[calc(100dvh-4rem)] px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-4xl font-bold text-slate-800">
          Nuestra Historia
        </h1>

        <p className="mb-12 text-slate-600">
          Pasión por el café, amor por los helados y momentos para compartir.
        </p>

        <div className="space-y-16">
          <article className="grid gap-8 md:grid-cols-2 md:items-center">
            <img
              src="/about-1.jpg"
              alt="Fundación de la cafetería"
              className="h-72 w-full rounded-xl object-cover"
            />

            <div>
              <h2 className="mb-4 text-2xl font-semibold">
                Donde todo comenzó
              </h2>

              <p className="leading-relaxed text-slate-600">
                Nuestra historia nació con una idea sencilla: crear un espacio
                donde el aroma del café recién preparado y la frescura de los
                helados artesanales se encontraran en un mismo lugar.
              </p>
            </div>
          </article>

          <article className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="order-2 md:order-1">
              <h2 className="mb-4 text-2xl font-semibold">
                Ingredientes de calidad
              </h2>

              <p className="leading-relaxed text-slate-600">
                Seleccionamos cuidadosamente nuestros ingredientes para ofrecer
                sabores auténticos, desde granos de café hasta frutas y toppings
                para nuestros helados.
              </p>
            </div>

            <img
              src="/about-2.jpg"
              alt="Ingredientes"
              className="order-1 h-72 w-full rounded-xl object-cover md:order-2"
            />
          </article>

          <article className="rounded-2xl bg-slate-100 p-8 text-center">
            <h2 className="mb-4 text-2xl font-semibold">
              Más que una cafetería
            </h2>

            <p className="mx-auto max-w-3xl text-slate-600">
              Queremos ser ese lugar donde las conversaciones duran más, los
              cafés se disfrutan sin prisa y cada visita deja un buen recuerdo.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
