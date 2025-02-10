"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronLeft, Lock } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const supabase = createClient();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setEmailError(null);

    try {
      const formData: ForgotPasswordFormData = { email };
      const result = forgotPasswordSchema.safeParse(formData);

      if (!result.success) {
        const errors = result.error.errors;
        errors.forEach((error) => {
          if (error.path[0] === "email") {
            setEmailError(error.message);
            emailRef.current?.focus();
          }
        });
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setEmailError(error.message);
      } else {
        router.push("/login");
        toast.success(
          "Check your email for the reset password link. The link will expire in 1 hour.",
        );
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-orange-50 min-h-screen text-black">
      <div className="my-auto px-6 py-4">
        <Link
          href="/login"
          className="inline-flex h-8 items-center text-sm text-zinc-600 transition-colors hover:text-zinc-800"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Login
        </Link>
      </div>

      <div className="mx-auto max-w-md p-32 px-4">
        <div className="mb-4 flex justify-center">
          <Link href="/" className="h-10 w-10">
            <img
              src="/icon.png"
              alt="Remove People from Photos"
              className="h-10 w-10"
            />
          </Link>
        </div>

        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold">Forgot your password?</h1>
          <p className="text-zinc-600">
            Enter the email address associated with your account and we'll send
            you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm text-zinc-600">
              Email
            </label>
            <input
              id="email"
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                "w-full rounded-lg border bg-[#f9f9f9] px-3 py-2 outline-none transition-colors placeholder:text-zinc-400 focus:ring-1",
                emailError
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-zinc-200 focus:border-zinc-300 focus:ring-primary",
              )}
              placeholder="michael@dundermiflin.com"
            />
            {emailError && (
              <p className="text-red-500 mt-1 text-sm">{emailError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="flex w-full items-center justify-center rounded-lg bg-primary py-2 font-medium text-white transition-colors hover:brightness-110 disabled:opacity-50"
          >
            {loading ? (
              "Sending..."
            ) : (
              <>
                Send reset email
                <ArrowRight className="ml-1 h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
