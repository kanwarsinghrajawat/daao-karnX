"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Send, Twitter } from "lucide-react";
import clsx from "clsx";

type Socials = {
  twitter?: string;
  telegram?: string;
  github?: string;
};

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
    <section className="w-full max-w-7xl mx-auto py-10" id="team">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100">
          {title}
        </h2>
        <p className="mt-3 text-slate-400 font-mono text-sm md:text-base rounded-2xl border border-slate-800/70 bg-[#121212]/60 p-4">
          {subtitle}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((m) => (
          <TeamCard key={m.id} member={m} />
        ))}
      </div>
    </section>
  );
}

function TeamCard({ member }: { member: Member }) {
  const { handle, role, avatar, socials, highlight } = member;

  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-3xl p-6 text-slate-200",
        "bg-[#141414] ring-1 ring-slate-800/70",
        "hover:bg-[#171717] transition-colors",
        highlight &&
          "before:absolute before:inset-0 before:bg-[radial-gradient(120%_80%_at_10%_20%,rgba(251,146,60,0.25),rgba(0,0,0,0)_60%)] before:pointer-events-none"
      )}
    >
      {/* Avatar */}
      <div className="flex flex-col items-center">
        <div className="relative h-20 w-20 rounded-full overflow-hidden ring-2 ring-slate-700 mb-4">
          <Image src={avatar} alt={handle} fill className="object-cover" />
        </div>

        {/* Handle + Role */}
        <div className="text-center">
          <div className="font-extrabold text-xl md:text-2xl">{handle}</div>
          <div className="text-slate-400 mt-1">{role}</div>
        </div>

        {/* Socials */}
        <div className="mt-4 flex items-center gap-3">
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
    </div>
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
    "h-9 w-9 rounded-xl grid place-items-center ring-1 ring-slate-800/70";
  if (!href) {
    return (
      <span
        className={clsx(
          base,
          "bg-[#1a1a1a] text-slate-600 cursor-not-allowed opacity-50"
        )}
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
        "bg-[#1a1a1a] text-slate-300 hover:bg-[#222] hover:text-slate-100 transition-colors"
      )}
      aria-label={aria}
      title={aria}
    >
      {children}
    </a>
  );
}
