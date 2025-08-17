import { useState, useEffect } from "react";
import { Gift, Shield, Bell } from "lucide-react";

export default function SettingsPage({ isDark, myWallet }: { isDark: boolean; myWallet: string }) {
  const [username, setUsername] = useState("AnonDegen");
  const [notifications, setNotifications] = useState(true);
  const [githubUser, setGithubUser] = useState(null);
  const [showWallet, setShowWallet] = useState(true);

  const saveSettings = () => {
    alert("✅ Settings saved");
  };

  const cardStyle = isDark
    ? "bg-[var(--glass-bg)] border-[var(--glass-border)]"
    : "bg-white border-gray-200";

function getGithubUsernameFromCookie() {
    const match = document.cookie
        .split("; ")
        .find(row => row.startsWith("github_user="));
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
    setGithubUser(userData?.login);
}, []);

  return (
    <div className="max-w-lg mx-auto p-6 space-y-5">
      <h1 className="text-3xl font-bold text-gradient-nullproof text-center mb-4">
        ⚙️ Settings
      </h1>

      {/* Username & Wallet */}
      <div className={`p-4 rounded-xl border ${cardStyle}`}>
        <input
          type="text"
          value={githubUser}
          onChange={(e) => setUsername(e.target.value)}
          className={`w-full rounded-lg px-3 py-2 mb-3 border ${
            isDark ? "bg-black/30 border-gray-600 text-white" : "bg-gray-50 border-gray-300"
          }`}
          placeholder="Username"
        />
        <p className="text-xs text-gray-500 truncate">
          Wallet: {myWallet || "Not connected"}
        </p>
      </div>

      {/* DAO */}
      <div className={`p-4 rounded-xl border ${cardStyle} flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-400" />
          <span>DAO launching soon</span>
        </div>
        <button
          disabled
          className="px-3 py-1 rounded-md bg-gradient-to-r from-emerald-500 to-teal-400 text-white text-xs"
        >
          Coming Soon
        </button>
      </div>

      {/* Notifications */}
      <div className={`p-4 rounded-xl border ${cardStyle} flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-yellow-400" />
          <span>Notify me on new likes</span>
        </div>
        <input
          type="checkbox"
          checked={notifications}
          onChange={() => setNotifications(!notifications)}
          className="w-4 h-4"
        />
      </div>

      {/* Privacy */}
      <div className={`p-4 rounded-xl border ${cardStyle} flex items-center justify-between`}>
        <span>Show wallet on leaderboard</span>
        <input
          type="checkbox"
          checked={showWallet}
          onChange={() => setShowWallet(!showWallet)}
          className="w-4 h-4"
        />
      </div>

      {/* Save */}
      <button
        onClick={saveSettings}
        className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium"
      >
        Save
      </button>
    </div>
  );
}
