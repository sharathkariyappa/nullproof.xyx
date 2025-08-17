import { Rocket, Users, Lock } from "lucide-react";

export default function DaoPage({ isDark }: { isDark: boolean }) {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <Rocket className="w-10 h-10 mx-auto text-pink-500 animate-bounce" />
        <h1 className="text-3xl font-bold text-gradient-nullproof animate-title-glow">
          🚀 DAO is Coming Soon
        </h1>
        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Stake your <span className="text-yellow-400 font-bold">$CRT</span> tokens to participate in governance.  
          Let’s make the community bang 💥
        </p>
      </div>

      {/* Info Card */}
      <div
        className={`rounded-xl border shadow-xl backdrop-blur-xl p-6 ${
          isDark
            ? "bg-gray-900/70 border-gray-800/50"
            : "bg-white/90 border-gray-200"
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-6 h-6 text-emerald-400" />
          <h2
            className={`text-xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Why Join the DAO?
          </h2>
        </div>
        <ul className="space-y-3 text-sm">
          <li className="flex gap-2">
            <span className="text-pink-500">🔥</span> Vote on important
            community decisions
          </li>
          <li className="flex gap-2">
            <span className="text-yellow-400">💰</span> Earn exclusive DAO-only rewards
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-400">⚡</span> Shape the future of NullProof
          </li>
        </ul>
      </div>

      {/* Call to Action */}
      <div
        className={`text-center p-6 rounded-xl shadow-lg ${
          isDark
            ? "bg-[var(--gradient-primary)]"
            : "bg-gradient-nullproof"
        }`}
      >
        <Lock className="w-8 h-8 mx-auto text-white mb-3" />
        <h3 className="text-lg font-bold text-white">
          Stake $CRT to Unlock Your Voice
        </h3>
        <p className="text-sm text-white/80">
          DAO launch is around the corner. Load up your $CRT and get ready to
          vote, degen.
        </p>
      </div>
    </div>
  );
}
