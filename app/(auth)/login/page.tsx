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
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

// Extract the type from the schema
type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<LoginFormValues>(loginSchema);

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      toast.success(response.message || "Login successful!");
      router.push("/dashboard");
      router.refresh();
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Unable to login. Please try again.";
      toast.error(errorMessage);
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    loginMutation.mutate(data);
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
        <h1 className="font-heading text-3xl font-bold text-brand-neutrals-100">Login</h1>

        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <span className="text-sm text-brand-neutrals-80 font-medium">Email</span>
            <Input
              type="email"
              {...form.register("email")}
              placeholder="you@example.com"
              disabled={loginMutation.isPending}
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
              placeholder="Your password"
              disabled={loginMutation.isPending}
              className={form.formState.errors.password ? "border-destructive" : ""}
            />
            {form.formState.errors.password?.message && (
              <span className="text-xs text-destructive">{form.formState.errors.password.message}</span>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </form>

        <p className="text-center text-brand-neutrals-80">
          No account? <Link href="/register" className="text-primary font-semibold hover:underline">Create one</Link>
        </p>
      </section>
    </main>
  )
}