import Link from "next/link";
import { Keyboard} from "lucide-react";
import {
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

const SOCIAL_LINKS = [
  {
    name: "Twitter",
    href: "https://twitter.com/stenotype",
    icon: FaTwitter,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/stenotype",
    icon: FaInstagram,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@stenotype",
    icon: FaYoutube,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/stenotype",
    icon: FaLinkedinIn,
  },
];

const PRODUCT_LINKS = [
  { label: "Practice Tests", href: "/practice" },
  { label: "Dictation", href: "/dictation" },
  { label: "My Progress", href: "/progress" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* BRAND */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Keyboard className="h-5 w-5" />
              </div>
              <span className="text-lg tracking-tight text-foreground">
                StenoType
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A calm, dark workspace for practising shorthand dictation and
              transcription typing — built for steno aspirants.
            </p>

            {/* SOCIAL LINKS */}
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* PRODUCT LINKS */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">Product</h4>
            <ul className="mt-4 space-y-3">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY LINKS */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">Company</h4>
            <ul className="mt-4 space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} StenoType. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}