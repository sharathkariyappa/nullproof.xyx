import { useState, useEffect } from "react";
import { Heart, ArrowUpRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
export default function LeaderboardPage({ isDark, myWallet }: { isDark: boolean; myWallet: string }) {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const [lbRes, likesRes] = await Promise.all([
        fetch(`${backendUrl}/api/leaderboard`),
        fetch(`${backendUrl}/api/likes/counts`)
      ]);

      if (lbRes.ok && likesRes.ok) {
        const leaderboardData = await lbRes.json();
        const likesData = await likesRes.json();

        // Set both states
        setLeaderboard(leaderboardData);
        setLikes(likesData);
      }
    } catch (error) {
      console.error("Failed to load leaderboard:", error);
    }
  };

  const handleLike = async (targetWallet: string) => {
    if (!myWallet) {
      alert("Connect your wallet to like!");
      return;
    }
    if (targetWallet === myWallet) {
        toast({
            title: "Not allowed",
            description: "You can not like yourself.",
            variant: "destructive",
          });
      return;
    }

    try {
      const res = await fetch(`${backendUrl}/api/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetWallet, likerWallet: myWallet })
      });

      if (res.ok) {
        loadLeaderboard();
      } else {
        const error = await res.json();
        alert(error.error);
      }
    } catch (err) {
      console.error("Error liking user:", err);
    }
  };

  const shareScore = (username: string, score: number) => {
    const text = `🚀 My Degen Score: ${score}/100 on NullProof! Can you beat me? 🏆
  
  Come to https://nullproof.xyz and like scores in the dashboard to earn rewards! 🔥`;
  
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };
  

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gradient-nullproof animate-title-glow text-center">
        🏆 Degen Leaderboard
      </h1>

      <div className="space-y-3">
        {leaderboard?.slice(0, 10)?.map((entry, index) => (
          <div
            key={entry.wallet}
            className={`flex items-center justify-between p-4 rounded-lg shadow-md border transition hover:scale-[1.02] ${
              isDark ? "bg-[var(--glass-bg)] border-[var(--glass-border)]" : "bg-white border-gray-200"
            }`}
          >
            {/* Rank */}
            <div className="flex items-center gap-3">
              <span
                className={`text-lg font-bold ${
                  index < 3 ? "text-yellow-400" : isDark ? "text-gray-200" : "text-gray-700"
                }`}
              >
                #{index + 1}
              </span>
              {/* Avatar */}
              <img
                src={entry.avatar || "/default-avatar.png"}
                alt={entry.username}
                className="w-10 h-10 rounded-full border border-[var(--primary)]"
              />
              {/* Username + Wallet */}
              <div>
                <p className={`text-sm font-semibold truncate ${isDark ? "text-white" : "text-gray-900"}`}>
                  {entry.username || "Unknown"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {entry.walletAddress
                    ? `${entry.walletAddress.slice(0, 6)}...${entry.walletAddress.slice(-4)}`
                    : "No wallet"}
                </p>
              </div>
            </div>

            {/* Score + Actions */}
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold text-emerald-400">{entry.score}</span>

              {/* Like */}
              <button
                onClick={() => handleLike(entry.walletAddress)}
                className="flex items-center gap-1 text-pink-500 hover:text-pink-400 transition"
              >
                <Heart className="w-4 h-4 fill-pink-500" />
                <span>{likes[entry.walletAddress] || 0}</span>
              </button>

              {/* Share */}
              <button
                onClick={() => shareScore(entry.username, entry.score)}
                className="text-blue-400 hover:text-blue-300"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Engagement Call-to-Action */}
      <div
        className={`mt-8 p-4 rounded-xl text-center shadow-lg ${
          isDark ? "bg-[var(--gradient-primary)]" : "bg-gradient-nullproof"
        }`}
      >
        <p className="font-bold text-white">
          Top 3 will earn exclusive $CRT tokens at launch 🚀
        </p>
        <p className="text-sm text-white/80">Keep grinding, degen. Make it to the top!</p>
      </div>
    </div>
  );
}
