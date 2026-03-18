import { ArrowRight, Pen } from 'lucide-react'
import Link from 'next/link'

export default function CategoryCard() {
    return (
        <article className="w-full md:max-w-[274px]">
            <Link
                href="/"
                className="group flex items-center gap-4 border border-brand-neutrals-20 bg-white p-4 transition-colors duration-200 hover:bg-primary md:block md:p-6"
            >
                <header className="shrink-0 py-0 md:py-6">
                    <Pen className="h-[35px] w-[35px] text-primary transition-colors duration-200 group-hover:text-white" />
                </header>

                <section className="min-w-0 flex-1 w-full">
                    <h2 className="font-heading text-xl font-bold text-foreground transition-colors duration-200 group-hover:text-white md:text-2xl">
                        Design
                    </h2>

                    <p className="flex w-full items-center justify-between gap-3 py-1 text-base text-muted-foreground transition-colors duration-200 group-hover:text-white md:py-2 md:text-lg">
                        <span>234 jobs available</span>
                        <ArrowRight className="transition-colors duration-200 group-hover:text-white" />
                    </p>
                </section>
            </Link>
        </article>
    )
}
