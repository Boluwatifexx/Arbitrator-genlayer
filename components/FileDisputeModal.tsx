"use client";

import { useState, useEffect } from "react";
import { Plus, Loader2, Scale, Users, FileText, Link } from "lucide-react";
import { useFileDispute } from "@/lib/hooks/useDisputeResolution";
import { useWallet } from "@/lib/genlayer/wallet";
import { error } from "@/lib/utils/toast";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const LEGAL_FRAMEWORKS = [
  "Contract Law",
  "Consumer Protection",
  "Employment Law",
  "Intellectual Property",
  "Real Estate Law",
  "Tort Law",
  "Financial Dispute",
  "Service Agreement",
];

// Generate a short unique dispute ID
function generateDisputeId(): string {
  return "DSP-" + Date.now().toString(36).toUpperCase();
}

export function FileDisputeModal() {
  const { isConnected, address, isLoading } = useWallet();
  const { fileDispute, isFiling, isSuccess } = useFileDispute();

  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [legalFramework, setLegalFramework] = useState("");
  const [customFramework, setCustomFramework] = useState("");
  const [respondent, setRespondent] = useState("");

  const [errors, setErrors] = useState({
    title: "",
    legalFramework: "",
    respondent: "",
  });

  // Auto-close when wallet disconnects (unless filing is in progress)
  useEffect(() => {
    if (!isConnected && isOpen && !isFiling) {
      setIsOpen(false);
    }
  }, [isConnected, isOpen, isFiling]);

  // Close and reset on success
  useEffect(() => {
    if (isSuccess) {
      resetForm();
      setIsOpen(false);
    }
  }, [isSuccess]);

  const validateForm = (): boolean => {
    const newErrors = { title: "", legalFramework: "", respondent: "" };

    if (!title.trim()) newErrors.title = "Dispute title is required";
    if (!legalFramework) newErrors.legalFramework = "Please select a legal framework";
    if (!respondent.trim()) newErrors.respondent = "Respondent address or name is required";

    setErrors(newErrors);
    return !Object.values(newErrors).some((e) => e !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected || !address) {
      error("Please connect your wallet first");
      return;
    }

    if (!validateForm()) return;

    const resolvedFramework =
      legalFramework === "__custom__" ? customFramework.trim() : legalFramework;

    fileDispute({
      disputeId: generateDisputeId(),
      title: title.trim(),
      legalFramework: resolvedFramework,
      claimant: address,
      respondent: respondent.trim(),
    });
  };

  const resetForm = () => {
    setTitle("");
    setLegalFramework("");
    setCustomFramework("");
    setRespondent("");
    setErrors({ title: "", legalFramework: "", respondent: "" });
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && !isFiling) resetForm();
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="gradient"
          disabled={!isConnected || !address || isLoading}
        >
          <Plus className="w-4 h-4 mr-2" />
          File Dispute
        </Button>
      </DialogTrigger>

      <DialogContent className="brand-card border-2 sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Scale className="w-6 h-6 text-accent" />
            File a Dispute
          </DialogTitle>
          <DialogDescription>
            Open a new dispute case for AI arbitration on GenLayer
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">

          {/* Dispute Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Dispute Title
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="e.g. Unpaid invoice #4521 / Breach of service contract"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrors({ ...errors, title: "" });
              }}
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title}</p>
            )}
          </div>

          {/* Legal Framework */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Scale className="w-4 h-4" />
              Legal Framework
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {LEGAL_FRAMEWORKS.map((fw) => (
                <button
                  key={fw}
                  type="button"
                  onClick={() => {
                    setLegalFramework(fw);
                    setErrors({ ...errors, legalFramework: "" });
                  }}
                  className={`p-3 rounded-lg border-2 text-left transition-all text-sm ${
                    legalFramework === fw
                      ? "border-accent bg-accent/20 text-accent"
                      : "border-white/10 hover:border-white/20 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {fw}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setLegalFramework("__custom__");
                  setErrors({ ...errors, legalFramework: "" });
                }}
                className={`p-3 rounded-lg border-2 text-left transition-all text-sm col-span-2 ${
                  legalFramework === "__custom__"
                    ? "border-accent bg-accent/20 text-accent"
                    : "border-white/10 hover:border-white/20 text-muted-foreground hover:text-foreground"
                }`}
              >
                Other / Custom Framework
              </button>
            </div>
            {legalFramework === "__custom__" && (
              <Input
                type="text"
                placeholder="Describe the applicable legal framework"
                value={customFramework}
                onChange={(e) => setCustomFramework(e.target.value)}
                className="mt-2"
              />
            )}
            {errors.legalFramework && (
              <p className="text-xs text-destructive">{errors.legalFramework}</p>
            )}
          </div>

          {/* Parties */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Parties
            </Label>
            <div className="space-y-3">
              {/* Claimant (auto-filled) */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Claimant (you)</p>
                <div className="px-3 py-2 rounded-lg bg-muted/10 border border-white/10">
                  <code className="text-xs font-mono text-accent break-all">
                    {address || "—"}
                  </code>
                </div>
              </div>
              {/* Respondent */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Respondent</p>
                <Input
                  id="respondent"
                  type="text"
                  placeholder="Wallet address or name of opposing party"
                  value={respondent}
                  onChange={(e) => {
                    setRespondent(e.target.value);
                    setErrors({ ...errors, respondent: "" });
                  }}
                  className={errors.respondent ? "border-destructive" : ""}
                />
                {errors.respondent && (
                  <p className="text-xs text-destructive">{errors.respondent}</p>
                )}
              </div>
            </div>
          </div>

          {/* Info note */}
          <div className="p-3 rounded-lg bg-muted/10 border border-white/10">
            <p className="text-xs text-muted-foreground">
              After filing, you'll submit your case statement and evidence.
              The respondent will then have the opportunity to submit their rebuttal
              before AI arbitration begins.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={() => setIsOpen(false)}
              disabled={isFiling}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="gradient"
              className="flex-1"
              disabled={isFiling}
            >
              {isFiling ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Filing...
                </>
              ) : (
                <>
                  <Scale className="w-4 h-4 mr-2" />
                  File Dispute
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
