"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "@/lib/useForm"
import { z } from "zod"
import Link from "next/link"
import Image from "next/image"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { authApi } from "@/lib/api/features/auth"
import { setAccessToken } from "@/lib/auth/token-store"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const form = useForm<RegisterFormValues>(registerSchema);

  const registerMutation = useMutation({
    mutationFn: authApi.createAccount,
    onSuccess: (response) => {
      if (response.data?.token) {
        setAccessToken(response.data.token);
      }
      toast.success(response.message || "Account created successfully!");
      router.push("/dashboard");
      router.refresh();
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data: RegisterFormValues) => {

    registerMutation.mutate({
      name: data.name,
      email: data.email,
      password: data.password,
    });
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
          <div className="grid gap-2">
            <span className="text-sm text-brand-neutrals-80 font-medium">Name</span>
            <Input
              type="text"
              {...form.register("name")}
              placeholder="Your full name"
              disabled={registerMutation.isPending}
              className={form.formState.errors.name ? "border-destructive" : ""}
            />
            {form.formState.errors.name?.message && (
              <span className="text-xs text-destructive">{form.formState.errors.name.message}</span>
            )}
          </div>

          <div className="grid gap-2">
            <span className="text-sm text-brand-neutrals-80 font-medium">Email</span>
            <Input
              type="email"
              {...form.register("email")}
              placeholder="you@example.com"
              disabled={registerMutation.isPending}
              className={form.formState.errors.email ? "border-destructive" : ""}
            />
            {form.formState.errors.email?.message && (
              <span className="text-xs text-destructive">{form.formState.errors.email.message}</span>
            )}
          </div>

          <div className="grid gap-2">
            <span className="text-sm text-brand-neutrals-80 font-medium">Password</span>
            <Input
              type="password"
              {...form.register("password")}
              placeholder="Create a password"
              disabled={registerMutation.isPending}
              className={form.formState.errors.password ? "border-destructive" : ""}
            />
            {form.formState.errors.password?.message && (
              <span className="text-xs text-destructive">{form.formState.errors.password.message}</span>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        <p className="text-center text-brand-neutrals-80">
          Already have an account? <Link href="/login" className="text-primary font-semibold hover:underline">Login</Link>
        </p>
      </section>
    </main>
  )
}