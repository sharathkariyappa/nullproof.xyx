import { useState, useEffect } from "react";

export default function Walletsection({ isDark }: { isDark: boolean }) {
  const launchDate = new Date("2025-09-01T00:00:00Z").getTime();
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

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
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const titleClass = isDark
    ? "text-gradient-nullproof"
    : "text-black";
  const timerValueClass = isDark
    ? "text-gradient-nullproof glow-aqua"
    : "text-black font-bold";

  return (
    <div className={`${isDark ? "dark" : ""} flex flex-col items-center gap-6 py-10 px-6`}>
      {/* Title */}
      <h2 className={`text-2xl font-bold ${titleClass}`}>
        Preparing for Launch
      </h2>

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
            <div className={`text-3xl font-bold ${timerValueClass}`}>
              {value}
            </div>
            <div className="text-xs uppercase text-[var(--muted-foreground)] tracking-wider">
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Text */}
      <p className="text-sm text-[var(--muted-foreground)]">
        Mark your calendars —{" "}
        <span className={`font-semibold ${titleClass}`}>Sept 1, 2025</span>
      </p>
    </div>
  );
}
