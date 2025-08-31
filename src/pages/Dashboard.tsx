import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import DashboardHome from './DashboardHome';
import Walletsection from './Walletsection';
import LeaderboardPage from './Leaderboard';
import DaoPage from './DaoPage';
import SettingsPage from './SettingsPage';
import VerifiableCredentialsPage from './VerfiableCredentialsPage';


declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (data: any) => void) => void;
      removeListener: (event: string, callback: (data: any) => void) => void;
      isMetaMask?: boolean;
    };
  }
}

const Dashboard = () => {
  // Theme and UI state
  const [isDark, setIsDark] = useState(true);
  const [activeItem, setActiveItem] = useState("/dashboard");
  
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Wallet state
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [availableAccounts, setAvailableAccounts] = useState<string[]>([]);
  const [showAccountSelector, setShowAccountSelector] = useState(false);

  // Wallet functions
  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
        // Request account access
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setAvailableAccounts(accounts);
          setWalletConnected(true);
        }
      } else {
        console.error('MetaMask is not installed');
        // You could show a toast/alert here
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress("");
    setAvailableAccounts([]);
    setShowAccountSelector(false);
  };

  const requestAccountSelection = async () => {
    try {
      // Get all available accounts
      const accounts = await window.ethereum.request({
        method: 'eth_accounts'
      });
      setAvailableAccounts(accounts);
      setShowAccountSelector(true);
    } catch (error) {
      console.error('Failed to get accounts:', error);
    }
  };

  const switchAccount = async (account: string) => {
    try {
      setWalletAddress(account);
      setShowAccountSelector(false);
      
      // Optional: Request to switch to the selected account in MetaMask
      await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }]
      });
    } catch (error) {
      console.error('Failed to switch account:', error);
    }
  };

  const formatAddress = (address: string): string => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Check for existing wallet connection on component mount
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts'
          });
          
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setAvailableAccounts(accounts);
            setWalletConnected(true);
          }
        } catch (error) {
          console.error('Failed to check wallet connection:', error);
        }
      }
    };

    checkWalletConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setAvailableAccounts(accounts);
          setWalletConnected(true);
        } else {
          disconnectWallet();
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      // Cleanup
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  // Render page content based on activeItem
  const renderPageContent = () => {
    switch (activeItem) {
      case "/dashboard/wallet":
        return <Walletsection isDark={isDark} myWallet={walletAddress}/>;
      case "/dashboard/leaderboard":
        return <LeaderboardPage isDark={isDark} myWallet={walletAddress} />;
      case "/dashboard/dao":
        return <DaoPage isDark={isDark} />;
      case "/dashboard/settings":
        return <SettingsPage isDark={isDark} myWallet={walletAddress}  />;
      case "/dashboard/credentials":
        return <VerifiableCredentialsPage isDark={isDark} myWallet={walletAddress}  />;
      default:
        return <DashboardHome isDark={isDark} walletAddress={walletAddress} />;
    }
  };

  return (
    <DashboardLayout
      isDark={isDark}
      setIsDark={setIsDark}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      sidebarCollapsed={sidebarCollapsed}
      setSidebarCollapsed={setSidebarCollapsed}
      activeItem={activeItem}
      setActiveItem={setActiveItem}
      walletConnected={walletConnected}
      walletAddress={walletAddress}
      isConnecting={isConnecting}
      connectWallet={connectWallet}
      disconnectWallet={disconnectWallet}
      requestAccountSelection={requestAccountSelection}
      availableAccounts={availableAccounts}
      showAccountSelector={showAccountSelector}
      setShowAccountSelector={setShowAccountSelector}
      switchAccount={switchAccount}
      formatAddress={formatAddress}
    >
      {renderPageContent()}
    </DashboardLayout>
  );
};

export default Dashboard;
