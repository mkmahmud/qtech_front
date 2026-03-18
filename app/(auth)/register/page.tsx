"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "@/lib/useForm"
import { z } from "zod"
import Link from "next/link"
import Image from "next/image"

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

export default function RegisterPage() {
  const form = useForm(registerSchema)

  // Handle submit
  const onSubmit = (data: any) => {
    console.log("Registration data:", data)
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[480px] items-center px-4 py-8">

      <section className="w-full space-y-6 border border-brand-neutrals-20 bg-white p-6 rounded-md shadow-md">
        <Link href="/" className="flex items-center justify-center gap-2 py-6">
          <Image src="/logo.png" alt="QuickHire logo" width={36} height={36} priority />
          <span className="font-red-hat-display text-2xl font-bold text-brand-neutrals-100">
            QuickHire
          </span>
        </Link>
        <h1 className="font-heading text-3xl font-bold text-brand-neutrals-100">Register</h1>

        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <label className="grid gap-2">
            <span className="text-sm text-brand-neutrals-80">Name</span>
            <Input
              type="text"
              {...form.register("name")}
              placeholder="Your name"
              className={form.formState.errors.name ? "border-destructive" : ""}
            />
            {form.formState.errors.name && typeof form.formState.errors.name.message === "string" && (
              <span className="text-xs text-destructive">{form.formState.errors.name.message}</span>
            )}
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-brand-neutrals-80">Email</span>
            <Input
              type="email"
              {...form.register("email")}
              placeholder="you@example.com"
              className={form.formState.errors.email ? "border-destructive" : ""}
            />
            {form.formState.errors.email && typeof form.formState.errors.email.message === "string" && (
              <span className="text-xs text-destructive">{form.formState.errors.email.message}</span>
            )}
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-brand-neutrals-80">Password</span>
            <Input
              type="password"
              {...form.register("password")}
              placeholder="Create a password"
              className={form.formState.errors.password ? "border-destructive" : ""}
            />
            {form.formState.errors.password && typeof form.formState.errors.password.message === "string" && (
              <span className="text-xs text-destructive">{form.formState.errors.password.message}</span>
            )}
          </label>

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>

        <p className="text-center text-brand-neutrals-80">
          Already have an account? <Link href="/login" className="text-primary">Login</Link>
        </p>
      </section>
    </main>
  )
}
