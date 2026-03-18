"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/hooks/use-auth"

export default function Nav() {

    // USer
    const { isLoggedIn, user, logout } = useAuth()

    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50   ">
            <div className="mx-auto flex w-full items-center justify-between px-4 py-4 sm:px-6">
                <div className="flex space-x-4">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/logo.png" alt="QuickHire logo" width={36} height={36} priority />
                        <span className="font-red-hat-display text-2xl font-bold text-brand-neutrals-100">
                            QuickHire
                        </span>
                    </Link>

                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList className="gap-8">
                            <NavigationMenuItem>
                                <Link href="/jobs/1" className="text-base text-brand-neutrals-80 transition-colors hover:text-brand-neutrals-100">
                                    Find Jobs
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/" className="text-base text-brand-neutrals-80 transition-colors hover:text-brand-neutrals-100">
                                    Browse Companies
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="hidden items-center md:flex">
                    {!isLoggedIn ? (
                        <>
                            <Link href="/login" className={cn(buttonVariants({ variant: "ghost" }), " text-primary font-bold")}>
                                Login
                            </Link>
                            <div className="mx-3 h-8 w-px bg-brand-neutrals-20" aria-hidden="true" />
                            <Link
                                href="/register"
                                className={cn(buttonVariants({ variant: "default" }), "h-12 rounded-none    ")}
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link
                                href="/dashboard"
                                className={cn(buttonVariants({ variant: "default" }), "h-12 rounded-none    ")}
                            >
                                Dashboard
                            </Link>
                            <Button
                                onClick={logout}
                                variant="destructive"
                            >
                                Logout
                            </Button>
                        </div>
                    )}
                </div>

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger
                        render={
                            <button
                                type="button"
                                className="grid size-9 place-items-center rounded-full border border-brand-neutrals-20 text-brand-neutrals-80 md:hidden"
                                aria-label="Open menu"
                            />
                        }
                    >
                        <Menu className="size-4" />
                    </SheetTrigger>

                    <SheetContent side="right" showCloseButton={false} className="w-[86%] max-w-xs border-l border-brand-neutrals-20 bg-white p-0">
                        <div className="flex items-center justify-between border-b border-brand-neutrals-20 px-4 py-4">
                            <span className="font-red-hat-display text-xl font-bold text-brand-neutrals-100">
                                Menus
                            </span>
                            <SheetClose
                                render={
                                    <button
                                        type="button"
                                        className="grid size-8 place-items-center rounded-full border border-brand-neutrals-20 text-brand-neutrals-80"
                                        aria-label="Close menu"
                                    />
                                }
                            >
                                <X className="size-4" />
                            </SheetClose>
                        </div>

                        <nav className="flex flex-col gap-1 p-4">
                            <Link
                                href="/jobs/1"
                                className="py-2 text-base text-brand-neutrals-100"
                                onClick={() => setIsOpen(false)}
                            >
                                Find Jobs
                            </Link>
                            <Link
                                href="/"
                                className="py-2 text-base text-brand-neutrals-100"
                                onClick={() => setIsOpen(false)}
                            >
                                Browse Companies
                            </Link>

                            <div className="mt-3 flex items-center gap-2">
                                {
                                    !isLoggedIn ? <> <div className="w-full ">
                                        <Link
                                            href="/login"
                                            className={cn(buttonVariants({ variant: "ghost" }), "  w-full font-bold")}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Login
                                        </Link>
                                    </div>
                                        <div className="mx-3 h-8 w-px bg-brand-neutrals-20" aria-hidden="true" />

                                        <div className='w-full'>

                                            <Link
                                                href="/register"
                                                className={cn(buttonVariants({ variant: "default" }), " f-wull")}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Sign Up
                                            </Link>
                                        </div></> : <div className="flex items-center gap-4">
                                        <Link
                                            href="/dashboard"
                                            className={cn(buttonVariants({ variant: "default" }), "h-12 rounded-none    ")}
                                        >
                                            Dashboard
                                        </Link>
                                        <Button
                                            onClick={logout}
                                            variant="destructive"
                                        >
                                            Logout
                                        </Button>
                                    </div>
                                }
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}
