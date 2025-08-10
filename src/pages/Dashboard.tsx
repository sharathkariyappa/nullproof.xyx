import { useState } from "react";
import { 
  LayoutDashboard, 
  Wallet, 
  Vote, 
  Settings, 
  Shield, 
  Trophy, 
  Bell, 
  Sun, 
  Moon,
  Menu,
  X
} from "lucide-react";

const sidebarItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Wallet", url: "/dashboard/wallet", icon: Wallet },
  { title: "Governance", url: "/dashboard/governance", icon: Vote },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
  { title: "Security", url: "/dashboard/security", icon: Shield },
  { title: "Leaderboard", url: "/dashboard/leaderboard", icon: Trophy },
];

const Dashboard = () => {
  const [isDark, setIsDark] = useState(true);
  const [walletConnected, setWalletConnected] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("/dashboard");

  const isActive = (path) => activeItem === path;

  const handleItemClick = (url) => {
    setActiveItem(url);
    setSidebarOpen(false); // Close mobile sidebar when item is clicked
  };

  const getNavCls = (isActive) =>
    isActive 
      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-500 border-blue-500/40 shadow-lg" 
      : "hover:bg-gray-800/50 hover:border-blue-500/20 text-gray-400 hover:text-white border-transparent";

  return (
    <div className={`min-h-screen flex w-full ${isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out ${sidebarCollapsed ? 'lg:w-16' : 'lg:w-72'} w-72`}>
        <div className={`h-full ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-xl border-r ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          {/* Logo Section */}
          <div className={`p-6 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} ${sidebarCollapsed ? 'px-4 py-6' : 'px-6 py-6'} transition-all duration-300`}>
            <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
              <img
                    src="/logo.png"
                    alt="Nullproof Logo"
                    className="w-8 h-8 mr-2 rounded-full object-cover"
                  />
              </div>
              {!sidebarCollapsed && (
                <div className="flex flex-col">
                  <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    NullProof
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className={`px-4 py-6 ${sidebarCollapsed ? 'px-2' : 'px-4'} transition-all duration-300`}>
            <div className="space-y-2">
              {sidebarItems.map((item) => (
                <div key={item.title} className="relative group">
                  <button
                    onClick={() => handleItemClick(item.url)}
                    className={`w-full group relative flex items-center ${sidebarCollapsed ? 'justify-center p-3' : 'gap-4 p-4'} rounded-xl border transition-all duration-300 ${getNavCls(isActive(item.url))}`}
                  >
                    <div className="relative flex items-center justify-center">
                      <item.icon className="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110" />
                      {isActive(item.url) && (
                        <div className="absolute inset-0 -z-10 bg-blue-500/20 rounded-full blur-md animate-pulse"></div>
                      )}
                    </div>
                    {!sidebarCollapsed && (
                      <div className="flex flex-col text-left flex-1">
                        <span className="font-semibold text-sm">{item.title}</span>
                        {isActive(item.url)}
                      </div>
                    )}
                    {!sidebarCollapsed && isActive(item.url) && (
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    )}
                    {sidebarCollapsed && isActive(item.url) && (
                      <div className={`absolute -right-1 -top-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse border-2 ${isDark ? 'border-gray-900' : 'border-white'}`}></div>
                    )}
                  </button>
                  
                  {/* Tooltip for collapsed sidebar */}
                  {sidebarCollapsed && (
                    <div className={`absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 ${
                      isDark 
                        ? 'bg-gray-800 text-white border border-gray-700' 
                        : 'bg-white text-gray-900 border border-gray-200 shadow-lg'
                    }`}>
                      {item.title}
                      <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 rotate-45 ${
                        isDark 
                          ? 'bg-gray-800 border-l border-b border-gray-700' 
                          : 'bg-white border-l border-b border-gray-200'
                      }`}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* User Profile Section */}
          <div className={`mt-auto p-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} ${sidebarCollapsed ? 'px-2' : 'px-4'} transition-all duration-300`}>
            {!sidebarCollapsed ? (
              <div className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-100'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">ZK</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Identity User</span>
                  <span className="text-xs text-gray-500">Verified</span>
                </div>
              </div>
            ) : (
              <div className="flex justify-center relative group">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                  <span className="text-sm font-semibold text-white">ZK</span>
                </div>
                {/* Tooltip for collapsed user profile */}
                <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border border-gray-700">
                  Identity User - Verified
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45 border-l border-b border-gray-700"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Dashboard Header */}
        <header className={`h-20 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-xl border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} flex items-center justify-between px-4 lg:px-8`}>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-3 hover:bg-gray-800/50 rounded-xl transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              {/* Desktop sidebar toggle */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:block p-3 hover:bg-gray-800/50 rounded-xl transition-colors border border-transparent hover:border-blue-500/20"
              >
                {sidebarCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="hover:bg-gray-800/50 rounded-xl h-12 w-12 border border-transparent hover:border-blue-500/20 flex items-center justify-center transition-all"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {/* Notifications */}
            <button className="hover:bg-gray-800/50 rounded-xl h-12 w-12 border border-transparent hover:border-blue-500/20 relative group flex items-center justify-center transition-all">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            </button>
            
            {/* Wallet Connection */}
            <button
              onClick={() => setWalletConnected(!walletConnected)}
              className={walletConnected 
                ? `${isDark ? 'bg-gray-800/50 border-purple-500/40 text-purple-400 hover:bg-purple-500/10' : 'bg-gray-100 border-purple-500/40 text-purple-600 hover:bg-purple-50'} font-medium px-6 py-3 rounded-xl border transition-all` 
                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all"
              }
            >
              {walletConnected ? "Wallet Connected" : "Connect Wallet"}
            </button>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 p-4 lg:p-6 space-y-6 overflow-auto">
          {/* Dashboard Overview */}
          <div className="space-y-4">
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
            <p className="text-gray-500">
              Welcome to your NullProof identity management dashboard
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Identity Proofs", value: "12", icon: Shield, change: "+2.5%" },
              { title: "Verifications", value: "847", icon: Vote, change: "+12.3%" },
              { title: "Security Score", value: "98%", icon: Trophy, change: "+1.2%" },
              { title: "Token Balance", value: "1,250", icon: Wallet, change: "+5.7%" },
            ].map((stat, index) => (
              <div key={index} className={`${isDark ? 'bg-gray-900/50' : 'bg-white/50'} backdrop-blur-xl border ${isDark ? 'border-gray-800' : 'border-gray-200'} rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-purple-500 text-sm font-medium">{stat.change}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Dashboard Widgets */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className={`${isDark ? 'bg-gray-900/50' : 'bg-white/50'} backdrop-blur-xl border ${isDark ? 'border-gray-800' : 'border-gray-200'} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: "Identity Verified", time: "2 minutes ago", status: "success" },
                  { action: "ZK Proof Generated", time: "1 hour ago", status: "success" },
                  { action: "Governance Vote Cast", time: "3 hours ago", status: "info" },
                  { action: "Token Stake Increased", time: "1 day ago", status: "success" },
                ].map((activity, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-gray-800/30' : 'bg-gray-100/50'}`}>
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-purple-500' : 'bg-blue-500'
                    }`} />
                  </div>
                ))}
              </div>
            </div>

            <div className={`${isDark ? 'bg-gray-900/50' : 'bg-white/50'} backdrop-blur-xl border ${isDark ? 'border-gray-800' : 'border-gray-200'} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold mb-4">Security Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Two-Factor Authentication</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span className="text-purple-500 font-medium">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Biometric Verification</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span className="text-purple-500 font-medium">Enabled</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">ZK Identity Proof</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <span className="text-blue-500 font-medium">Generating</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-4 rounded-xl transition-all">
                  View Security Center
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;