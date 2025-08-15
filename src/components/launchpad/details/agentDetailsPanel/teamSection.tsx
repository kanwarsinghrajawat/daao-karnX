"use client";

import Image from "next/image";
import { Github, Send, Twitter } from "lucide-react";
import clsx from "clsx";

type Socials = { twitter?: string; telegram?: string; github?: string };
type Member = {
  id: string;
  handle: string;
  role: string;
  avatar: string;
  highlight?: boolean;
  socials?: Socials;
};

type TeamSectionProps = {
  title?: string;
  subtitle?: string;
  members: Member[];
};

export default function TeamSection({
  title = "The Team",
  subtitle = "Meet the brains behind the project – their roles, experience, and vision shaping the journey.",
  members,
}: TeamSectionProps) {
  return (
    <section className="w-full max-w-7xl mx-auto py-6 sm:py-10" id="team">
      {/* header */}
      <div className="mb-4 sm:mb-6 px-3 sm:px-0">
        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-100">
          {title}
        </h2>
        <p className="mt-2 sm:mt-3 text-slate-400 font-mono text-xs sm:text-base rounded-xl sm:rounded-2xl ring-1 ring-slate-800/70 bg-[#121212]/60 p-3 sm:p-4">
          {subtitle}
        </p>
      </div>

      {/* MOBILE: compact tiles */}
      <ul className="sm:hidden space-y-3 px-3">
        {members.map((m) => (
          <TeamTile key={m.id} member={m} />
        ))}
      </ul>

      {/* DESKTOP/TABLET: cards */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6 px-3 sm:px-0">
        {members.map((m) => (
          <TeamCard key={m.id} member={m} />
        ))}
      </div>
    </section>
  );
}

/* ---------- mobile tile ---------- */
function TeamTile({ member }: { member: Member }) {
  const { handle, role, avatar, socials, highlight } = member;
  return (
    <li
      className={clsx(
        "relative flex items-center gap-3 p-3 rounded-xl",
        "bg-[#141414] ring-1 ring-slate-800/70 hover:bg-[#171717] transition-colors",
        // thin orange accent bar for highlight
        highlight &&
          "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-gradient-to-b before:from-orange-400/70 before:to-orange-400/0"
      )}
    >
      <div className="relative h-12 w-12 rounded-full overflow-hidden ring-1 ring-slate-700 bg-[#0f0f0f] flex-shrink-0">
        <Image src={avatar} alt={handle} fill className="object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-slate-100 font-semibold text-sm truncate">
            {handle}
          </h3>
          <span className="px-2 py-0.5 rounded-full bg-[#1a1a1a] ring-1 ring-slate-800/70 text-[10px] text-slate-300">
            {role}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <SocialIconSmall href={socials?.twitter} aria="X / Twitter">
            <Twitter className="h-3.5 w-3.5" />
          </SocialIconSmall>
          <SocialIconSmall href={socials?.telegram} aria="Telegram">
            <Send className="h-3.5 w-3.5" />
          </SocialIconSmall>
          <SocialIconSmall href={socials?.github} aria="GitHub">
            <Github className="h-3.5 w-3.5" />
          </SocialIconSmall>
        </div>
      </div>
    </li>
  );
}

/* ---------- desktop card ---------- */
function TeamCard({ member }: { member: Member }) {
  const { handle, role, avatar, socials, highlight } = member;

  return (
    <article
      className={clsx(
        "relative overflow-hidden rounded-2xl",
        "bg-[#141414] ring-1 ring-slate-800/70 shadow-[0_8px_24px_rgba(0,0,0,.35)]",
        "p-6 text-slate-200 transition-colors hover:bg-[#171717]",
        highlight &&
          "before:absolute before:inset-0 before:pointer-events-none before:bg-[radial-gradient(600px_240px_at_-5%_-10%,rgba(251,146,60,0.12),transparent_70%)]"
      )}
    >
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <div className="absolute inset-0 -m-1 rounded-full bg-[conic-gradient(from_180deg,transparent,rgba(251,146,60,.25),transparent)] blur-[6px]" />
          <div className="relative h-24 w-24 rounded-full overflow-hidden ring-2 ring-slate-700/70 bg-[#0f0f0f]">
            <Image src={avatar} alt={handle} fill className="object-cover" />
          </div>
        </div>

        <h3 className="text-2xl font-extrabold tracking-tight text-slate-100 text-center">
          {handle}
        </h3>
        <div className="mt-1">
          <span className="inline-block px-3 py-1 rounded-full bg-[#1a1a1a] ring-1 ring-slate-800/70 text-slate-300 text-xs">
            {role}
          </span>
        </div>

        <div className="mt-4 mb-3 h-px w-full bg-gradient-to-r from-transparent via-slate-800/70 to-transparent" />

        <div className="flex items-center gap-3">
          <SocialIcon href={socials?.twitter} aria="X / Twitter">
            <Twitter className="h-4 w-4" />
          </SocialIcon>
          <SocialIcon href={socials?.telegram} aria="Telegram">
            <Send className="h-4 w-4" />
          </SocialIcon>
          <SocialIcon href={socials?.github} aria="GitHub">
            <Github className="h-4 w-4" />
          </SocialIcon>
        </div>
      </div>
    </article>
  );
}

/* ---------- socials ---------- */
function SocialIconSmall({
  href,
  aria,
  children,
}: {
  href?: string;
  aria: string;
  children: React.ReactNode;
}) {
  const base =
    "h-8 w-8 rounded-lg grid place-items-center ring-1 ring-slate-800/70 transition-all";
  if (!href) {
    return (
      <span
        className={clsx(base, "bg-[#1a1a1a] text-slate-600 opacity-60")}
        aria-disabled
        title={`${aria} (unavailable)`}
      >
        {children}
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        base,
        "bg-[#1a1a1a] text-slate-300 hover:bg-[#222] hover:text-slate-100 hover:ring-orange-400/40 active:scale-[0.98]"
      )}
      aria-label={aria}
      title={aria}
    >
      {children}
    </a>
  );
}

function SocialIcon({
  href,
  aria,
  children,
}: {
  href?: string;
  aria: string;
  children: React.ReactNode;
}) {
  const base =
    "h-10 w-10 rounded-xl grid place-items-center ring-1 ring-slate-800/70 transition-all";
  if (!href) {
    return (
      <span
        className={clsx(base, "bg-[#1a1a1a] text-slate-600 opacity-60")}
        aria-disabled
        title={`${aria} (unavailable)`}
      >
        {children}
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        base,
        "bg-[#1a1a1a] text-slate-300 hover:bg-[#222] hover:text-slate-100 hover:ring-orange-400/40 active:scale-[0.98]"
      )}
      aria-label={aria}
      title={aria}
    >
      {children}
    </a>
  );
}
