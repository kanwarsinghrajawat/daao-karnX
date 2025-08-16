"use client";

import Image from "next/image";
import { Flame, Lock } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

type TrendingItem = {
  id: string;
  name: string;
  slug: string;
  subtitle?: string;
  avatar: string;
  tag?: { label: string; type?: "lock" | "dyor" | "custom" };
  price: string;
  changePct: number;
};

type Spotlight = {
  name: string;
  avatar: string;
  badge?: string;
  fdv: string;
  fdvChangePct: number;
  category: string;
  transactions: number;
  interactedWith?: string[];
  description: string;
};

type Props = {
  trending: TrendingItem[];
  spotlight: Spotlight;
  carousel?: React.ReactNode;
};

const ProductShowcase: React.FC<Props> = ({
  trending,
  spotlight,
  carousel,
}) => {
  const router = useRouter();
  const handleRowClick = (slug: string) => {
    router.push(`/project/${slug}`);
  };

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[30%_30%_1fr]">
      {/* Trending */}
      <section className="bg-[#141414] rounded-2xl ring-1 ring-slate-800/70 p-4 text-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="h-4 w-4 text-slate-300" />
          <h2 className="text-base font-semibold">Trending</h2>
        </div>

        <div className="space-y-3">
          {trending.map((item) => (
            <div
              key={item.id}
              className="flex cursor-pointer items-center justify-between bg-[#1b1b1b] hover:bg-[#242424] transition-colors rounded-xl ring-1 ring-slate-800/70 px-3 py-2"
              onClick={() => handleRowClick(item.slug)}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={36}
                  height={36}
                  className="rounded-full ring-1 ring-slate-700"
                />

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold truncate">{item.name}</span>
                    {item.tag &&
                      (item.tag.type === "lock" ? (
                        <span className="inline-flex items-center gap-1 text-emerald-300 bg-emerald-900/20 px-2 py-0.5 rounded-md text-[11px]">
                          <Lock className="h-3 w-3" /> {item.tag.label}
                        </span>
                      ) : (
                        <span className="text-slate-300 bg-[#2a2a2a] px-2 py-0.5 rounded-md text-[11px]">
                          {item.tag.label}
                        </span>
                      ))}
                  </div>
                  {item.subtitle && (
                    <div className="text-xs text-slate-400 truncate">
                      {item.subtitle}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-right">
                <div className="font-mono">{item.price}</div>
                <div
                  className={`font-mono text-sm ${
                    item.changePct >= 0 ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {item.changePct >= 0 ? "+" : ""}
                  {item.changePct.toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spotlight */}
      <section
        className="relative overflow-hidden rounded-2xl
  bg-[#141414] ring-1 ring-slate-800/70 p-6 text-slate-200
  shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
      >
        {/* soft orange vignette + bottom fade */}
        <div
          className="pointer-events-none absolute inset-0
    bg-[radial-gradient(1200px_400px_at_80%_-10%,rgba(251,146,60,0.08),transparent)]
  "
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28
    bg-gradient-to-t from-[#141414] to-transparent"
        />

        {/* header row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Image
              src={spotlight.avatar}
              alt={spotlight.name}
              width={64}
              height={64}
              className="rounded-xl ring-1 ring-slate-700/70"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-semibold tracking-tight truncate">
                  {spotlight.name}
                </h3>
                {spotlight.badge && (
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md
              bg-[#1a1a1a] ring-1 ring-slate-800/70 text-[11px] text-slate-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400/80" />{" "}
                    {spotlight.badge}
                  </span>
                )}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wide text-slate-400">
                {spotlight.category}
              </div>
            </div>
          </div>

          {/* FDV chip stack */}
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-wide text-slate-400">
              FDV
            </div>
            <div className="font-mono text-lg text-slate-100">
              {spotlight.fdv}
            </div>
            <div
              className={[
                "font-mono text-sm",
                spotlight.fdvChangePct >= 0
                  ? "text-emerald-400"
                  : "text-red-400",
              ].join(" ")}
            >
              {spotlight.fdvChangePct >= 0 ? "+" : ""}
              {spotlight.fdvChangePct.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* body */}
        <div className="mt-6 space-y-4">
          {/* transactions */}
          <div className="flex items-center justify-between">
            <div className="text-[12px] uppercase tracking-wide text-slate-400">
              Transactions
            </div>
            <div className="font-mono text-3xl font-semibold text-slate-100">
              {spotlight.transactions.toLocaleString()}
            </div>
          </div>

          {/* divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800/70 to-transparent" />

          {/* interacted with */}
          <div>
            <div className="text-sm text-slate-400 mb-1">Interacted with</div>
            <div className="text-slate-300 font-mono text-[13px]">
              {spotlight.interactedWith?.length
                ? spotlight.interactedWith.join(", ")
                : "—"}
            </div>
          </div>

          {/* description */}
          <div>
            <div className="text-sm text-slate-400 mb-1">Description</div>
            <p className="text-slate-300/90 leading-6 line-clamp-3">
              {spotlight.description}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl p-0 overflow-hidden">
        {carousel ?? (
          <div className="h-full min-h-[420px] flex items-center justify-center text-slate-400"></div>
        )}
      </section>
    </div>
  );
};

export default ProductShowcase;
