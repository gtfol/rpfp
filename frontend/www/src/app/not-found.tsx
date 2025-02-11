"use client";

import React from "react";
import { Home } from "lucide-react";
import Link from "next/link";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar isFixed={false} shouldAnimate={false} />

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">
            Sorry, the page you're looking for can't be found
          </h1>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-white hover:bg-white/90 text-black px-6 py-3 rounded-full transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="select-none">Return Home</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
