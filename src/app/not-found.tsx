"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#212121] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Main Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-orange-400/5 rounded-full blur-2xl"></div>
          </div>

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <Image
              src="/robo-logo.png"
              alt="Dao KarnX AI"
              width={80}
              height={80}
              className="mx-auto h-20 w-auto object-contain opacity-80"
            />
          </motion.div>

          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.4,
              duration: 0.6,
              type: "spring",
              stiffness: 100,
            }}
            className="mb-6"
          >
            <h1 className="text-8xl md:text-9xl font-bold font-mono bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              404
            </h1>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-medium text-white mb-4">
              Page Not Found
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-md mx-auto">
              The page you are looking for does not exist or has been moved to
              another dimension.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/"
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-medium rounded-xl hover:from-orange-500 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-orange-500/25"
            >
              <Home
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              Go Home
            </Link>

            <Link
              href="/liveProjects"
              className="group flex items-center gap-2 px-6 py-3 bg-[#141414] text-slate-200 font-medium rounded-xl border border-slate-800/70 hover:bg-[#1b1b1b] hover:border-orange-400/50 transition-all duration-300"
            >
              <Search
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              Explore Projects
            </Link>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12 flex justify-center"
          >
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 1.2 + i * 0.1,
                    duration: 0.3,
                    type: "spring",
                  }}
                  className="w-2 h-2 bg-orange-400/60 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-16 text-slate-500 text-sm"
        >
          <p>
            If you believe this is an error, please contact our support team.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
