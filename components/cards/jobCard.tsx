import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

export default function JobCard() {
    return (
        <article className="w-full min-w-[290px] max-w-[290px] border border-brand-neutrals-20 bg-white p-6">
            <header className="mb-5 flex items-start justify-between gap-3">
                <div className="grid size-12 place-items-center rounded-md border border-brand-neutrals-20 text-3xl font-heading font-bold leading-none text-foreground">
                    R
                </div>

                <Button
                    variant="outline"
                    className=" "
                >
                    Full Time
                </Button>
            </header>

            <h2 className="font-heading text-lg font-bold text-brand-neutrals-100">Email Marketing</h2>

            <p className="mt-2  text-brand-neutrals-80">Revolut · Madrid, Spain</p>

            <p className="mt-4 line-clamp-2  text-brand-neutrals-80">
                Revolut is looking for Email Marketing to help team ma ...
            </p>

            <footer className="mt-6 flex flex-wrap items-center gap-2">
                <Badge variant="yellow">Marketing</Badge>
                <Badge variant="green">Design</Badge>
            </footer>
        </article>
    )
}
