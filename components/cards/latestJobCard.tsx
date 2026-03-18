import { Badge } from '../ui/badge'

export default function LatestJobCard() {
  return (
    <article className="w-full border border-brand-neutrals-20 bg-white p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
        <header className="shrink-0">
          <div className="grid size-11 place-items-center rounded-md bg-brand-green/15 text-xl font-heading font-bold text-brand-green">
            N
          </div>
        </header>

        <section className="min-w-0 flex-1">
          <h2 className="font-heading text-xl font-bold text-brand-neutrals-100">
            Social Media Assistant
          </h2>

          <p className="mt-1 text-brand-neutrals-80">Nomad · Paris, France</p>

          <footer className="mt-4 flex flex-wrap items-center gap-2">
            <Badge variant="green">Full-Time</Badge>
            <Badge variant="yellow">Marketing</Badge>
            <Badge variant="default">Design</Badge>
          </footer>
        </section>
      </div>
    </article>
  )
}
