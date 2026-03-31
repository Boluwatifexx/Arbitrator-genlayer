/**
 * TypeScript types for GenLayer AI Dispute Resolution contract
 * Contract: 0x70050D589A1cbcD91C3222caF146144E8108E593
 */

export interface Dispute {
  dispute_id: string;
  title: string;
  legal_framework: string;

  claimant: string;
  respondent: string;

  claimant_case: string;
  respondent_case: string;
  claimant_evidence_url: string;
  respondent_evidence_url: string;

  // "pending_claimant" | "pending_respondent" | "under_review" | "resolved"
  status: string;

  // "claimant_wins" | "respondent_wins" | "split" | "dismissed" | "pending"
  decision: string;

  ruling: string;
  confidence_score: string;    // "0"–"100"
  awarded_amount: string;      // e.g. "$5,000 to claimant", or ""

  created_at: string;          // ISO datetime string
  resolved_at: string;         // ISO datetime string, or ""
}

export interface RulingEntry {
  dispute_id: string;
  title: string;
  claimant: string;
  respondent: string;

  // "claimant_wins" | "respondent_wins" | "split" | "dismissed" | "pending"
  decision: string;

  ruling: string;
  confidence_score: string;
  awarded_amount: string;
  resolved_at: string;
}

export interface TransactionReceipt {
  status: string;
  hash: string;
  blockNumber?: number;
  [key: string]: any;
}

export interface DisputeFilters {
  status?: Dispute["status"];
  claimant?: string;
  respondent?: string;
}
