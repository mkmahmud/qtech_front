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

            <main className="mx-auto w-full  ">
                {children}
            </main>

            <Footer />
        </div>
    )
}
