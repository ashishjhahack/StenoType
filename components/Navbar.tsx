"use client"; // This directive indicates that the component should be rendered on the client side, allowing for interactivity and state management.

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Keyboard,
  User,
  LayoutDashboard,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LEFT - LOGO */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Keyboard className="h-5 w-5" />
          </div>

          <span className="text-lg tracking-tight">StenoType</span>
        </Link>

        {/* CENTER - DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-md font-medium text-muted-foreground rounded-lg p-1.5 transition-colors hover:text-foreground hover:bg-primary/10"
          >
            Home
          </Link>

          <Link
            href="/practice"
            className="text-md font-medium text-muted-foreground rounded-lg p-1.5 transition-colors hover:text-foreground hover:bg-primary/10"
          >
            Practice Tests
          </Link>

          <Link
            href="/about"
            className="text-md font-medium text-muted-foreground rounded-lg p-1.5 transition-colors hover:text-foreground hover:bg-primary/10"
          >
            About
          </Link>
        </div>

        {/* RIGHT - LOGIN / PROFILE */}
        <div className="hidden items-center md:flex">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-lg border transition-colors hover:bg-muted"
            aria-label="Toggle theme"
          >
            {mounted ? (
              theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )
            ) : (
              <div className="h-4 w-4" />
            )}
          </button>
          {!isLoggedIn ? (
            <button
              onClick={() => setIsLoggedIn(true)}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 rounded-full border p-1 pr-3 transition-colors hover:bg-muted"
              >
                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-muted">
                  <User className="h-4 w-4" />
                </div>

                <span className="text-sm font-medium">Profile</span>
              </button>

              {/* PROFILE DROPDOWN */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border bg-background p-1 shadow-lg">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      setIsProfileOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-muted"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-md p-2 hover:bg-muted md:hidden"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="border-t md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
            >
              Home
            </Link>

            <Link
              href="/practice"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
            >
              Practice
            </Link>

            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
            >
              About
            </Link>

            <div className="my-2 border-t" />

            {!isLoggedIn ? (
              <button
                onClick={() => {
                  setIsLoggedIn(true);
                  setIsMenuOpen(false);
                }}
                className="rounded-lg bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground"
              >
                Login
              </button>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>

                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-muted"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}