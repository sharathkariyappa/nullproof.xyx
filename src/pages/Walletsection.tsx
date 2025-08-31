import { useState, useEffect } from "react";

interface Activity {
  label: string;
  amount: string;
}

export default function Walletsection({
  isDark,
  myWallet
}: {
  isDark: boolean;
  myWallet: string;
}) {
  const launchDate = new Date("2025-09-15T00:00:00Z").getTime();
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const [activities, setActivities] = useState<Activity[]>([]);
  const [rewards, setRewards] = useState<string>("0.0");
  const [lastActivityDate, setLastActivityDate] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  function getTimeRemaining() {
    const now = new Date().getTime();
    const diff = launchDate - now;
    return {
      days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
      hours: Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24)),
      minutes: Math.max(0, Math.floor((diff / (1000 * 60)) % 60)),
      seconds: Math.max(0, Math.floor((diff / 1000) % 60)),
    };
  }

  useEffect(() => {
    if (!myWallet) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch activity
        const activityRes = await fetch(
          `${backendUrl}/api/contract/activity/${myWallet}`
        );
        const activityData = await activityRes.json();

        // Transform response into list for display
        const parsedActivities: Activity[] = [
          { label: "Total Staked", amount: `${activityData.totalStaked} CRT` },
          { label: "Total Burned", amount: `${activityData.totalBurned} CRT` },
          { label: "Staking Actions", amount: activityData.stakingCount },
          { label: "Burn Actions", amount: activityData.burnCount },
        ];

        setActivities(parsedActivities);
        setLastActivityDate(activityData.lastActivityDate);

        // Fetch rewards
        const rewardsRes = await fetch(
          `${backendUrl}/api/contract/rewards/${myWallet}`
        );
        const rewardsData = await rewardsRes.json();
        setRewards(rewardsData.pendingRewards || "0.0");
      } catch (err) {
        console.error("Error fetching wallet data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [myWallet, backendUrl]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const titleClass = isDark ? "text-gradient-nullproof" : "text-black";
  const timerValueClass = isDark
    ? "text-gradient-nullproof glow-aqua"
    : "text-black font-bold";

  return (
    <div className={`${isDark ? "dark" : ""} flex flex-col items-center gap-6 py-10 px-6`}>
      {/* Title */}
      <h2 className={`text-2xl font-bold ${titleClass}`}>Preparing for Launch</h2>

      {/* Countdown Timer */}
      <div className="flex gap-4 text-center">
        {Object.entries(timeLeft).map(([label, value]) => (
          <div
            key={label}
            className={`rounded-xl shadow-lg border px-6 py-4 transition-all duration-300 hover:bg-[var(--glass-hover)]
              ${isDark
                ? "bg-transparent border-gray-800/50 border-[var(--glass-border)]"
                : "bg-white/90 border-gray-100"
              }`}
          >
            <div className={`text-3xl font-bold ${timerValueClass}`}>{value}</div>
            <div className="text-xs uppercase text-[var(--muted-foreground)] tracking-wider">
              {label}
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-[var(--muted-foreground)]">
        Mark your calendars —{" "}
        <span className={`font-semibold ${titleClass}`}>Sept 15, 2025</span>
      </p>

      {/* Wallet Activity */}
      <div className={`w-full mt-8 p-6 rounded-xl shadow-lg ${
        isDark
          ? "bg-transparent border-gray-800/50 border-[var(--glass-border)]"
          : "bg-white/90 border-gray-100"
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${titleClass}`}>Wallet Activity</h3>

        {loading ? (
          <p className={`text-sm ${titleClass}`}>Loading activity...</p>
        ) : (
          <>
            <ul className="space-y-3">
              {activities.map((activity, index) => (
                <li key={index} className="flex justify-between text-sm border-b pb-2">
                  <span>{activity.label}</span>
                  <span className="font-semibold">{activity.amount}</span>
                </li>
              ))}
            </ul>

            {lastActivityDate && (
              <p className="mt-4 text-xs text-gray-500 text-center">
                Last activity: {new Date(lastActivityDate).toLocaleString()}
              </p>
            )}
          </>
        )}

        {/* Rewards */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Estimated Rewards</p>
          <p className={`text-2xl font-bold ${titleClass}`}>{rewards} CRT</p>
        </div>
      </div>
    </div>
  );
}
