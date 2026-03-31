"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import DisputeResolution from "../contracts/DisputeResolution";
import { getContractAddress, getStudioUrl } from "../genlayer/client";
import { useWallet } from "../genlayer/wallet";
import { success, error, configError } from "../utils/toast";
import type { Dispute, RulingEntry } from "../contracts/types";

/**
 * Hook to get the DisputeResolution contract instance
 *
 * Returns null if contract address is not configured.
 * The contract instance is recreated whenever the wallet address changes.
 * Read-only operations (getDisputes, getRecentRulings, etc.) work without a connected wallet.
 * Write operations (fileDispute, submitCase, resolveDispute) require a connected wallet.
 */
export function useDisputeResolutionContract(): DisputeResolution | null {
  const { address } = useWallet();
  const contractAddress = getContractAddress();
  const studioUrl = getStudioUrl();

  const contract = useMemo(() => {
    if (!contractAddress) {
      configError(
        "Setup Required",
        "Contract address not configured. Please set NEXT_PUBLIC_CONTRACT_ADDRESS in your .env file.",
        {
          label: "Setup Guide",
          onClick: () => window.open("/docs/setup", "_blank"),
        }
      );
      return null;
    }

    return new DisputeResolution(contractAddress, address, studioUrl);
  }, [contractAddress, address, studioUrl]);

  return contract;
}

/**
 * Hook to fetch all disputes
 * Refetches on window focus and after mutations
 * Returns empty array if contract is not configured
 */
export function useDisputes() {
  const contract = useDisputeResolutionContract();

  return useQuery<Dispute[], Error>({
    queryKey: ["disputes"],
    queryFn: () => {
      if (!contract) return Promise.resolve([]);
      return contract.getDisputes();
    },
    refetchOnWindowFocus: true,
    staleTime: 2000,
    enabled: !!contract,
  });
}

/**
 * Hook to fetch a single dispute by ID
 */
export function useDispute(disputeId: string | null) {
  const contract = useDisputeResolutionContract();

  return useQuery<Dispute, Error>({
    queryKey: ["dispute", disputeId],
    queryFn: () => {
      if (!contract || !disputeId) throw new Error("Missing contract or dispute ID");
      return contract.getDisputeSummary(disputeId);
    },
    refetchOnWindowFocus: true,
    staleTime: 2000,
    enabled: !!contract && !!disputeId,
  });
}

/**
 * Hook to fetch recent resolved rulings (for the sidebar panel)
 * Returns empty array if contract is not configured
 */
export function useRecentRulings() {
  const contract = useDisputeResolutionContract();

  return useQuery<RulingEntry[], Error>({
    queryKey: ["recentRulings"],
    queryFn: () => {
      if (!contract) return Promise.resolve([]);
      return contract.getRecentRulings();
    },
    refetchOnWindowFocus: true,
    staleTime: 2000,
    enabled: !!contract,
  });
}

/**
 * Hook to file a new dispute
 */
export function useFileDispute() {
  const contract = useDisputeResolutionContract();
  const { address } = useWallet();
  const queryClient = useQueryClient();
  const [isFiling, setIsFiling] = useState(false);

  const mutation = useMutation({
    mutationFn: async ({
      disputeId,
      title,
      legalFramework,
      claimant,
      respondent,
    }: {
      disputeId: string;
      title: string;
      legalFramework: string;
      claimant: string;
      respondent: string;
    }) => {
      if (!contract) {
        throw new Error(
          "Contract not configured. Please set NEXT_PUBLIC_CONTRACT_ADDRESS in your .env file."
        );
      }
      if (!address) {
        throw new Error("Wallet not connected. Please connect your wallet to file a dispute.");
      }
      setIsFiling(true);
      return contract.fileDispute(disputeId, title, legalFramework, claimant, respondent);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disputes"] });
      queryClient.invalidateQueries({ queryKey: ["recentRulings"] });
      setIsFiling(false);
      success("Dispute filed successfully!", {
        description:
          "Your dispute has been recorded on the blockchain. The respondent can now submit their case.",
      });
    },
    onError: (err: any) => {
      console.error("Error filing dispute:", err);
      setIsFiling(false);
      error("Failed to file dispute", {
        description: err?.message || "Please try again.",
      });
    },
  });

  return {
    ...mutation,
    isFiling,
    fileDispute: mutation.mutate,
    fileDisputeAsync: mutation.mutateAsync,
  };
}

/**
 * Hook to submit the claimant's case
 */
export function useSubmitClaimantCase() {
  const contract = useDisputeResolutionContract();
  const { address } = useWallet();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mutation = useMutation({
    mutationFn: async ({
      disputeId,
      caseStatement,
      evidenceUrl,
    }: {
      disputeId: string;
      caseStatement: string;
      evidenceUrl?: string;
    }) => {
      if (!contract) throw new Error("Contract not configured.");
      if (!address) throw new Error("Wallet not connected.");
      setIsSubmitting(true);
      return contract.submitClaimantCase(disputeId, caseStatement, evidenceUrl ?? "");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disputes"] });
      queryClient.invalidateQueries({ queryKey: ["dispute"] });
      setIsSubmitting(false);
      success("Claimant case submitted!", {
        description: "Awaiting the respondent's submission.",
      });
    },
    onError: (err: any) => {
      console.error("Error submitting claimant case:", err);
      setIsSubmitting(false);
      error("Failed to submit case", {
        description: err?.message || "Please try again.",
      });
    },
  });

  return {
    ...mutation,
    isSubmitting,
    submitClaimantCase: mutation.mutate,
    submitClaimantCaseAsync: mutation.mutateAsync,
  };
}

/**
 * Hook to submit the respondent's case
 */
export function useSubmitRespondentCase() {
  const contract = useDisputeResolutionContract();
  const { address } = useWallet();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mutation = useMutation({
    mutationFn: async ({
      disputeId,
      caseStatement,
      evidenceUrl,
    }: {
      disputeId: string;
      caseStatement: string;
      evidenceUrl?: string;
    }) => {
      if (!contract) throw new Error("Contract not configured.");
      if (!address) throw new Error("Wallet not connected.");
      setIsSubmitting(true);
      return contract.submitRespondentCase(disputeId, caseStatement, evidenceUrl ?? "");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disputes"] });
      queryClient.invalidateQueries({ queryKey: ["dispute"] });
      setIsSubmitting(false);
      success("Respondent case submitted!", {
        description: "Both cases are in. Trigger arbitration when ready.",
      });
    },
    onError: (err: any) => {
      console.error("Error submitting respondent case:", err);
      setIsSubmitting(false);
      error("Failed to submit case", {
        description: err?.message || "Please try again.",
      });
    },
  });

  return {
    ...mutation,
    isSubmitting,
    submitRespondentCase: mutation.mutate,
    submitRespondentCaseAsync: mutation.mutateAsync,
  };
}

/**
 * Hook to trigger AI arbitration (resolve a dispute)
 */
export function useResolveDispute() {
  const contract = useDisputeResolutionContract();
  const { address } = useWallet();
  const queryClient = useQueryClient();
  const [isResolving, setIsResolving] = useState(false);
  const [resolvingDisputeId, setResolvingDisputeId] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (disputeId: string) => {
      if (!contract) {
        throw new Error(
          "Contract not configured. Please set NEXT_PUBLIC_CONTRACT_ADDRESS in your .env file."
        );
      }
      if (!address) {
        throw new Error(
          "Wallet not connected. Please connect your wallet to trigger arbitration."
        );
      }
      setIsResolving(true);
      setResolvingDisputeId(disputeId);
      return contract.resolve(disputeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disputes"] });
      queryClient.invalidateQueries({ queryKey: ["dispute"] });
      queryClient.invalidateQueries({ queryKey: ["recentRulings"] });
      setIsResolving(false);
      setResolvingDisputeId(null);
      success("Arbitration complete!", {
        description: "The AI arbitrator has issued a ruling.",
      });
    },
    onError: (err: any) => {
      console.error("Error resolving dispute:", err);
      setIsResolving(false);
      setResolvingDisputeId(null);
      error("Arbitration failed", {
        description: err?.message || "Please try again.",
      });
    },
  });

  return {
    ...mutation,
    isResolving,
    resolvingDisputeId,
    resolveDispute: mutation.mutate,
    resolveDisputeAsync: mutation.mutateAsync,
  };
}

/**
 * Hook to request reconsideration of a resolved dispute
 */
export function useRequestReconsideration() {
  const contract = useDisputeResolutionContract();
  const { address } = useWallet();
  const queryClient = useQueryClient();
  const [isRequesting, setIsRequesting] = useState(false);

  const mutation = useMutation({
    mutationFn: async ({
      disputeId,
      requestingParty,
      grounds,
    }: {
      disputeId: string;
      requestingParty: "claimant" | "respondent";
      grounds: string;
    }) => {
      if (!contract) throw new Error("Contract not configured.");
      if (!address) throw new Error("Wallet not connected.");
      setIsRequesting(true);
      return contract.requestReconsideration(disputeId, requestingParty, grounds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disputes"] });
      queryClient.invalidateQueries({ queryKey: ["dispute"] });
      queryClient.invalidateQueries({ queryKey: ["recentRulings"] });
      setIsRequesting(false);
      success("Reconsideration requested!", {
        description:
          "The dispute has been reopened. Trigger arbitration again to get a new ruling.",
      });
    },
    onError: (err: any) => {
      console.error("Error requesting reconsideration:", err);
      setIsRequesting(false);
      error("Reconsideration failed", {
        description: err?.message || "Please try again.",
      });
    },
  });

  return {
    ...mutation,
    isRequesting,
    requestReconsideration: mutation.mutate,
    requestReconsiderationAsync: mutation.mutateAsync,
  };
}
