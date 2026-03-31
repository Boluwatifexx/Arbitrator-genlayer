"use client";

import { Navbar } from "@/components/Navbar";
import { DisputesTable } from "@/components/DisputesTable";
import { RecentRulings } from "@/components/RecentRulings";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content - Padding to account for fixed navbar */}
      <main className="flex-grow pt-20 pb-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              AI Dispute Resolution
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Impartial, AI-powered arbitration on the GenLayer blockchain.
              <br />
              Submit your case, present evidence, and receive a binding ruling.
            </p>
          </div>

          {/* Main Grid Layout - 2/1 columns on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left Column - Disputes Table (67% on desktop) */}
            <div className="lg:col-span-8 animate-slide-up">
              <DisputesTable />
            </div>

            {/* Right Column - Recent Rulings (33% on desktop) */}
            <div className="lg:col-span-4 animate-slide-up" style={{ animationDelay: "100ms" }}>
              <RecentRulings />
            </div>
          </div>

          {/* How it Works Section */}
          <div className="mt-8 glass-card p-6 md:p-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h2 className="text-2xl font-bold mb-4">How it Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="text-accent font-bold text-lg">1. File a Dispute</div>
                <p className="text-sm text-muted-foreground">
                  Connect your wallet and open a new dispute. Define the title, legal framework, and the opposing party.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-accent font-bold text-lg">2. Submit Cases</div>
                <p className="text-sm text-muted-foreground">
                  Both the claimant and respondent submit their case statements and optional evidence URLs.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-accent font-bold text-lg">3. AI Arbitration</div>
                <p className="text-sm text-muted-foreground">
                  GenLayer's AI arbitrator reviews all evidence and applies the chosen legal framework to reach a decision.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-accent font-bold text-lg">4. Binding Ruling</div>
                <p className="text-sm text-muted-foreground">
                  A transparent, on-chain ruling is issued with full reasoning, confidence score, and any awarded amounts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-2">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <a
              href="https://genlayer.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              Powered by GenLayer
            </a>
            <a
              href="https://studio.genlayer.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              Studio
            </a>
            <a
              href="https://docs.genlayer.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              Docs
            </a>
            <a
              href="https://github.com/genlayerlabs/genlayer-project-boilerplate"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
