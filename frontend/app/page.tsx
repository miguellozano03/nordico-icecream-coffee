export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <section className="bg-blue-400/20 px-6 h-[calc(100dvh-4rem)]">
        <div className="flex items-center justify-center h-full">
          <h1 className="text-3xl font-bold text-center">
            ¡Bienvenido a Nordico!
          </h1>
        </div>
      </section>

      <section className="p-12 bg-white">
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <article className="text-slate-600 leading-relaxed">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            a quibusdam animi vitae soluta veniam recusandae, debitis impedit
            dolorum ullam, architecto perspiciatis tempora laboriosam placeat,
            ipsum blanditiis quas corrupti ex provident in? Enim reprehenderit
            sit corrupti accusantium vitae consequuntur neque! Voluptate amet
            accusantium quae in mollitia veritatis, adipisci distinctio
            excepturi exercitationem esse, ullam quibusdam quos illo! Hic
            possimus exercitationem, assumenda quis dolores, eum optio
            accusantium cum ea nobis totam praesentium nostrum aut blanditiis
            eligendi adipisci maiores reiciendis veritatis recusandae
            reprehenderit facere ad. Iusto minima nobis nisi saepe ratione
            facere sequi inventore esse repellendus. Voluptatum eum reiciendis
            enim culpa! Commodi, eum!
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus,
            iure quas molestias voluptatem cupiditate soluta reiciendis
            distinctio suscipit consequatur id alias incidunt libero praesentium
            consectetur ullam deleniti assumenda ad rerum?
          </p>
        </article>
      </section>

      <section className="p-12 bg-white">
        <h2 className="text-2xl font-bold mb-4">Lorem ipsum dolor sit amet.</h2>
        <article className="text-slate-600 leading-relaxed">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus,
            iure quas molestias voluptatem cupiditate soluta reiciendis
            distinctio suscipit consequatur id alias incidunt libero praesentium
            consectetur ullam deleniti assumenda ad rerum?
          </p>
        </article>
      </section>
    </div>
  );
}
