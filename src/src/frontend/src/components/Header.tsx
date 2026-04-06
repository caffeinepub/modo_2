import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const navLinks = [
  { label: "SHOP", href: "#shop" },
  { label: "COLLECTIONS", href: "#collections" },
  { label: "GADGETS", href: "#gadgets" },
  { label: "LOOKBOOK", href: "#lookbook" },
  { label: "ABOUT", href: "#about" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border"
      style={{ background: "oklch(0.072 0 0)" }}
    >
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <a
          href="#shop"
          className="font-display text-2xl font-extrabold tracking-[0.2em] text-foreground"
          data-ocid="header.link"
        >
          MODO
        </a>

        {/* Desktop Nav */}
        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-semibold tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              data-ocid="header.link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Search"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
            data-ocid="header.button"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Account"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
            data-ocid="header.button"
          >
            <User className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Cart"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
            data-ocid="header.button"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Toggle menu"
            className="ml-1 rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            data-ocid="header.toggle"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border bg-background lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-sm font-semibold tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                  data-ocid="header.link"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
