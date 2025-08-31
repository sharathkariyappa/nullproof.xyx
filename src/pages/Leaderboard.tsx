import { useState, useEffect } from "react";
import { Heart, ArrowUpRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function LeaderboardPage({ isDark, myWallet }: { isDark: boolean; myWallet: string }) {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [loadingWallet, setLoadingWallet] = useState<string | null>(null);

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
  
    setLoadingWallet(targetWallet);
  
    try {
      // 1️⃣ Check if like is possible (prevent duplicates)
      const checkRes = await fetch(
        `${backendUrl}/api/likes/check?targetWallet=${targetWallet.toLowerCase()}&likerWallet=${myWallet.toLowerCase()}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
  
      const checkData = await checkRes.json();
  
      if (!checkRes.ok) {
        toast({
          title: "Like not allowed",
          description: checkData.error || "You can't like this user right now.",
          variant: "destructive",
        });
        return;
      }
  
      // 🚨 Stop if already liked
      if (checkData.liked) {
        toast({
          title: "Already liked",
          description: `You have already liked ${targetWallet.slice(0, 6)}...${targetWallet.slice(-4)}.`,
          variant: "destructive",
        });
        return;
      }
  
      // 2️⃣ Burn CRT only if like check passed
      const burnRes = await fetch(`${backendUrl}/api/contract/burn/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: myWallet.toLowerCase(),
          amount: "0.5",
        }),
      });
  
      const burnData = await burnRes.json();
      if (!burnRes.ok) {
        toast({
          title: "Like failed",
          description: burnData.error || "Not enough balance to like.",
          variant: "destructive",
        });
        return;
      }
  
      // 3️⃣ Finalize like
      const likeRes = await fetch(`${backendUrl}/api/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetWallet: targetWallet.toLowerCase(),
          likerWallet: myWallet.toLowerCase(),
        }),
      });
  
      const likeData = await likeRes.json();
      if (likeRes.ok) {
        toast({
          title: "Liked!",
          description: `You liked ${targetWallet.slice(0, 6)}...${targetWallet.slice(-4)}`,
        });
        loadLeaderboard();
      } else {
        toast({
          title: "Like failed",
          description: likeData.error || "Unknown error during liking.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Error liking user:", err);
      toast({
        title: "Error",
        description: "Something went wrong while liking the user.",
        variant: "destructive",
      });
    } finally {
      setLoadingWallet(null);
    }
  };

  const shareScore = (username: string, score: number) => {
    const text = `🚀 Hey My Degen Score: ${score}/100 on @nullproof_xyz Can you beat me? 🏆
  
  Come to https://nullproof.xyz and like scores in the dashboard to earn rewards! 🔥`;

    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Title */}
      <h1
        className={`text-3xl font-bold text-center ${
          isDark ? "text-gradient-nullproof" : "text-black"
        }`}
      >
        Degen Leaderboard
      </h1>

      {/* Leaderboard Entries */}
      <div className="space-y-3">
        {leaderboard?.slice(0, 10)?.map((entry, index) => (
          <div
            key={entry.wallet}
            className={`flex items-center justify-between p-4 rounded-lg shadow-md border transition hover:scale-[1.02] ${
              isDark
                ? "bg-[var(--glass-bg)] border border-[var(--glass-border)]"
                : "bg-white border border-gray-200"
            }`}
          >
            {/* Rank + Avatar */}
            <div className="flex items-center gap-3">
              <span
                className={`text-lg font-bold ${
                  index < 3
                    ? "text-yellow-400"
                    : isDark
                    ? "text-gray-200"
                    : "text-gray-700"
                }`}
              >
                #{index + 1}
              </span>
              <img
                src={entry.avatar || "/default-avatar.png"}
                alt={entry.username}
                className="w-10 h-10 rounded-full border border-[var(--primary)]"
              />
              <div>
                <p
                  className={`text-sm font-semibold truncate ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
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
              <span className="text-lg font-bold text-emerald-400">
                {entry.score}
              </span>
              <button
                onClick={() => handleLike(entry.walletAddress)}
                disabled={loadingWallet === entry.walletAddress}
                className="flex items-center gap-1 text-pink-500 hover:text-pink-400 transition disabled:opacity-50"
              >
                {loadingWallet === entry.walletAddress ? (
                  <Heart className="w-4 h-4 animate-ping fill-pink-400" />
                ) : (
                  <Heart className="w-4 h-4 fill-pink-500" />
                )}
                <span>{likes[entry.walletAddress?.toLowerCase()] || 0}</span>
              </button>
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

      {/* Call-to-Action */}
      <div
        className={`mt-8 p-4 rounded-xl text-center shadow-lg border ${
          isDark
            ? "bg-transparent border-[var(--glass-border)]"
            : "bg-white/90 border-gray-100"
        }`}
      >
        <p className="font-bold">
          Top 3 will earn exclusive $CRT tokens at launch
        </p>
        <p className="text-sm">
          Keep grinding, degen. Make it to the top!
        </p>
      </div>
    </div>
  );
}
