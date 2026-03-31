import { createClient } from "genlayer-js";
import { studionet } from "genlayer-js/chains";
import type { Dispute, RulingEntry, TransactionReceipt } from "./types";

/**
 * DisputeResolution contract class for interacting with the GenLayer
 * AI-powered Dispute Resolution contract at:
 * 0x70050D589A1cbcD91C3222caF146144E8108E593
 */
class DisputeResolution {
  private contractAddress: `0x${string}`;
  private client: ReturnType<typeof createClient>;

  constructor(
    contractAddress: string,
    address?: string | null,
    studioUrl?: string
  ) {
    this.contractAddress = contractAddress as `0x${string}`;

    const config: any = {
      chain: studionet,
    };

    if (address) {
      config.account = address as `0x${string}`;
    }

    if (studioUrl) {
      config.endpoint = studioUrl;
    }

    this.client = createClient(config);
  }

  /**
   * Update the address used for transactions
   */
  updateAccount(address: string): void {
    const config: any = {
      chain: studionet,
      account: address as `0x${string}`,
    };

    this.client = createClient(config);
  }

  // ── Read methods ─────────────────────────────────────────────────────────────

  /**
   * Get all disputes from the contract
   * @returns Array of disputes with their details
   */
  async getDisputes(): Promise<Dispute[]> {
    try {
      const disputes: any = await this.client.readContract({
        address: this.contractAddress,
        functionName: "get_disputes",
        args: [],
      });

      // Convert GenLayer Map structure to typed array
      if (disputes instanceof Map) {
        return Array.from(disputes.entries()).map(([disputeId, data]: any) => {
          const obj = Array.from((data as any).entries()).reduce(
            (acc: any, [key, value]: any) => {
              acc[key] = value;
              return acc;
            },
            {} as Record<string, any>
          );

          return {
            dispute_id: disputeId,
            ...obj,
          } as Dispute;
        });
      }

      return [];
    } catch (err) {
      console.error("Error fetching disputes:", err);
      throw new Error("Failed to fetch disputes from contract");
    }
  }

  /**
   * Get a single dispute summary by ID
   * Maps to the contract's get_dispute_summary view method
   * @param disputeId - The dispute ID
   * @returns Dispute summary object
   */
  async getDisputeSummary(disputeId: string): Promise<Dispute> {
    try {
      const data: any = await this.client.readContract({
        address: this.contractAddress,
        functionName: "get_dispute_summary",
        args: [disputeId],
      });

      if (data instanceof Map) {
        const obj = Array.from(data.entries()).reduce(
          (acc: any, [key, value]: any) => {
            acc[key] = value;
            return acc;
          },
          {} as Record<string, any>
        );
        return obj as Dispute;
      }

      return data as Dispute;
    } catch (err) {
      console.error("Error fetching dispute summary:", err);
      throw new Error("Failed to fetch dispute summary");
    }
  }

  /**
   * Get the full ruling for a resolved dispute
   * Maps to the contract's get_ruling view method
   * @param disputeId - The dispute ID
   * @returns Ruling details
   */
  async getRuling(disputeId: string): Promise<RulingEntry> {
    try {
      const data: any = await this.client.readContract({
        address: this.contractAddress,
        functionName: "get_ruling",
        args: [disputeId],
      });

      if (data instanceof Map) {
        const obj = Array.from(data.entries()).reduce(
          (acc: any, [key, value]: any) => {
            acc[key] = value;
            return acc;
          },
          {} as Record<string, any>
        );
        return obj as RulingEntry;
      }

      return data as RulingEntry;
    } catch (err) {
      console.error("Error fetching ruling:", err);
      throw new Error("Failed to fetch ruling");
    }
  }

  /**
   * Get recent resolved rulings for the sidebar panel.
   * Fetches all disputes and filters to resolved ones, sorted newest first.
   * @returns Array of ruling entries
   */
  async getRecentRulings(): Promise<RulingEntry[]> {
    try {
      const disputes = await this.getDisputes();

      return disputes
        .filter((d) => d.status === "resolved")
        .map((d) => ({
          dispute_id: d.dispute_id,
          title: d.title,
          claimant: d.claimant,
          respondent: d.respondent,
          decision: d.decision,
          ruling: d.ruling,
          confidence_score: d.confidence_score,
          awarded_amount: d.awarded_amount,
          resolved_at: d.resolved_at,
        }))
        .sort((a, b) => {
          // Sort by resolved_at descending (most recent first)
          if (!a.resolved_at) return 1;
          if (!b.resolved_at) return -1;
          return new Date(b.resolved_at).getTime() - new Date(a.resolved_at).getTime();
        })
        .slice(0, 10);
    } catch (err) {
      console.error("Error fetching recent rulings:", err);
      throw new Error("Failed to fetch recent rulings");
    }
  }

  /**
   * Get both parties' case submissions for a dispute
   * Maps to the contract's get_submissions view method
   * @param disputeId - The dispute ID
   */
  async getSubmissions(disputeId: string): Promise<{
    claimant: string;
    claimant_case: string;
    claimant_evidence_url: string;
    respondent: string;
    respondent_case: string;
    respondent_evidence_url: string;
  }> {
    try {
      const data: any = await this.client.readContract({
        address: this.contractAddress,
        functionName: "get_submissions",
        args: [disputeId],
      });

      if (data instanceof Map) {
        return Array.from(data.entries()).reduce(
          (acc: any, [key, value]: any) => {
            acc[key] = value;
            return acc;
          },
          {} as any
        );
      }

      return data;
    } catch (err) {
      console.error("Error fetching submissions:", err);
      throw new Error("Failed to fetch submissions");
    }
  }

  // ── Write methods ─────────────────────────────────────────────────────────────

  /**
   * File a new dispute on-chain
   * Deploys a new DisputeResolution contract instance
   */
  async fileDispute(
    disputeId: string,
    title: string,
    legalFramework: string,
    claimant: string,
    respondent: string
  ): Promise<TransactionReceipt> {
    try {
      const txHash = await this.client.writeContract({
        address: this.contractAddress,
        functionName: "file_dispute",
        args: [disputeId, title, legalFramework, claimant, respondent],
        value: BigInt(0),
      });

      const receipt = await this.client.waitForTransactionReceipt({
        hash: txHash,
        status: "ACCEPTED" as any,
        retries: 24,
        interval: 5000,
      });

      return receipt as TransactionReceipt;
    } catch (err) {
      console.error("Error filing dispute:", err);
      throw new Error("Failed to file dispute");
    }
  }

  /**
   * Submit the claimant's case statement and optional evidence URL
   * Maps to the contract's submit_claimant_case write method
   */
  async submitClaimantCase(
    disputeId: string,
    caseStatement: string,
    evidenceUrl: string = ""
  ): Promise<TransactionReceipt> {
    try {
      const txHash = await this.client.writeContract({
        address: this.contractAddress,
        functionName: "submit_claimant_case",
        args: [disputeId, caseStatement, evidenceUrl],
        value: BigInt(0),
      });

      const receipt = await this.client.waitForTransactionReceipt({
        hash: txHash,
        status: "ACCEPTED" as any,
        retries: 24,
        interval: 5000,
      });

      return receipt as TransactionReceipt;
    } catch (err) {
      console.error("Error submitting claimant case:", err);
      throw new Error("Failed to submit claimant case");
    }
  }

  /**
   * Submit the respondent's rebuttal and optional evidence URL
   * Maps to the contract's submit_respondent_case write method
   */
  async submitRespondentCase(
    disputeId: string,
    caseStatement: string,
    evidenceUrl: string = ""
  ): Promise<TransactionReceipt> {
    try {
      const txHash = await this.client.writeContract({
        address: this.contractAddress,
        functionName: "submit_respondent_case",
        args: [disputeId, caseStatement, evidenceUrl],
        value: BigInt(0),
      });

      const receipt = await this.client.waitForTransactionReceipt({
        hash: txHash,
        status: "ACCEPTED" as any,
        retries: 24,
        interval: 5000,
      });

      return receipt as TransactionReceipt;
    } catch (err) {
      console.error("Error submitting respondent case:", err);
      throw new Error("Failed to submit respondent case");
    }
  }

  /**
   * Trigger AI arbitration for a dispute
   * Maps to the contract's resolve write method
   */
  async resolve(disputeId: string): Promise<TransactionReceipt> {
    try {
      const txHash = await this.client.writeContract({
        address: this.contractAddress,
        functionName: "resolve",
        args: [disputeId],
        value: BigInt(0),
      });

      const receipt = await this.client.waitForTransactionReceipt({
        hash: txHash,
        status: "ACCEPTED" as any,
        retries: 24,
        interval: 5000,
      });

      return receipt as TransactionReceipt;
    } catch (err) {
      console.error("Error triggering arbitration:", err);
      throw new Error("Failed to trigger arbitration");
    }
  }

  /**
   * Request reconsideration of a resolved dispute
   * Maps to the contract's request_reconsideration write method
   */
  async requestReconsideration(
    disputeId: string,
    requestingParty: "claimant" | "respondent",
    grounds: string
  ): Promise<TransactionReceipt> {
    try {
      const txHash = await this.client.writeContract({
        address: this.contractAddress,
        functionName: "request_reconsideration",
        args: [disputeId, requestingParty, grounds],
        value: BigInt(0),
      });

      const receipt = await this.client.waitForTransactionReceipt({
        hash: txHash,
        status: "ACCEPTED" as any,
        retries: 24,
        interval: 5000,
      });

      return receipt as TransactionReceipt;
    } catch (err) {
      console.error("Error requesting reconsideration:", err);
      throw new Error("Failed to request reconsideration");
    }
  }
}

export default DisputeResolution;
