"use client";
import Image from "next/image";

export default function ProductBanner() {
  return (
    <div
      className="
        relative z-50 mt-6
        w-full max-w-sm sm:max-w-7xl
        mx-auto px-4 sm:px-6
        overflow-hidden rounded-2xl
        bg-gradient-to-r from-[#171717] via-[#1b1b1b] to-[#171717]
        ring-1 ring-slate-800/70
      "
    >
      {/* subtle orange wash */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-orange-400/10 pointer-events-none" />

      <div className="relative grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] items-center gap-6 py-8 md:py-10 text-slate-200">
        {/* Left copy */}
        <div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
            Genesis Launches
          </h2>
          <p className="mt-3 md:mt-4 text-sm md:text-base leading-7 text-slate-300 font-mono">
            Join the launch of next-gen AI products at a starting{" "}
            <span className="font-semibold">$kARNX</span>. All early
            participants get equal access through{" "}
            <span className="font-semibold text-orange-400 px-1">
              Genesis Point
            </span>{" "}
            pledges. Token allocations are decided in a 24-hour point auction.
            If the goal isn’t met, no tokens will be issued and all{" "}
            <span className="font-semibold">$karnX</span> and points will be
            returned in full.
          </p>
        </div>

        {/* Right visual + tagline */}
        <div className="relative flex items-center justify-end">
          <div className="relative h-28 w-28 md:h-36 md:w-36 mr-4">
            <Image
              src="/product-banner.png"
              alt="Genesis Points cube"
              fill
              className="object-contain drop-shadow-[0_10px_30px_rgba(251,146,60,0.45)]"
            />
          </div>
          <div className="mr-2">
            <p className="text-right font-extrabold text-xl md:text-3xl text-slate-100 leading-snug">
              Fair launch
              <br />
              for all Genesis holders
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
