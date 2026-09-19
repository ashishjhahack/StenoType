"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
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

const NAV_LINKS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Practice Tests",
    href: "/practice",
  },
  {
    label: "About",
    href: "/about",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  // Prevent hydration mismatch with next-themes
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check whether a navigation link is active
  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            LEFT - LOGO
        ====================================================== */}

        <Link
          href="/"
          className="flex items-center gap-2 font-semibold"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Keyboard className="h-5 w-5" />
          </div>

          <span className="text-lg tracking-tight">
            StenoType
          </span>
        </Link>

        {/* =====================================================
            CENTER - DESKTOP NAVIGATION
        ====================================================== */}

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = isLinkActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg p-1.5 text-md font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* =====================================================
            RIGHT - THEME + LOGIN / PROFILE
        ====================================================== */}

        <div className="hidden items-center gap-3 md:flex">

          {/* THEME TOGGLE */}

          <button
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border transition-colors hover:bg-muted"
            aria-label="Toggle theme"
          >
            {!mounted ? (
              <div className="h-4 w-4" />
            ) : theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* LOGIN */}

          {!isLoggedIn ? (
            <button
              onClick={() => setIsLoggedIn(true)}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Login
            </button>
          ) : (

            /* PROFILE */

            <div className="relative">

              <button
                onClick={() =>
                  setIsProfileOpen(!isProfileOpen)
                }
                className="flex items-center gap-2 rounded-full border border-border p-1 pr-3 transition-colors hover:bg-muted"
              >
                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-muted">
                  <User className="h-4 w-4" />
                </div>

                <span className="text-sm font-medium">
                  Profile
                </span>
              </button>

              {/* PROFILE DROPDOWN */}

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-background p-1 shadow-lg">

                  {/* DASHBOARD */}

                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted"
                    onClick={() =>
                      setIsProfileOpen(false)
                    }
                  >
                    <LayoutDashboard className="h-4 w-4" />

                    Dashboard
                  </Link>

                  {/* LOGOUT */}

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

        {/* =====================================================
            MOBILE MENU BUTTON
        ====================================================== */}

        <div className="flex items-center gap-2 md:hidden">

          {/* MOBILE THEME TOGGLE */}

          <button
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border transition-colors hover:bg-muted"
            aria-label="Toggle theme"
          >
            {!mounted ? (
              <div className="h-4 w-4" />
            ) : theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* MENU BUTTON */}

          <button
            onClick={() =>
              setIsMenuOpen(!isMenuOpen)
            }
            className="rounded-md p-2 hover:bg-muted"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

        </div>
      </nav>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      {isMenuOpen && (
        <div className="border-t border-border md:hidden">

          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">

            {/* NAVIGATION LINKS */}

            {NAV_LINKS.map((link) => {
              const isActive = isLinkActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="my-2 border-t border-border" />

            {/* MOBILE LOGIN / PROFILE */}

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
                {/* DASHBOARD */}

                <Link
                  href="/dashboard"
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
                >
                  <LayoutDashboard className="h-4 w-4" />

                  Dashboard
                </Link>

                {/* LOGOUT */}

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