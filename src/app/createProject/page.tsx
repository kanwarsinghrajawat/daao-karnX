"use client";

import { ChevronDown, ExternalLink } from "lucide-react";
import { Button } from "@/shadcn/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shadcn/components/ui/collapsible";
import { cn } from "@/shadcn/lib/utils";
import { useState } from "react";

const faqs = [
  {
    question: "What’s the turnaround time?",
    answer: "Most submissions are reviewed within 2–3 business days.",
  },
  {
    question: "What details should I include?",
    answer:
      "Share your goals, timeline, key stakeholders, and any relevant assets or constraints.",
  },
  {
    question: "Can I edit my request?",
    answer: "Submit a new form or reach us at karnxai@gmail.com.",
  },
  {
    question: "What types of projects do you support?",
    answer:
      "We support projects of every kind — from AI solutions, software, and web applications to DeFi protocols, NFT marketplaces, DAO tools, and cutting-edge blockchain innovations.",
  },
  {
    question: "Is there a minimum funding requirement?",
    answer:
      "No. We evaluate based on potential, impact, and innovation — not minimum funding thresholds.",
  },
];

export default function CreateProjectPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Subtle vignette / gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_300px_at_50%_-50%,rgba(255,138,76,0.15),transparent)]" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-300 via-amber-200 to-orange-400">
              Create a New Project
            </span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Ready to bring your idea to life? Submit your project and join an
            ecosystem of ambitious builders across AI, software, and Web3.
          </p>
        </header>

        {/* Primary Action */}
        <div className="text-center mb-16">
          <Button
            asChild
            size="lg"
            className={cn(
              "h-auto px-6 md:px-8 py-4 text-base md:text-lg font-semibold",
              "bg-gradient-to-r from-orange-500 to-orange-600",
              "hover:from-orange-600 hover:to-orange-700",
              "rounded-xl shadow-[0_10px_30px_rgba(255,115,50,0.25)] hover:shadow-[0_14px_36px_rgba(255,115,50,0.32)]",
              "transition-all"
            )}
          >
            <a
              href="https://forms.gle/rofCendPEAkgJs4VA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Open Project Request Form
              <ExternalLink className="w-5 h-5" />
            </a>
          </Button>
          <p className="text-xs md:text-sm text-slate-400 mt-3">
            You’ll be redirected to our secure Google Form
          </p>
        </div>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>

        {/* Contact */}
        <footer className="text-center mt-14 pt-8 border-t border-white/10">
          <p className="text-slate-400 mb-2">Need help? Contact our team</p>
          <a
            href="mailto:karnxai@gmail.com"
            className="text-orange-300 hover:text-orange-200 transition-colors underline underline-offset-4"
          >
            karnxai@gmail.com
          </a>
        </footer>
      </div>
    </div>
  );
}

/** FAQ Accordion */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div
        className={cn(
          "rounded-xl border border-white/10 bg-[#171717]/90 backdrop-blur-sm",
          "transition-colors"
        )}
      >
        <CollapsibleTrigger
          className={cn(
            "group flex w-full items-center justify-between gap-4 p-5 md:p-6",
            "hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]",
            "transition"
          )}
        >
          <h3 className="text-left text-base md:text-lg font-medium text-white/95 leading-snug">
            {question}
          </h3>

          <span
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15",
              "bg-white/5 text-slate-300 transition-transform",
              "group-hover:border-white/25",
              isOpen && "rotate-180"
            )}
            aria-hidden
          >
            <ChevronDown className="h-5 w-5" />
          </span>
        </CollapsibleTrigger>

        <CollapsibleContent
          className={cn(
            "px-5 md:px-6 pb-5 md:pb-6",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-1",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-1"
          )}
        >
          <p className="text-slate-300/95 leading-relaxed">{answer}</p>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
