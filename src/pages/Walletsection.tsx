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

  return (
    <div className={`${isDark ? "dark" : ""} flex flex-col items-center gap-6 py-10 px-6`}>
      <h2
        className="text-2xl font-bold text-gradient-nullproof animate-title-glow"
      >
        🚀 Preparing for Launch
      </h2>

      <div className="flex gap-4 text-center">
        {Object.entries(timeLeft).map(([label, value]) => (
          <div
            key={label}
            className="backdrop-blur-lg rounded-xl shadow-lg border border-[var(--glass-border)] px-6 py-4 bg-[var(--glass-bg)] hover:bg-[var(--glass-hover)] transition-all duration-300"
          >
            <div className="text-3xl font-bold text-gradient-nullproof glow-aqua">
              {value}
            </div>
            <div className="text-xs uppercase text-[var(--muted-foreground)] tracking-wider">
              {label}
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-[var(--muted-foreground)]">
        Mark your calendars —{" "}
        <span className="font-semibold text-gradient-nullproof">Sept 1, 2025</span>
      </p>
    </div>
  );
}
