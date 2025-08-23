import React from 'react';
import Cookies from "js-cookie";
import { 
  LayoutDashboard, 
  Wallet, 
  Vote, 
  Settings, 
  Shield, 
  Trophy, 
  LogOut
} from "lucide-react";

const sidebarItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Wallet", url: "/dashboard/wallet", icon: Wallet },
  { title: "Leaderboard", url: "/dashboard/leaderboard", icon: Trophy },
  { title: "Verifiable Credentials", url: "/dashboard/credentials", icon: Shield }, // ✅ fixed label
  { title: "Governance", url: "/dashboard/dao", icon: Vote },
  { title: "Settings", url: "/dashboard/settings", icon: Settings }
];

interface SidebarProps {
  isDark: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isDark,
  sidebarOpen,
  setSidebarOpen,
  sidebarCollapsed,
  activeItem,
  setActiveItem,
}) => {
  const isActive = (path: string) => activeItem === path;

  const handleItemClick = (url: string) => {
    setActiveItem(url);
    setSidebarOpen(false); // closes on mobile; desktop stays visible
  };

  const handleLogout = () => {
    Cookies.remove("github_token");
    Cookies.remove("github_user");
    window.location.href = "/";
  };

  const getNavCls = (active: boolean) =>
    active 
      ? "bg-gradient-to-r from-primary to-accent text-primary-foreground" 
      : "hover:bg-gray-800/50 hover:border-transparent text-gray-400 hover:text-white border-transparent";

  return (
    <div className={`fixed inset-y-0 left-0 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out ${sidebarCollapsed ? 'lg:w-16' : 'lg:w-72'} w-72`}>
      {/* Make the whole sidebar a full-height flex column */}
      <aside className={`h-screen flex flex-col ${isDark ? 'bg-transparent' : 'bg-white/95'} border-r ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        
        {/* Logo Section */}
        <div className={`p-6 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} ${sidebarCollapsed ? 'px-4 py-6' : 'px-6 py-6'} transition-all duration-300`}>
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
              <img
                src="/logo.png"
                alt="Nullproof Logo"
                className="w-8 h-8 mr-2 rounded-full object-cover"
              />
            </div>
            {!sidebarCollapsed && (
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                NullProof
              </span>
            )}
          </div>
        </div>

        {/* Navigation — scrollable */}
        <nav className={`px-3 ${sidebarCollapsed ? 'px-2' : 'px-4'} py-4 flex-1 overflow-y-auto`}>
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.title}>
                <button
                  onClick={() => handleItemClick(item.url)}
                  className={`w-full group relative flex items-center rounded-xl transition-all duration-300 ${sidebarCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3'} ${getNavCls(isActive(item.url))}`}
                  aria-label={item.title}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110" />
                  {!sidebarCollapsed && (
                    <span className="font-semibold text-sm leading-tight truncate max-w-[11rem]">
                      {item.title}
                    </span>
                  )}
                  {/* {!sidebarCollapsed && isActive(item.url) && (
                    <span className="ml-auto w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                  )} */}
                  {/* {sidebarCollapsed && isActive(item.url) && (
                    <span className={`absolute -right-1 -top-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse border-2 ${isDark ? 'border-gray-900' : 'border-white'}`}></span>
                  )} */}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout — pinned to bottom */}
        <div className={`mt-auto p-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3'} rounded-xl border transition-all duration-300 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 text-gray-400`}
            aria-label="Logout"
          >
            <LogOut className="w-5 h-5" />
            {!sidebarCollapsed && <span className="font-semibold text-sm">Logout</span>}
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
