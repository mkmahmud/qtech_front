import Nav from "@/components/shared/navbar/nav"
import Footer from "@/components/shared/footer/footer"

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex min-h-screen flex-col">
            <Nav />

            <main className="mx-auto w-full   flex-1 px-4 py-8 sm:px-6">
                {children}
            </main>

            <Footer />
        </div>
    )
}
