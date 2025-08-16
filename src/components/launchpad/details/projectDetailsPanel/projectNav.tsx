"use client";

import Link from "next/link";
import clsx from "clsx";

const navLinks = [
  { key: "team", label: "The Team", href: "#team" },
  { key: "status", label: "Status", href: "#status" },
  { key: "details", label: "Project Details", href: "#projectdetails" },
];

export default function ProjectNav() {
  const activeHash = typeof window !== "undefined" ? window.location.hash : "";

  return (
    <nav className="w-full overflow-x-auto no-scrollbar my-6">
      <ul className="flex items-center gap-6">
        {navLinks.map((link) => {
          const isActive = activeHash === link.href;
          return (
            <li key={link.key}>
              <Link
                href={link.href}
                scroll={true}
                className={clsx(
                  "py-2 pr-8 rounded-full font-mono text-sm whitespace-nowrap transition-colors",
                  isActive
                    ? "bg-[#112229] text-cyan-300"
                    : "text-slate-500 hover:text-slate-300"
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
