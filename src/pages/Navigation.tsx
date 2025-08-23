import React from 'react';
import { 
  Bell, 
  Sun, 
  Moon,
  Menu,
  X,
  Wallet
} from "lucide-react";

interface HeaderProps {
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  walletConnected: boolean;
  isConnecting: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
  requestAccountSelection: () => void;
}

const Navigation: React.FC<HeaderProps> = ({
  isDark,
  setIsDark,
  sidebarOpen,
  setSidebarOpen,
  sidebarCollapsed,
  setSidebarCollapsed,
  walletConnected,
  isConnecting,
  connectWallet,
  disconnectWallet,
  requestAccountSelection,
}) => {
  return (
    <header className={`h-20 ${isDark ? 'bg-transparent' : 'bg-white/95'} border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} flex items-center justify-between px-4 lg:px-8 relative z-[100]`}>
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
      
      <div className="flex items-center gap-4 relative z-[101]">
        {/* Theme Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="hover:bg-gray-800/50 rounded-xl h-12 w-12 border border-transparent hover:border-blue-500/20 flex items-center justify-center transition-all"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        {/* Notifications */}
        {/* <button className="hover:bg-gray-800/50 rounded-xl h-12 w-12 border border-transparent hover:border-blue-500/20 relative group flex items-center justify-center transition-all">
          <Bell className="w-5 h-5" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        </button> */}
        
        {/* Wallet Buttons */}
        <div className="flex items-center gap-2">
          {walletConnected ? (
            <>
              <button
                onClick={requestAccountSelection}
                className={`${isDark ? 'bg-gradient-to-r from-primary to-accent border-blue-500/40 text-primary-foreground hover:bg-blue-500/10' : 'bg-gradient-to-r from-primary to-accent border-blue-500/40 text-primary-foreground hover:bg-blue-50'} font-medium px-4 py-2 rounded-lg text-sm`}
              >
                Switch
              </button>
              <button
                onClick={disconnectWallet}
                className={`${isDark ? 'bg-destructive text-destructive-foreground hover:bg-destructive/80' : 'bg-destructive text-destructive-foreground hover:bg-destructive/80'} font-medium px-4 py-2 rounded-lg transition-all text-sm`}
              >
                Disconnect
              </button>
            </>
          ) : (
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed font-medium px-6 py-2 rounded-lg shadow-lg transition-all flex items-center gap-2"
            >
              {isConnecting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  <span>Connect</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
