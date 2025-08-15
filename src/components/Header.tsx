"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/constants/navbar";
import { motion, AnimatePresence } from "framer-motion";
import { CustomConnectButton } from "./CustomConnectButton";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-50 mt-6 max-w-sm mx-auto sm:max-w-7xl">
      <div className="rounded-2xl bg-[#141414] ring-1 ring-slate-800/70 shadow-sm px-4 md:px-6 py-3">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          {/* logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/robo-logo.png"
              alt="Logo"
              width={140}
              height={140}
              className="h-16 w-auto object-contain"
            />
          </Link>

          <div className="flex gap-8 items-center ">
            <nav className="hidden md:flex items-center gap-6 text-sm font-mono">
              {navLinks.map(({ name, href }) => {
                const active = pathname === href;
                return (
                  <div
                    key={href}
                    className="relative flex flex-col items-center"
                  >
                    <Link
                      href={href}
                      className={[
                        "transition-colors",
                        active
                          ? "text-slate-100"
                          : "text-slate-300 hover:text-slate-100",
                      ].join(" ")}
                      target="_blank"
                    >
                      {name}
                    </Link>
                    {active && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] rounded bg-orange-400/80"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </nav>

            {/* desktop actions */}
            <div className="hidden md:flex items-center gap-3">
              <CustomConnectButton />
            </div>
          </div>
          {/* desktop nav */}

          {/* mobile menu button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden grid place-items-center rounded-lg p-2 ring-1 ring-slate-800/70 text-slate-200 hover:bg-[#1b1b1b] transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            {/* dim backdrop */}
            <button
              aria-label="Close menu backdrop"
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-black/50"
            />

            {/* panel */}
            <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-[#141414] ring-1 ring-slate-800/70 shadow-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <Image src="/appLogo.svg" alt="Logo" width={60} height={60} />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="grid place-items-center rounded-lg p-2 ring-1 ring-slate-800/70 text-slate-200 hover:bg-[#1b1b1b] transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* links */}
              <nav className="flex flex-col space-y-2 text-sm font-mono">
                {navLinks.map(({ name, href }) => {
                  const active = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className={[
                        "rounded-lg px-3 py-2 transition-colors",
                        active
                          ? "bg-[#1b1b1b] text-slate-100 ring-1 ring-slate-800/70"
                          : "text-slate-300 hover:text-slate-100 hover:bg-[#1a1a1a]",
                      ].join(" ")}
                      target="_blank"
                    >
                      {name}
                    </Link>
                  );
                })}
              </nav>

              {/* actions */}
              <div className="mt-6">
                <CustomConnectButton />
              </div>

              {/* subtle orange accent line at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-orange-400/60 to-transparent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
