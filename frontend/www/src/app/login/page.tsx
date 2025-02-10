"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronLeft } from "lucide-react";
import Google from "@/assets/icons/socials/google";
import { z } from "zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const supabase = createClient();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setEmailError(null);
    setPasswordError(null);

    try {
      const formData: LoginFormData = { email, password };
      const result = loginSchema.safeParse(formData);
      if (!result.success) {
        const error = result.error.errors[0];
        if (error.path[0] === "email") {
          setEmailError(error.message);
          emailRef.current?.focus();
        } else if (error.path[0] === "password") {
          setPasswordError(error.message);
          passwordRef.current?.focus();
        }
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.toLowerCase().includes("email")) {
          setEmailError(error.message);
          emailRef.current?.focus();
        } else if (error.message.toLowerCase().includes("password")) {
          setPasswordError(error.message);
          passwordRef.current?.focus();
        } else {
          toast.error(error.message);
        }
      } else {
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-orange-50 min-h-screen text-black">
      <div className="my-auto px-6 py-4">
        <Link
          href="/"
          className="inline-flex h-8 items-center text-sm text-zinc-600 transition-colors hover:text-zinc-800"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Home
        </Link>
      </div>

      <div className="mx-auto max-w-md px-4 pb-32 pt-16">
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
          <h1 className="mb-2 text-2xl font-bold">
            Log in to Remove People from Photos
          </h1>
          <p className="text-zinc-600">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-primary underline hover:text-primary/90"
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className="space-y-4 text-zinc-700">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <button
              onClick={handleGoogleSignIn}
              className="group flex w-full items-center justify-center space-x-2 rounded-lg border border-zinc-200 bg-[#f9f9f9] px-3 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              <Google className="h-4 w-4 fill-black transition-colors group-hover:fill-primary" />
              <span>Continue with Google</span>
            </button>
          </div>
        </div>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-orange-50 px-2 text-zinc-600">or</span>
          </div>
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
              tabIndex={1}
            />
            {emailError && (
              <p className="text-red-500 mt-1 text-sm">{emailError}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="password" className="block text-sm text-zinc-600">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-zinc-500 hover:brightness-110"
                tabIndex={4}
              >
                Forgot your password?
              </Link>
            </div>
            <input
              id="password"
              ref={passwordRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(
                "w-full rounded-lg border bg-[#f9f9f9] px-3 py-2 outline-none transition-colors focus:ring-1",
                passwordError
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-zinc-200 focus:border-zinc-300 focus:ring-primary",
              )}
              tabIndex={2}
            />
            {passwordError && (
              <p className="text-red-500 mt-1 text-sm">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading || !email}
            className="flex w-full items-center justify-center rounded-lg bg-primary py-2 font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
            tabIndex={3}
          >
            {loading ? (
              "Logging in..."
            ) : (
              <>
                Continue
                <ArrowRight className="ml-1 h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-zinc-600">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-primary hover:brightness-110">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:brightness-110">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
