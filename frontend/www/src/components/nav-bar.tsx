"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion as m } from "framer-motion";
import clsx from "clsx";
import { useAppContext } from "@/contexts/useAppContext";
import { useAuthContext } from "@/contexts/useAuthContext";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface NavItem {
  name: string;
  link: string;
}

const navItems: NavItem[] = [{ name: "Pricing", link: "/pricing" }];

interface NavBarProps {
  shouldAnimate?: boolean;
  isFixed?: boolean;
}

export const NavBar = ({
  shouldAnimate = true,
  isFixed = false,
}: NavBarProps) => {
  const { shouldLoadAnimation } = useAppContext();
  const { user, signOut } = useAuthContext();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <m.nav
        initial={
          shouldAnimate && shouldLoadAnimation ? { opacity: 0, y: -20 } : false
        }
        animate={
          shouldAnimate && shouldLoadAnimation ? { opacity: 1, y: 0 } : false
        }
        transition={{ duration: 0.2 }}
        className={clsx(
          "flex items-center justify-between p-4 px-6",
          isFixed && "bg-orange-50 fixed left-0 right-0 top-0 z-30"
        )}
      >
        <div className="flex items-center gap-x-8">
          <Link href="/" className="flex items-center gap-x-2">
            <div className="h-5 w-5">
              <img
                src="/icon.png"
                alt="Remove People from Photos"
                className="h-5 w-5"
              />
            </div>
            <p className="font-general text-base font-semibold text-primary">
              Remove People From Photos
            </p>
          </Link>
          <div className="hidden items-center gap-x-4 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className={clsx(
                  "text-sm font-medium transition",
                  pathname === item.link
                    ? "text-black"
                    : "text-zinc-600 hover:text-zinc-800"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden items-center gap-x-4 sm:flex">
          {user !== undefined && (
            <>
              {user === null && (
                <Link
                  href="/login"
                  className="text-sm font-medium text-zinc-600 transition hover:text-zinc-800"
                >
                  Log In
                </Link>
              )}

              {user === null ? (
                <Link
                  href="/signup"
                  className="flex items-center gap-x-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white"
                >
                  Sign Up
                </Link>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.user_metadata?.avatar_url} />
                      <AvatarFallback>
                        {user?.user_metadata?.full_name
                          ?.split(" ")
                          .map((n: string) => n[0])
                          .join("") || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.user_metadata?.full_name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard"
                        className="w-full cursor-pointer focus:outline-none"
                      >
                        My Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <button
                        onClick={() => signOut()}
                        className="w-full text-left cursor-pointer focus:outline-none"
                      >
                        Logout
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </>
          )}
        </div>
        <div className="ml-4 block sm:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-5 w-5 flex-col items-center justify-center"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="text-primary"
            >
              <m.rect
                width="24"
                height="2"
                rx="1"
                fill="currentColor"
                animate={{
                  y: isMenuOpen ? 11 : 8,
                  rotate: isMenuOpen ? 45 : 0,
                  transformOrigin: "center",
                }}
                transition={{ duration: 0.3 }}
              />
              <m.rect
                width="24"
                height="2"
                rx="1"
                fill="currentColor"
                animate={{
                  y: isMenuOpen ? 11 : 16,
                  rotate: isMenuOpen ? -45 : 0,
                  transformOrigin: "center",
                }}
                transition={{ duration: 0.3 }}
              />
            </svg>
          </button>
        </div>
      </m.nav>

      {/* Mobile Menu */}
      <>
        {isFixed && <div className="h-14" />}
        <m.div
          initial={{ y: -500 }}
          animate={{ y: isMenuOpen ? 0 : -1000 }}
          exit={{ y: isMenuOpen ? -500 : 500 }}
          transition={{ type: "spring", stiffness: 160, damping: 20 }}
          className="bg-orange-50 fixed inset-0 z-30 sm:hidden"
        >
          <div className="flex h-full flex-col pt-14">
            <div className="flex flex-col gap-y-8 p-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  onClick={() => setIsMenuOpen(false)}
                  className={clsx(
                    "text-base font-medium transition",
                    pathname === item.link
                      ? "text-primary"
                      : "text-zinc-600 hover:text-zinc-800"
                  )}
                >
                  {item.name}
                </Link>
              ))}

              <div className="message-list flex w-full items-center justify-between gap-6 border-t border-[#dededc] pt-6">
                {user === null ? (
                  <Link
                    href="/login"
                    className="text-base font-medium text-zinc-600 transition hover:text-zinc-800"
                  >
                    Log in
                  </Link>
                ) : (
                  <div />
                )}

                {user ? (
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center gap-x-3">
                      <Avatar>
                        <AvatarImage src={user?.user_metadata?.avatar_url} />
                        <AvatarFallback>
                          {user?.user_metadata?.full_name
                            ?.split(" ")
                            .map((n: string) => n[0])
                            .join("") || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-zinc-900">
                          {user.user_metadata?.full_name}
                        </p>
                        <p className="text-xs text-zinc-600">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-sm text-zinc-600 transition hover:text-zinc-900"
                      >
                        My Account
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          setIsMenuOpen(false);
                        }}
                        className="text-left text-sm text-zinc-600 transition hover:text-zinc-900"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                    <div className="flex items-center gap-x-1.5 rounded-lg bg-primary px-3 py-1.5 text-white">
                      <span className="text-sm font-medium">Sign Up</span>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </m.div>
      </>
    </>
  );
};
