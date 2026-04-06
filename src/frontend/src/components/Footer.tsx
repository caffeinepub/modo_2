import { Input } from "@/components/ui/input";
import { Heart } from "lucide-react";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
  { label: "Shipping", href: "#shipping" },
  { label: "Privacy", href: "#privacy" },
  { label: "Returns", href: "#returns" },
];

const socialLinks = [
  { icon: SiInstagram, label: "Instagram", href: "#" },
  { icon: SiX, label: "X (Twitter)", href: "#" },
  { icon: SiYoutube, label: "YouTube", href: "#" },
  { icon: SiFacebook, label: "Facebook", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer
      className="mt-16 border-t border-border"
      style={{ background: "oklch(0.072 0 0)" }}
    >
      <div className="mx-auto max-w-screen-2xl px-6 py-12 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand + Links */}
          <div>
            <p className="mb-4 font-display text-xl font-extrabold tracking-[0.2em] text-foreground">
              MODO
            </p>
            <p className="mb-5 text-xs leading-relaxed text-muted-foreground">
              Premium menswear and tech gadgets for the modern man. Curated by
              Yash Jaiswal.
            </p>
            <nav className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  data-ocid="footer.link"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="flex flex-col items-start gap-4 md:items-center">
            <p className="font-display text-xs font-bold uppercase tracking-widest text-foreground">
              Follow Us
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  data-ocid="footer.link"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div id="about">
            <p className="mb-1 font-display text-sm font-extrabold uppercase tracking-[0.15em] text-foreground">
              Join the Inner Circle
            </p>
            <p className="mb-4 text-xs text-muted-foreground">
              Exclusive drops, early access, and style guides — straight to your
              inbox.
            </p>
            {submitted ? (
              <p
                className="rounded-md border border-border bg-muted px-4 py-2 text-xs text-foreground"
                data-ocid="newsletter.success_state"
              >
                You're in! Welcome to the inner circle.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex gap-2"
                data-ocid="newsletter.panel"
              >
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-9 flex-1 border-border bg-muted text-xs text-foreground placeholder:text-muted-foreground focus-visible:ring-foreground/20"
                  data-ocid="newsletter.input"
                  required
                />
                <button
                  type="submit"
                  className="h-9 rounded-md bg-foreground px-4 text-xs font-bold text-background transition-colors hover:bg-foreground/90"
                  data-ocid="newsletter.submit_button"
                >
                  Sign Up
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-center text-xs text-muted-foreground">
            © {year} MODO. Designed by Yash Jaiswal. Built by Yash{" "}
            <Heart className="inline h-3 w-3 fill-red-500 text-red-500" />{" "}
            JAISWAL
          </p>
          <p className="text-xs text-muted-foreground">
            Built with love using{" "}
            <a
              href={utm}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
