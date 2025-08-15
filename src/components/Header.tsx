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
    <header className="md:bg-[#171717] md:px-6 py-2 md:py-3 z-50  relative shadow-sm sm:max-w-7xl mt-6 mx-6 sm:mx-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/appLogo.svg"
              alt="Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </Link>
        </div>
        <nav className="hidden md:flex space-x-6 text-sm font-mono">
          {navLinks.map(({ name, href }) => (
            <div key={href} className="relative flex flex-col items-center">
              <Link
                href={href}
                className={`transition-colors font-mono text-xs ${pathname === href ? "text-white" : "text-white"} hover:text-white`}
              >
                {name}
              </Link>
              {pathname === href && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-black rounded"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </div>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <CustomConnectButton />
        </div>
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-black"
        >
          <Menu className="text-white" size={24} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#171717] shadow-md p-6 md:hidden"
          >
            <div className="flex justify-between items-center mb-6">
              <Image src="/appLogo.svg" alt="Logo" width={60} height={60} />
              <button onClick={() => setMenuOpen(false)} className="text-black">
                <X size={28} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col space-y-4 text-sm font-mono">
              {navLinks.map(({ name, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`transition-colors ${pathname === href ? "text-black" : "text-gray-600"} hover:text-black`}
                >
                  {name}
                </Link>
              ))}
            </nav>

            {/* Bottom Actions */}
            {/* <div className="mt-10 flex flex-col gap-4">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle size={20} className="text-black cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <span className="text-xs">Question</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <CustomConnectButton />
            </div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
