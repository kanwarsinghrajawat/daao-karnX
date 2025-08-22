import Link from "next/link";

// app/about/page.tsx
export default function AboutPage() {
  return (
    <main className="min-h-screen  text-slate-100">
      {/* accent */}
      <div className="h-1 w-full bg-[#FF7A1A]/40 mt-4" />

      <section className="mx-auto max-w-5xl px-6 py-14">
        {/* badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#2a2f36] bg-[#161a1f] px-3 py-1 text-xs text-slate-300">
          <span>About</span>
          <span className="rounded-full border border-[#FF7A1A]/40 bg-[#FF7A1A]/10 px-2 py-0.5 font-semibold text-[#FF7A1A]">
            karnX DAO v0.1
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
          karnX — Decentralised Autonomous Organisation
        </h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          karnX makes it easy and fair to launch a product and its token. Money
          from the first sale goes into a safe vault and is released
          step-by-step when the project shows progress. Reviews are done by AI
          and by people, with the final say from community governance (DAO).
        </p>
      </section>

      <section className="mx-auto max-w-5xl space-y-6 px-6 pb-16">
        {/* Mission */}
        <div className="rounded-2xl border border-[#2a2f36] bg-[#1b1f24] p-6">
          <h2 className="text-lg font-semibold">Our mission</h2>
          <p className="mt-2 text-slate-300">
            Bring trust to crypto fundraising: clear rules, simple steps, public
            records, and payments tied to real progress — so builders and
            backers are protected.
          </p>
        </div>

        {/* What / Why */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[#2a2f36] bg-[#1b1f24] p-6">
            <h3 className="text-base font-semibold">What we do</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-slate-300">
              <li>Publish a clear, signed set of launch terms.</li>
              <li>
                Send sale money to a secure vault until milestones are met.
              </li>
              <li>Run simple reviews before any payout is made.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-[#2a2f36] bg-[#1b1f24] p-6">
            <h3 className="text-base font-semibold">Why it matters</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-slate-300">
              <li>Backers get transparency and protection.</li>
              <li>Builders get a fair path to funding as they deliver.</li>
              <li>The community can resolve disagreements when needed.</li>
            </ul>
          </div>
        </div>

        {/* Who’s involved */}
        <div className="rounded-2xl border border-[#2a2f36] bg-[#1b1f24] p-6">
          <h3 className="text-base font-semibold">Who’s involved</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {[
              ["Project (Builder)", "The team launching a product and token."],
              ["Backers", "People who buy in the first sale."],
              [
                "Evaluators",
                "AI scores plus human reviewers chosen by the community.",
              ],
              [
                "Governance (DAO)",
                "Community that discusses, votes, and makes final decisions.",
              ],
              [
                "Platform Contracts",
                "On-chain system for records, sales, vesting, and reviews.",
              ],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-xl border border-[#2a2f36] bg-[#161a1f] p-4"
              >
                <p className="font-medium">{title}</p>
                <p className="text-sm text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="rounded-2xl border border-[#2a2f36] bg-[#1b1f24] p-6">
          <h3 className="text-base font-semibold">
            How it works — in 4 simple steps
          </h3>
          <ol className="mt-2 list-decimal space-y-3 pl-5 text-sm text-slate-300">
            <li>
              <span className="font-medium text-slate-200">
                Intake (Request).
              </span>{" "}
              Share your project info (team, plan, token details, milestones,
              KPIs, risks) and pay a small listing fee. We register it, add an
              AI pre-score, and mark it as shortlisted or declined.
            </li>
            <li>
              <span className="font-medium text-slate-200">
                Terms Lock (Agreement).
              </span>{" "}
              We run checks (AI + expert review). The community votes. The
              project and karnX sign the{" "}
              <span className="font-medium">Proof of Terms</span>: supply &
              price, purchase limits & schedule, milestone proofs, token splits
              with vesting, fees, and dispute rules. The terms are public and
              can’t be changed.
            </li>
            <li>
              <span className="font-medium text-slate-200">Sale & Escrow.</span>{" "}
              The main token sale goes live. Buyers receive tokens. Sale funds
              go to the Milestone Vault (secure escrow). Team/treasury tokens
              follow a vesting plan. A platform fee goes to the community
              treasury. Later trading helps with price discovery but doesn’t
              raise new money (unless stated in the terms).
            </li>
            <li>
              <span className="font-medium text-slate-200">
                Milestone Review.
              </span>{" "}
              For each milestone, the team submits proof (builds, commits,
              usage, audits). Evaluators vote pass/fail with a short reason.
              When approvals reach the set threshold — or the community votes —
              the vault releases the next payment. If it fails, the team can
              retry or open a dispute (full, partial, clawback, or refund as per
              the terms).
            </li>
          </ol>
        </div>

        {/* CTA (subtle warm glow like your cards) */}
        <div className="mt-8 flex flex-col items-start justify-between gap-3 rounded-2xl border border-[#2a2f36] bg-[#1b1f24] p-6 md:flex-row md:items-center">
          <div>
            <p className="font-medium text-slate-200">Ready to start?</p>
            <p className="text-sm text-slate-400">Create a project on karnX.</p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/createProject"
              className="inline-flex items-center justify-center rounded-lg bg-[#FF7A1A] px-4 py-2 font-semibold text-black hover:opacity-95"
            >
              Create Project
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
