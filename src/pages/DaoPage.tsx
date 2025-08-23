import { Rocket, Users, Lock, Clock } from "lucide-react";

export default function DaoPage({ isDark }: { isDark: boolean }) {
  const titleClass = isDark ? "text-gradient-nullproof" : "text-black";
  const iconClass = isDark ? "text-gradient-nullproof" : "text-black";
  const cardClass = isDark
    ? "bg-transparent border-[var(--glass-border)]"
    : "bg-white border-gray-200";
  const pill = "px-2.5 py-1 rounded-full text-xs font-medium";
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div
          className={`${pill} bg-yellow-500/10 text-yellow-400 border border-yellow-400/30 flex items-center gap-2 justify-center inline-flex py-1.5 px-3 rounded-full`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span className="font-medium">Coming Soon</span>
        </div>

        <p
          className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
        >
          Stake your <span className="text-yellow-400 font-bold">$CRT</span> tokens to participate in governance.
          Let’s make the community bang.
        </p>
      </div>

      {/* Info Card */}
      <div
        className={`rounded-xl border shadow-xl p-6 ${cardClass}`}
      >
        <div className="flex items-center gap-3 mb-4">
          <Users className={`w-6 h-6 ${iconClass}`} />
          <h2 className={`text-xl font-bold ${titleClass}`}>
            Why Join the DAO?
          </h2>
        </div>
        <ul className={`space-y-3 text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          <li className="flex gap-2 items-center">Vote on important community decisions</li>
          <li className="flex gap-2 items-center">Earn exclusive DAO-only rewards</li>
          <li className="flex gap-2 items-center">Shape the future of NullProof</li>
        </ul>
      </div>

      {/* Call to Action */}
      <div
        className={`text-center p-6 rounded-xl shadow-lg border transition-colors ${cardClass}`}
      >
        <Lock className={`w-8 h-8 mx-auto mb-3 ${iconClass}`} />
        <h3 className={`text-lg font-bold ${titleClass}`}>
          Stake $CRT to Unlock Your Voice
        </h3>
        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          DAO launch is around the corner. Load up your $CRT and get ready to
          vote, degen.
        </p>
      </div>
    </div>
  );
}
