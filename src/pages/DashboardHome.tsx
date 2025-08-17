import React, { useState, useEffect } from 'react';
import { Github, Loader2, CheckCircle, AlertCircle, User, Trophy, Zap,  Twitter } from 'lucide-react';

interface DashboardHomeProps {
  isDark: boolean;
}

const DashboardHome = ({ isDark, walletAddress }: { isDark: boolean; walletAddress: string }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [score, setScore] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [githubUser, setGithubUser] = useState(null);
  const [currentMeme, setCurrentMeme] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, averageScore: 0, highestScore: 0 });

  // Enhanced Wojak SVG Components
  const WojakHappy = () => (
    <div className={`relative w-10 h-10 ${isDark ? 'bg-green-900/30' : 'bg-green-100'} rounded-full border ${isDark ? 'border-green-500/50' : 'border-green-500'} flex items-center justify-center overflow-hidden`}>
      <img src='/pro.png' alt="Pro" className="w-full h-full object-cover" />
      <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
    </div>
  );

  const WojakThinking = () => (
    <div className={`relative w-10 h-10 ${isDark ? 'bg-yellow-900/30' : 'bg-yellow-100'} rounded-full border ${isDark ? 'border-yellow-500/50' : 'border-yellow-500'} flex items-center justify-center overflow-hidden`}>
      <img src='/medium.png' alt="Medium" className="w-full h-full object-cover" />
    </div>
  );

  const WojakSad = () => (
    <div className={`relative w-10 h-10 ${isDark ? 'bg-red-900/30' : 'bg-red-100'} rounded-full border ${isDark ? 'border-red-500/50' : 'border-red-500'} flex items-center justify-center overflow-hidden`}>
      <img src='/cry.png' alt="Cry" className="w-full h-full object-cover" />
    </div>
  );

  const WojakLoading = () => (
    <div className={`relative w-10 h-10 ${isDark ? 'bg-purple-900/30' : 'bg-purple-100'} rounded-full border ${isDark ? 'border-purple-500/50' : 'border-purple-500'} flex items-center justify-center overflow-hidden`}>
      <img src='/think.jpeg' alt="Think" className='animate-spin w-full h-full object-cover' />
    </div>
  );
  const Initial = () => (
    <div className={`relative w-10 h-10 ${isDark ? 'bg-purple-900/30' : 'bg-purple-100'} rounded-full border ${isDark ? 'border-purple-500/50' : 'border-purple-500'} flex items-center justify-center overflow-hidden`}>
      <img src='/thinking.gif' alt="Think" className='w-full h-full object-cover' />
    </div>
  );
  
  const Gigachad = () => (
    <div className={`relative w-8 h-8 ${isDark ? 'bg-emerald-900/30' : 'bg-emerald-100'} rounded-full border ${isDark ? 'border-emerald-500/50' : 'border-emerald-500'} flex items-center justify-center overflow-hidden`}>
      <img src='/gigachad.jpg' alt="Gigachad" className="w-full h-full object-cover" />
    </div>
  );
  
  const Noobie = () => (
    <div className={`relative w-8 h-8 ${isDark ? 'bg-red-900/30' : 'bg-red-100'} rounded-full border ${isDark ? 'border-red-500/50' : 'border-red-500'} flex items-center justify-center overflow-hidden`}>
      <img src='/noobie.png' alt="Noobie" className="w-full h-full object-cover" />
    </div>
  );
  
  const Average = () => (
    <div className={`relative w-8 h-8 ${isDark ? 'bg-yellow-900/30' : 'bg-yellow-100'} rounded-full border ${isDark ? 'border-yellow-500/50' : 'border-yellow-500'} flex items-center justify-center overflow-hidden`}>
      <img src ='/experienced.png' alt="Experienced" className="w-full h-full object-cover" />
    </div>
  );

  // More Web3 memes
  const memes = [
    "wen moon? 🌙",
    "diamond hands only 💎🙌", 
    "this is the gwei 🚀",
    "probably nothing... 👀",
    "few understand 🧠",
    "have fun staying poor 😏",
    "number go up 📈",
    "ser, this is a casino 🎰",
    "bullish af 🐂",
    "ngmi but wagmi 🤝"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMeme((prev) => (prev + 1) % memes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
    setGithubUser(userData);
    // Load leaderboard and stats
    loadLeaderboard();
    loadStats();

    // Set up periodic refresh for real-time data
    const refreshInterval = setInterval(() => {
      loadLeaderboard();
      loadStats();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(refreshInterval);
  }, []);

  // Leaderboard management functions
  const loadLeaderboard = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/leaderboard`);
      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data);
      }
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
      // Fallback to empty array
      setLeaderboard([]);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/leaderboard/stats`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const updateLeaderboard = async (userData, userScore) => {
    const newEntry = {
      username: userData.login,
      walletAddress: walletAddress,
      score: userScore,
      tier: getScoreTier(userScore)?.tier,
      avatar: userData.avatar_url,
      githubId: userData.id
    };
    
    try {
      // Update backend leaderboard
      await fetch(`${backendUrl}/api/leaderboard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry)
      });
      
      // Refresh leaderboard and stats from server
      await Promise.all([loadLeaderboard(), loadStats()]);
    } catch (error) {
      console.error('Failed to update leaderboard:', error);
    }
  };

  const connectGitHub = () => {
    window.location.href = `${backendUrl}/auth/github`;
  };

  const fetchDegenScore = async () => {
    const userData = getGithubUsernameFromCookie();

    if (!userData) {
      setError("anon pls connect github first... ngmi without it 🤡");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`${backendUrl}/api/score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          githubUsername: userData.login,
          address: walletAddress,
          useExternalModel: true
        })
      });

      if (!res.ok) throw new Error("rekt by api... probably rugged 📉");

      const data = await res.json();
      const userScore = data.model.score;
      setScore(userScore);
      
      // Update leaderboard with new score
      updateLeaderboard(userData, userScore);
      
    } catch (err) {
      setError(err.message);
      setScore(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreTier = (score) => {
    if (!score) return null;
    const totalScore = score || 0;
    if (totalScore >= 80) return { 
      tier: "gigachad anon", 
      color: "text-emerald-400", 
      bgColor: isDark ? "bg-emerald-500/10 border-emerald-500/30" : "bg-emerald-50 border-emerald-200",
      wojak: <WojakHappy />,
      icon: <Gigachad />,
      message: "you made it anon... absolute legend",
      emoji: "👑"
    };
    if (totalScore >= 60) return { 
      tier: "chad anon", 
      color: "text-green-400", 
      bgColor: isDark ? "bg-green-500/10 border-green-500/30" : "bg-green-50 border-green-200",
      wojak: <WojakHappy />,
      icon: <Gigachad />,
      message: "pretty based ngl... keep grinding",
      emoji: "🔥"
    };
    if (totalScore >= 40) return { 
      tier: "average anon",
      color: "text-yellow-400", 
      bgColor: isDark ? "bg-yellow-500/10 border-yellow-500/30" : "bg-yellow-50 border-yellow-200",
      wojak: <WojakThinking />,
      icon: <Average />,
      message: "not bad anon... but could be more based",
      emoji: "📈"
    };
    return { 
      tier: "noobie anon", 
      color: "text-red-400", 
      bgColor: isDark ? "bg-red-500/10 border-red-500/30" : "bg-red-50 border-red-200",
      wojak: <WojakSad />,
      icon: <Noobie />,
      message: "sorry anon... time to touch grass and code more",
      emoji: "📉"
    };
  };

  const shareOnTwitter = () => {
    const tierInfo = getScoreTier(score);
    const shareText = `Just checked my degen score on @nullproof_xyz 🚀\n\nScore: ${score}/100\nTier: ${tierInfo?.tier}\n\n${tierInfo?.message}\n\nCheck yours: nullproof.xyz\n\n#DegenScore #Web3 #BuildOnChain`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'} relative overflow-hidden`}>
      {/* Floating meme stickers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 text-2xl animate-bounce">🚀</div>
        <div className="absolute top-20 right-20 text-2xl animate-pulse">💎</div>
        <div className="absolute bottom-20 left-20 text-2xl animate-bounce animation-delay-2s">🌙</div>
        <div className="absolute bottom-10 right-10 text-2xl animate-pulse animation-delay-4s">🔥</div>
        <div className="absolute top-1/2 left-10 text-xl animate-spin slow-spin">⚡</div>
        <div className="absolute top-1/3 right-1/4 text-xl animate-bounce animation-delay-3s">🎯</div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-4">
        {/* Compact Header */}
        <div className="text-center py-4 mb-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${isDark ? 'bg-gray-900/50 border-gray-700/50' : 'bg-white/80 border-gray-200'} rounded-full border backdrop-blur-sm text-sm`}>
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'} font-mono`}>nullproof</span>
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          
          <h1 className={`text-3xl font-black mt-2 mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            degen score checker
          </h1>
          
          <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'} font-mono transition-all duration-500`}>
            {memes[currentMeme]}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Main Score Card */}
          <div className="lg:col-span-2">
            <div className={`${isDark ? 'bg-gray-900/70 border-gray-800/50' : 'bg-white/90 border-gray-200'} backdrop-blur-xl border rounded-xl p-4 shadow-xl`}>
              
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                {isLoading ? <WojakLoading /> : 
                 score ? getScoreTier(score)?.wojak : 
                 githubUser ? <Initial />: <WojakLoading />}
                <div className="flex-1">
                  <h2 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    check your degen level
                  </h2>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} font-mono text-xs`}>
                    are you based or just another normie?
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-green-400 text-xs font-mono">
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                    <span>online</span>
                  </div>
                </div>
              </div>

              {/* GitHub Status */}
              <div className={`p-3 rounded-lg border mb-4 ${
                githubUser 
                  ? isDark ? 'bg-gray-800/30 border-gray-700/50' : 'bg-green-50/50 border-green-200/50'
                  : isDark ? 'bg-gray-800/50 border-gray-700/70' : 'bg-gray-100/50 border-gray-300/50'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                      githubUser 
                        ? 'bg-green-500/20 text-green-400' 
                        : isDark ? 'bg-gray-600/20 text-gray-400' : 'bg-gray-300/50 text-gray-600'
                    }`}>
                      {githubUser ? <CheckCircle className="w-3 h-3" /> : <Github className="w-3 h-3" />}
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {githubUser ? 'connected ✓' : 'not connected'}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} font-mono`}>
                        {githubUser ? `@${githubUser.login}` : 'connect to start'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={connectGitHub}
                  className={`group p-2.5 rounded-lg font-semibold transition-all duration-300 text-sm ${
                    githubUser 
                      ? isDark ? 'bg-gray-800/30 text-gray-500 cursor-not-allowed border border-gray-800' : 'bg-gray-200/50 text-gray-400 cursor-not-allowed border border-gray-300'
                      : isDark ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 hover:border-gray-600' : 'bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 hover:border-gray-600'
                  }`}
                  disabled={githubUser}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Github className="w-3 h-3" />
                    <span className="font-mono text-xs">
                      {githubUser ? 'connected' : 'connect'}
                    </span>
                  </div>
                </button>

                <button
                  onClick={fetchDegenScore}
                  disabled={isLoading || !githubUser}
                  className={`group ${isDark ? 'bg-white hover:bg-gray-100 text-gray-900' : 'bg-gray-900 hover:bg-gray-800 text-white'} font-semibold p-2.5 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span className="font-mono text-xs">checking...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3 h-3" />
                        <span className="font-mono text-xs">check score</span>
                      </>
                    )}
                  </div>
                </button>
              </div>

              {/* Error */}
              {error && (
                <div className={`p-2 rounded-lg mb-4 ${isDark ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-3 h-3 text-red-400" />
                    <p className="text-red-400 font-mono text-xs">{error}</p>
                  </div>
                </div>
              )}

              {/* Score Display */}
              {score && (
                <div className={`${isDark ? 'bg-gray-800/30 border-gray-700/50' : 'bg-gray-50/80 border-gray-200'} border rounded-xl p-4`}>
                  
                  {/* Score Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {getScoreTier(score)?.wojak}
                      <div>
                        <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {score}/100
                        </h3>
                        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} font-mono text-xs`}>
                          {getScoreTier(score)?.message}
                        </p>
                      </div>
                    </div>
                    
                    {getScoreTier(score) && (
                      <div className={`flex items-center gap-2 px-2 py-1 rounded-lg text-xs font-bold border ${getScoreTier(score).bgColor} ${getScoreTier(score).color} border-current/20`}>
                        {getScoreTier(score).icon}
                        <span>{getScoreTier(score).tier}</span>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className={`w-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'} rounded-full h-2`}>
                      <div 
                        className={`h-2 rounded-full transition-all duration-2000 ease-out ${
                          score >= 80 ? 'bg-gradient-to-r from-emerald-500 to-green-500' :
                          score >= 60 ? 'bg-gradient-to-r from-green-500 to-yellow-500' :
                          score >= 40 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                          'bg-gradient-to-r from-red-500 to-red-600'
                        }`}
                        style={{ width: `${Math.min(score, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Share */}
                  <div className="text-center">
                    <button
                      onClick={shareOnTwitter}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 text-sm"
                    >
                      <Twitter className="w-3 h-3" />
                      <span className="font-mono text-xs">share</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Leaderboard Sidebar */}
          <div className="space-y-4">
            {/* Leaderboard */}
            <div className={`${isDark ? 'bg-gray-900/70 border-gray-800/50' : 'bg-white/90 border-gray-200'} backdrop-blur-xl border rounded-xl p-4 shadow-xl`}>
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  top degens
                </h3>
              </div>
              
              <div className="space-y-2">
                {leaderboard.slice(0, 3).map((entry, index) => (
                  <div key={entry.username} className={`flex items-center gap-2 p-2 rounded-lg ${isDark ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
                    <div className="text-xs font-mono text-yellow-400">#{index + 1}</div>
                    {entry.avatar ? (
                      <img src={entry.avatar} alt={entry.username} className="w-5 h-5 rounded-full" />
                    ) : (
                      <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-mono truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {entry.username}
                      </p>
                    </div>
                    <div className="text-xs font-bold text-green-400">
                      {entry.score}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-time Stats */}
            <div className={`${isDark ? 'bg-gray-900/70 border-gray-800/50' : 'bg-white/90 border-gray-200'} backdrop-blur-xl border rounded-xl p-4 shadow-xl`}>
              <div className="text-center">
                <div className="text-2xl mb-2">🐸</div>
                <p className={`font-mono ${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs mb-3`}>
                  made by anons
                </p>
                
                {/* Real-time stats */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-mono ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      total degens:
                    </span>
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {stats.totalUsers.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-mono ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      avg score:
                    </span>
                    <span className={`font-bold ${
                      stats.averageScore >= 60 ? 'text-green-400' : 
                      stats.averageScore >= 40 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {stats.averageScore}/100
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-mono ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        highest:
                    </span>
                    <div className="flex items-center space-x-2">
                        <span className="font-bold text-emerald-400">
                        {stats.highestScore}/100
                        </span>
                        <img 
                        src="/king.jpg" 
                        alt="Highest score" 
                        className="h-10 w-10 rounded-full object-cover"
                        />
                    </div>
                  </div>
                </div>

                {/* Live indicator */}
                <div className="flex items-center justify-center gap-2 text-xs">
                  <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                  <span className={`font-mono ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    live data
                  </span>
                  <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-2s { animation-delay: 2s; }
        .animation-delay-3s { animation-delay: 3s; }
        .animation-delay-4s { animation-delay: 4s; }
        .slow-spin { animation: spin 4s linear infinite; }
      `}</style>
    </div>
  );
};

export default DashboardHome;
