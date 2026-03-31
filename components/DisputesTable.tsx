"use client";

import { Loader2, Scale, Clock, AlertCircle, CheckCircle2, RefreshCw } from "lucide-react";
import { useDisputes, useResolveDispute, useDisputeResolutionContract } from "@/lib/hooks/useDisputeResolution";
import { useWallet } from "@/lib/genlayer/wallet";
import { error } from "@/lib/utils/toast";
import { AddressDisplay } from "./AddressDisplay";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import type { Dispute } from "@/lib/contracts/types";

export function DisputesTable() {
  const contract = useDisputeResolutionContract();
  const { data: disputes, isLoading, isError } = useDisputes();
  const { address, isConnected, isLoading: isWalletLoading } = useWallet();
  const { resolveDispute, isResolving, resolvingDisputeId } = useResolveDispute();

  const handleResolve = (disputeId: string) => {
    if (!address) {
      error("Please connect your wallet to trigger arbitration");
      return;
    }

    const confirmed = confirm(
      "Trigger AI arbitration for this dispute? The AI arbitrator will review all submitted evidence and issue a binding ruling."
    );

    if (confirmed) {
      resolveDispute(disputeId);
    }
  };

  if (isLoading) {
    return (
      <div className="brand-card p-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
          <p className="text-sm text-muted-foreground">Loading disputes...</p>
        </div>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="brand-card p-12">
        <div className="text-center space-y-4">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-400 opacity-60" />
          <h3 className="text-xl font-bold">Setup Required</h3>
          <div className="space-y-2">
            <p className="text-muted-foreground">Contract address not configured.</p>
            <p className="text-sm text-muted-foreground">
              Please set{" "}
              <code className="bg-muted px-1 py-0.5 rounded text-xs">
                NEXT_PUBLIC_CONTRACT_ADDRESS
              </code>{" "}
              in your .env file.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="brand-card p-8">
        <div className="text-center">
          <p className="text-destructive">Failed to load disputes. Please try again.</p>
        </div>
      </div>
    );
  }

  if (!disputes || disputes.length === 0) {
    return (
      <div className="brand-card p-12">
        <div className="text-center space-y-3">
          <Scale className="w-16 h-16 mx-auto text-muted-foreground opacity-30" />
          <h3 className="text-xl font-bold">No Disputes Yet</h3>
          <p className="text-muted-foreground">
            Be the first to file a dispute for AI arbitration.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="brand-card p-6 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Framework
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Parties
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Decision
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {disputes.map((dispute) => (
              <DisputeRow
                key={dispute.dispute_id}
                dispute={dispute}
                currentAddress={address}
                isConnected={isConnected}
                isWalletLoading={isWalletLoading}
                onResolve={handleResolve}
                isResolving={isResolving && resolvingDisputeId === dispute.dispute_id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface DisputeRowProps {
  dispute: Dispute;
  currentAddress: string | null;
  isConnected: boolean;
  isWalletLoading: boolean;
  onResolve: (disputeId: string) => void;
  isResolving: boolean;
}

function getStatusBadge(status: string) {
  switch (status) {
    case "resolved":
      return (
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Resolved
        </Badge>
      );
    case "under_review":
      return (
        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
          <RefreshCw className="w-3 h-3 mr-1" />
          Under Review
        </Badge>
      );
    case "pending_respondent":
      return (
        <Badge variant="outline" className="text-orange-400 border-orange-500/30">
          <Clock className="w-3 h-3 mr-1" />
          Awaiting Respondent
        </Badge>
      );
    case "pending_claimant":
    default:
      return (
        <Badge variant="outline" className="text-yellow-400 border-yellow-500/30">
          <Clock className="w-3 h-3 mr-1" />
          Awaiting Claimant
        </Badge>
      );
  }
}

function getDecisionBadge(decision: string) {
  switch (decision) {
    case "claimant_wins":
      return <Badge className="bg-accent/20 text-accent border-accent/30">Claimant Wins</Badge>;
    case "respondent_wins":
      return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Respondent Wins</Badge>;
    case "split":
      return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Split</Badge>;
    case "dismissed":
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Dismissed</Badge>;
    default:
      return <span className="text-xs text-muted-foreground">—</span>;
  }
}

function DisputeRow({
  dispute,
  currentAddress,
  isConnected,
  isWalletLoading,
  onResolve,
  isResolving,
}: DisputeRowProps) {
  const isClaimant =
    currentAddress?.toLowerCase() === dispute.claimant?.toLowerCase();
  const canResolve =
    isConnected &&
    currentAddress &&
    !isWalletLoading &&
    dispute.status === "under_review";

  return (
    <tr className="group hover:bg-white/5 transition-colors animate-fade-in">
      {/* Title */}
      <td className="px-4 py-4">
        <div className="max-w-[160px]">
          <p className="text-sm font-semibold truncate" title={dispute.title}>
            {dispute.title}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            #{dispute.dispute_id}
          </p>
        </div>
      </td>

      {/* Legal Framework */}
      <td className="px-4 py-4">
        <Badge variant="outline" className="text-accent border-accent/30 text-xs">
          {dispute.legal_framework}
        </Badge>
      </td>

      {/* Parties */}
      <td className="px-4 py-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground w-16">Claimant:</span>
            <AddressDisplay address={dispute.claimant} maxLength={8} showCopy={false} />
            {isClaimant && (
              <Badge variant="secondary" className="text-xs ml-1">
                You
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground w-16">Respondent:</span>
            <AddressDisplay address={dispute.respondent} maxLength={8} showCopy={false} />
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="px-4 py-4">{getStatusBadge(dispute.status)}</td>

      {/* Decision */}
      <td className="px-4 py-4">
        <div className="space-y-1">
          {getDecisionBadge(dispute.decision)}
          {dispute.confidence_score && dispute.status === "resolved" && (
            <p className="text-xs text-muted-foreground">
              {dispute.confidence_score}% confidence
            </p>
          )}
        </div>
      </td>

      {/* Actions */}
      <td className="px-4 py-4">
        {canResolve && (
          <Button
            onClick={() => onResolve(dispute.dispute_id)}
            disabled={isResolving}
            size="sm"
            variant="gradient"
          >
            {isResolving ? (
              <>
                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                Arbitrating...
              </>
            ) : (
              <>
                <Scale className="w-3 h-3 mr-1" />
                Arbitrate
              </>
            )}
          </Button>
        )}
      </td>
    </tr>
  );
}
