import React from 'react';
import Sidebar from './Sidebar';
import Navigation from './Navigation';
import { X } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
  walletConnected: boolean;
  walletAddress: string;
  isConnecting: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
  requestAccountSelection: () => void;
  availableAccounts: string[];
  showAccountSelector: boolean;
  setShowAccountSelector: (show: boolean) => void;
  switchAccount: (account: string) => void;
  formatAddress: (address: string) => string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  isDark,
  setIsDark,
  sidebarOpen,
  setSidebarOpen,
  sidebarCollapsed,
  setSidebarCollapsed,
  activeItem,
  setActiveItem,
  walletConnected,
  walletAddress,
  isConnecting,
  connectWallet,
  disconnectWallet,
  requestAccountSelection,
  availableAccounts,
  showAccountSelector,
  setShowAccountSelector,
  switchAccount,
  formatAddress,
}) => {
  return (
    <div className={`min-h-screen flex w-full ${isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar
        isDark={isDark}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navigation
          isDark={isDark}
          setIsDark={setIsDark}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          walletConnected={walletConnected}
          isConnecting={isConnecting}
          connectWallet={connectWallet}
          disconnectWallet={disconnectWallet}
          requestAccountSelection={requestAccountSelection}
        />

        <main className="flex-1 p-4 lg:p-6 space-y-6 overflow-auto">
          {children}
        </main>
      </div>

      {/* Account Selector Modal */}
      {showAccountSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[999999] flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-xl shadow-2xl ${
            isDark 
              ? 'bg-gray-800 text-white border border-gray-700' 
              : 'bg-white text-gray-900 border border-gray-200'
          }`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Select Account</h3>
                <button
                  onClick={() => setShowAccountSelector(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {availableAccounts.map((account, index) => (
                  <button
                    key={account}
                    onClick={() => switchAccount(account)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      account === walletAddress
                        ? (isDark 
                            ? 'bg-blue-500/20 border-blue-500/40 text-blue-400' 
                            : 'bg-blue-50 border-blue-200 text-blue-700')
                        : (isDark 
                            ? 'border-gray-700 hover:bg-gray-700 hover:border-gray-600' 
                            : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300')
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-mono text-sm">{formatAddress(account)}</div>
                        <div className="text-xs text-gray-500">Account {index + 1}</div>
                      </div>
                      {account === walletAddress && (
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
