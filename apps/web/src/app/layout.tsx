import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Brain, Gauge, Home, Layers3, Library, RotateCcw } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "SaaS School",
  description: "Learn the stack. Ship the product."
};

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/advisor", label: "Advisor", icon: Brain },
  { href: "/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/review", label: "Review", icon: RotateCcw },
  { href: "/sources", label: "Sources", icon: Library }
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-frame">
          <aside className="sidebar" aria-label="Primary navigation">
            <Link className="brand" href="/">
              <span className="brand-mark"><Layers3 size={22} /></span>
              <span>
                <strong>SaaS School</strong>
                <small>Learn the stack</small>
              </span>
            </Link>
            <nav className="nav-list">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} className="nav-link">
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
          <div className="main-column">
            <header className="topbar">
              <Link className="mobile-brand" href="/">
                <Layers3 size={20} />
                <span>SaaS School</span>
              </Link>
              <Link className="topbar-action" href="/advisor">Get my path</Link>
            </header>
            <main>{children}</main>
          </div>
          <nav className="bottom-nav" aria-label="Mobile navigation">
            {navItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="bottom-link">
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </body>
    </html>
  );
}
