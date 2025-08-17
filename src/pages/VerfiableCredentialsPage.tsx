import { BadgeCheck, Lock, Coins, ShieldCheck, Clock, ArrowRight } from "lucide-react";

type Props = {
  isDark: boolean;
  myWallet?: string;
};

export default function VerifiableCredentialsPage({ isDark, myWallet }: Props) {
  const card = isDark
    ? "bg-[var(--glass-bg)] border-[var(--glass-border)]"
    : "bg-white border-gray-200";

  const pill = "px-2.5 py-1 rounded-full text-xs font-medium";

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2">
          <span className={`${pill} bg-emerald-500/10 text-emerald-400 border border-emerald-400/30`}>
            Verifiable Credentials
          </span>
          <span className={`${pill} bg-yellow-500/10 text-yellow-400 border border-yellow-400/30 flex items-center gap-1`}>
            <Clock className="w-3.5 h-3.5" /> Coming Soon
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gradient-nullproof animate-title-glow">
          On-chain, Tamper-proof Identity
        </h1>
        <p className={`text-sm md:text-base ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Mint cryptographic credentials that prove your contributions and activity — secured on-chain.
        </p>
      </div>

      {/* Requirement / CTA */}
      <div className={`p-5 rounded-2xl border shadow-xl ${card}`}>
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-nullproof shadow-md">
            <Coins className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1">
            <h2 className="font-semibold mb-1">Stake $CRT to Issue Credentials</h2>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              To create and anchor a VC on-chain, you’ll stake a small amount of <b>$CRT</b>. 
              Staked tokens secure the network and enable revocation & updates.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                disabled
                className="px-4 py-2 rounded-lg bg-gradient-nullproof text-white font-medium shadow-md opacity-70 cursor-not-allowed"
                title="Launching soon"
              >
                Stake $CRT (soon)
              </button>

              <a
                href="https://nullproof.xyz"
                target="_blank"
                rel="noreferrer"
                className={`px-4 py-2 rounded-lg border font-medium flex items-center gap-2 transition ${
                  isDark
                    ? "border-[var(--glass-border)] hover:bg-[var(--glass-hover)]"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </a>

              <span className={`ml-auto text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                {myWallet ? `Connected: ${myWallet.slice(0, 6)}...${myWallet.slice(-4)}` : "Wallet not connected"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Preview of what VCs will cover */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className={`p-4 rounded-2xl border ${card}`}>
          <div className="flex items-center gap-2 mb-2">
            <BadgeCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold">Proof of Contribution</h3>
          </div>
          <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Verify GitHub commits, PRs, issues, and repo impact as a credential.
          </p>
        </div>

        <div className={`p-4 rounded-2xl border ${card}`}>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-semibold">On-chain Activity</h3>
          </div>
          <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Anchor your degen score, governance votes, and NFT provenance.
          </p>
        </div>

        <div className={`p-4 rounded-2xl border ${card}`}>
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-violet-400" />
            <h3 className="text-sm font-semibold">Privacy-First</h3>
          </div>
          <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Selective disclosure & revocation. You control what you reveal.
          </p>
        </div>
      </div>

      {/* Minimal roadmap strip */}
      <div className={`p-4 rounded-2xl border ${card} flex flex-wrap items-center justify-between gap-3`}>
        <div className="text-sm">
          <span className="font-semibold">Roadmap:</span>{" "}
          Issue VC → Verify VC → Revoke/Update VC → Cross-app attestations
        </div>
        <div className="flex items-center gap-2">
          <span className={`${pill} bg-emerald-500/10 text-emerald-400 border border-emerald-400/30`}>Phase 1</span>
          <span className={`${pill} bg-sky-500/10 text-sky-400 border border-sky-400/30`}>Q4 Preview</span>
        </div>
      </div>
    </div>
  );
}
