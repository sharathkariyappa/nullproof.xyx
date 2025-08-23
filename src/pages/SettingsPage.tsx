import { useState, useEffect } from "react";
import { Shield, Bell } from "lucide-react";

export default function SettingsPage({
  isDark,
  myWallet,
}: {
  isDark: boolean;
  myWallet: string;
}) {
  const [username, setUsername] = useState("AnonDegen");
  const [notifications, setNotifications] = useState(true);
  const [githubUser, setGithubUser] = useState<string | null>(null);
  const [showWallet, setShowWallet] = useState(true);

  const cardStyle = isDark
    ? "bg-[var(--glass-bg)] border-[var(--glass-border)]"
    : "bg-white border-gray-200";

  const titleClass = isDark ? "text-gradient-nullproof" : "text-black";
  const btnGradient = isDark
    ? "bg-gradient-nullproof text-white"
    : "bg-black text-white";

  // Parse GitHub username from cookie if available
  function getGithubUsernameFromCookie() {
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith("github_user="));
    if (!match) return null;
    try {
      const userData = JSON.parse(decodeURIComponent(match.split("=")[1]));
      return userData;
    } catch {
      return null;
    }
  }

  useEffect(() => {
    const userData = getGithubUsernameFromCookie();
    if (userData?.login) {
      setGithubUser(userData.login);
      setUsername(userData.login);
    }
  }, []);

  const saveSettings = () => {
    alert("Settings saved");
  };

  return (
    <div className="max-w-lg mx-auto p-6 space-y-5">
      {/* Header */}
      <h1 className={`text-3xl font-bold text-center mb-4 ${titleClass}`}>
        Settings
      </h1>

      {/* Username & Wallet */}
      <div className={`p-4 rounded-xl border ${cardStyle}`}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`w-full rounded-lg px-3 py-2 mb-3 border ${
            isDark
              ? "bg-black/30 border-gray-600 text-white"
              : "bg-gray-50 border-gray-300 text-black"
          }`}
          placeholder="Username"
        />
        <p className="text-xs text-gray-500 truncate">
          Wallet: {myWallet || "Not connected"}
        </p>
      </div>

      {/* DAO Launch Info */}
      <div
        className={`p-4 rounded-xl border flex items-center justify-between ${cardStyle}`}
      >
        <div className="flex items-center gap-2">
          <Shield
            className={`w-5 h-5 ${
              isDark ? "text-gradient-nullproof" : "text-black"
            }`}
          />
          <span className={isDark ? "text-gray-200" : "text-gray-800"}>
            DAO launching soon
          </span>
        </div>
      </div>

      {/* Notifications */}
      <div
        className={`p-4 rounded-xl border flex items-center justify-between ${cardStyle}`}
      >
        <div className="flex items-center gap-2">
          <Bell
            className={`w-5 h-5 ${
              isDark ? "text-gradient-nullproof" : "text-black"
            }`}
          />
          <span className={isDark ? "text-gray-200" : "text-gray-800"}>
            Notify me on new likes
          </span>
        </div>
        <input
          type="checkbox"
          checked={notifications}
          onChange={() => setNotifications(!notifications)}
          className="w-4 h-4 accent-current"
        />
      </div>

      {/* Privacy */}
      <div
        className={`p-4 rounded-xl border flex items-center justify-between ${cardStyle}`}
      >
        <span className={isDark ? "text-gray-200" : "text-gray-800"}>
          Show wallet on leaderboard
        </span>
        <input
          type="checkbox"
          checked={showWallet}
          onChange={() => setShowWallet(!showWallet)}
          className="w-4 h-4 accent-current"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={saveSettings}
        className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium shadow-md"
      >
        Save
      </button>
    </div>
  );
}
