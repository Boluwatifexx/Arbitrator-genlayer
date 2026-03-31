"use client";

import { Scale, Loader2, AlertCircle, CheckCircle2, XCircle, Minus, SplitSquareHorizontal } from "lucide-react";
import { useRecentRulings, useDisputeResolutionContract } from "@/lib/hooks/useDisputeResolution";
import { useWallet } from "@/lib/genlayer/wallet";
import { AddressDisplay } from "./AddressDisplay";
import { Badge } from "./ui/badge";

export function RecentRulings() {
  const contract = useDisputeResolutionContract();
  const { data: rulings, isLoading, isError } = useRecentRulings();
  const { address } = useWallet();

  if (isLoading) {
    return (
      <div className="brand-card p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Scale className="w-5 h-5 text-accent" />
          Recent Rulings
        </h2>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-accent" />
        </div>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="brand-card p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Scale className="w-5 h-5 text-accent" />
          Recent Rulings
        </h2>
        <div className="text-center py-8 space-y-3">
          <AlertCircle className="w-12 h-12 mx-auto text-yellow-400 opacity-60" />
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Setup Required</p>
            <p className="text-xs text-muted-foreground">Contract address not configured</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !rulings) {
    return (
      <div className="brand-card p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Scale className="w-5 h-5 text-accent" />
          Recent Rulings
        </h2>
        <div className="text-center py-8">
          <p className="text-sm text-destructive">Failed to load rulings</p>
        </div>
      </div>
    );
  }

  if (rulings.length === 0) {
    return (
      <div className="brand-card p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Scale className="w-5 h-5 text-accent" />
          Recent Rulings
        </h2>
        <div className="text-center py-8">
          <Scale className="w-12 h-12 mx-auto text-muted-foreground opacity-30 mb-3" />
          <p className="text-sm text-muted-foreground">No rulings issued yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="brand-card p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Scale className="w-5 h-5 text-accent" />
        Recent Rulings
      </h2>

      <div className="space-y-3">
        {rulings.map((ruling) => {
          const isInvolved =
            address?.toLowerCase() === ruling.claimant?.toLowerCase() ||
            address?.toLowerCase() === ruling.respondent?.toLowerCase();

          return (
            <div
              key={ruling.dispute_id}
              className={`
                p-3 rounded-lg transition-all space-y-2
                ${isInvolved
                  ? "bg-accent/20 border-2 border-accent/50"
                  : "hover:bg-white/5 border border-white/5"}
              `}
            >
              {/* Title + Decision Icon */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold truncate" title={ruling.title}>
                    {ruling.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    #{ruling.dispute_id}
                  </p>
                </div>
                <DecisionIcon decision={ruling.decision} />
              </div>

              {/* Decision Badge */}
              <div className="flex items-center justify-between">
                <DecisionBadge decision={ruling.decision} />
                {ruling.confidence_score && (
                  <span className="text-xs text-muted-foreground">
                    {ruling.confidence_score}% sure
                  </span>
                )}
              </div>

              {/* Parties */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <AddressDisplay address={ruling.claimant} maxLength={6} showCopy={false} />
                <span>vs</span>
                <AddressDisplay address={ruling.respondent} maxLength={6} showCopy={false} />
              </div>

              {/* Award */}
              {ruling.awarded_amount && (
                <p className="text-xs text-accent font-medium truncate">
                  💰 {ruling.awarded_amount}
                </p>
              )}

              {/* Your involvement tag */}
              {isInvolved && (
                <span className="inline-block text-xs bg-accent/30 text-accent px-2 py-0.5 rounded-full font-semibold">
                  You're involved
                </span>
              )}
            </div>
          );
        })}
      </div>

      {rulings.length >= 10 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-center text-muted-foreground">
            Showing {rulings.length} most recent rulings
          </p>
        </div>
      )}
    </div>
  );
}

// ── Helper sub-components ──────────────────────────────────────────────────────

function DecisionIcon({ decision }: { decision: string }) {
  switch (decision) {
    case "claimant_wins":
      return <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />;
    case "respondent_wins":
      return <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />;
    case "split":
      return <SplitSquareHorizontal className="w-4 h-4 text-yellow-400 flex-shrink-0" />;
    case "dismissed":
      return <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />;
    default:
      return <Minus className="w-4 h-4 text-muted-foreground flex-shrink-0" />;
  }
}

function DecisionBadge({ decision }: { decision: string }) {
  switch (decision) {
    case "claimant_wins":
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Claimant Wins</Badge>;
    case "respondent_wins":
      return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">Respondent Wins</Badge>;
    case "split":
      return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">Split Decision</Badge>;
    case "dismissed":
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">Dismissed</Badge>;
    default:
      return <Badge variant="outline" className="text-muted-foreground text-xs">Pending</Badge>;
  }
}
