import { useState, useEffect } from "react";
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
  X,
  ChevronDown,
  Copy,
  ExternalLink,
  CreditCard,
  CircleArrowUp,
  CircleArrowDown,
  History,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Clock,
  Github, User, Users, TrendingUp, Loader2, CheckCircle2
} from "lucide-react";

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

// Add your Etherscan API key here - get it from https://etherscan.io/apis
const ETHERSCAN_API_KEY = "8GWU4W63DB1C5QWC2R6T65IXXUWCGDKDNI";
const ETHERSCAN_SEPOLIA_API_URL = "https://api-sepolia.etherscan.io/api";

const sidebarItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Wallet", url: "/dashboard/wallet", icon: Wallet },
  { title: "Governance", url: "/dashboard/governance", icon: Vote },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
  { title: "Security", url: "/dashboard/security", icon: Shield },
  { title: "Leaderboard", url: "/dashboard/leaderboard", icon: Trophy },
];

interface Transaction {
  hash: string;
  blockNumber: string;
  timeStamp: string;
  from: string;
  to: string;
  value: string;
  gasUsed: string;
  isError: string;
  txreceipt_status: string;
  input: string;
}

const Dashboard = () => {
  const [isDark, setIsDark] = useState(true);
  const [walletConnected, setWalletConnected] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("/dashboard");
  const [walletAddress, setWalletAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState("0");
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);
  const [availableAccounts, setAvailableAccounts] = useState<string[]>([]);
  const [showAccountSelector, setShowAccountSelector] = useState(false);
  const [githubUsername, setGithubUsername] = useState("");
  const [isGithubLinked, setIsGithubLinked] = useState(false);
  const [isLinkingGithub, setIsLinkingGithub] = useState(false);
  const [isGeneratingProof, setIsGeneratingProof] = useState(false);
  const [proofGenerated, setProofGenerated] = useState(false);
  const [userType, setUserType] = useState<"founder" | "contributor" | "investor" | null>(null);
  const [proofData, setProofData] = useState<any>(null);
  

  const linkGithubAccount = async () => {
    if (!githubUsername.trim()) {
      alert("Please enter a valid GitHub username");
      return;
    }
  
    setIsLinkingGithub(true);
    
    try {
      // Simulate GitHub API call to verify user exists
      const response = await fetch(`https://api.github.com/users/${githubUsername}`);
      
      if (response.ok) {
        const userData = await response.json();
        setIsGithubLinked(true);
        localStorage.setItem('linkedGithub', githubUsername);
        localStorage.setItem('githubData', JSON.stringify(userData));
      } else {
        throw new Error('GitHub user not found');
      }
    } catch (error) {
      console.error('Error linking GitHub:', error);
      alert('Failed to link GitHub account. Please check the username and try again.');
    } finally {
      setIsLinkingGithub(false);
    }
  };
  
  const generateProof = async () => {
    setIsGeneratingProof(true);
    
    try {
      // Simulate proof generation with on-chain and off-chain analysis
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate processing time
      
      // Mock analysis based on GitHub data and wallet activity
      const mockAnalysis = {
        githubStats: {
          publicRepos: Math.floor(Math.random() * 50) + 5,
          followers: Math.floor(Math.random() * 1000) + 10,
          contributions: Math.floor(Math.random() * 2000) + 100,
          accountAge: Math.floor(Math.random() * 8) + 1, // years
        },
        onChainStats: {
          transactionCount: transactions.length,
          walletAge: 2, // years
          totalVolume: parseFloat(walletBalance) * 10, // mock volume
          contractInteractions: Math.floor(Math.random() * 20) + 5,
        }
      };
  
      // Determine user type based on stats
      let determinedType: "founder" | "contributor" | "investor";
      
      if (mockAnalysis.githubStats.publicRepos > 20 && mockAnalysis.onChainStats.contractInteractions > 15) {
        determinedType = "founder";
      } else if (mockAnalysis.githubStats.contributions > 500 && mockAnalysis.githubStats.publicRepos > 5) {
        determinedType = "contributor";
      } else {
        determinedType = "investor";
      }
  
      setUserType(determinedType);
      setProofData(mockAnalysis);
      setProofGenerated(true);
      
    } catch (error) {
      console.error('Error generating proof:', error);
      alert('Failed to generate proof. Please try again.');
    } finally {
      setIsGeneratingProof(false);
    }
  };
  
  // Check for existing GitHub link on component mount
  useEffect(() => {
    const linkedGithub = localStorage.getItem('linkedGithub');
    if (linkedGithub) {
      setGithubUsername(linkedGithub);
      setIsGithubLinked(true);
    }
  }, []);
  // Real transaction data state
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  const [transactionError, setTransactionError] = useState("");

  // Mock data for verifiable credentials
  const [verifiableCredentials] = useState([
    { id: 1, type: "Identity Verification", issuer: "NullProof", status: "Verified", date: "2024-01-15" },
    { id: 2, type: "Age Verification", issuer: "AgeGuard", status: "Verified", date: "2024-01-10" },
    { id: 3, type: "Education Certificate", issuer: "EduChain", status: "Pending", date: "2024-01-20" },
  ]);

  // Only check wallet connection if user previously connected
  useEffect(() => {
    const wasConnected = localStorage.getItem('walletConnected');
    if (wasConnected === 'true') {
      checkWalletConnection();
    }
  }, []);

  // Fetch transactions when wallet address changes
  useEffect(() => {
    if (walletAddress) {
      fetchTransactionHistory(walletAddress);
    }
  }, [walletAddress]);

  const checkWalletConnection = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setWalletConnected(true);
          setWalletAddress(accounts[0]);
          setAvailableAccounts(accounts);
          await getWalletBalance(accounts[0]);
          
          window.ethereum.on('accountsChanged', handleAccountsChanged);
          window.ethereum.on('chainChanged', handleChainChanged);
        }
      } catch (error) {
        console.log('Error checking wallet connection:', error);
        localStorage.removeItem('walletConnected');
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      setIsConnecting(true);
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        if (accounts.length > 0) {
          setWalletConnected(true);
          setWalletAddress(accounts[0]);
          setAvailableAccounts(accounts);
          await getWalletBalance(accounts[0]);
          
          localStorage.setItem('walletConnected', 'true');
          
          window.ethereum.on('accountsChanged', handleAccountsChanged);
          window.ethereum.on('chainChanged', handleChainChanged);
        }
      } catch (error: any) {
        console.error('Error connecting wallet:', error);
        if (error.code === 4001) {
          alert('Please connect to MetaMask.');
        } else {
          alert('Error connecting wallet. Please try again.');
        }
      } finally {
        setIsConnecting(false);
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask and try again.');
      window.open('https://metamask.io/download/', '_blank');
    }
  };

  const getWalletBalance = async (address: string) => {
    try {
      if (window.ethereum) {
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [address, 'latest']
        });
        const ethBalance = parseInt(balance, 16) / Math.pow(10, 18);
        setWalletBalance(ethBalance.toFixed(4));
      }
    } catch (error) {
      console.error('Error getting balance:', error);
    }
  };

  // Fetch real transaction history from Etherscan Sepolia API
  const fetchTransactionHistory = async (address: string) => {
    setIsLoadingTransactions(true);
    setTransactionError("");

    try {
      const response = await fetch(`${ETHERSCAN_SEPOLIA_API_URL}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${ETHERSCAN_API_KEY}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }

      const data = await response.json();
      
      if (data.status === '1' && data.result) {
        setTransactions(data.result);
      } else {
        console.error('API Error:', data.message);
        if (data.message === 'NOTOK') {
          setTransactionError("Invalid API key or rate limit exceeded");
        } else {
          setTransactionError(data.message || "No transactions found");
        }
        setTransactions([]);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactionError("Failed to fetch transactions");
      setTransactions([]);
    } finally {
      setIsLoadingTransactions(false);
    }
  };

  // Helper function to format timestamp to readable date
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Helper function to format transaction value from Wei to ETH
  const formatTransactionValue = (value: string) => {
    const ethValue = parseFloat(value) / Math.pow(10, 18);
    return ethValue.toFixed(6);
  };

  // Helper function to determine transaction type
  const getTransactionType = (tx: Transaction, userAddress: string) => {
    if (tx.from.toLowerCase() === userAddress.toLowerCase()) {
      return { type: 'Sent', color: 'text-red-500', bgColor: 'bg-red-500/20', icon: CircleArrowUp };
    } else {
      return { type: 'Received', color: 'text-green-500', bgColor: 'bg-green-500/20', icon: CircleArrowDown };
    }
  };

  // Helper function to get transaction status
  const getTransactionStatus = (tx: Transaction) => {
    if (tx.isError === '1') {
      return { status: 'Failed', color: 'text-red-500' };
    } else if (tx.txreceipt_status === '1') {
      return { status: 'Success', color: 'text-green-500' };
    } else {
      return { status: 'Pending', color: 'text-yellow-500' };
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      setWalletAddress(accounts[0]);
      setAvailableAccounts(accounts);
      getWalletBalance(accounts[0]);
    }
  };

  const handleChainChanged = (chainId: string) => {
    window.location.reload();
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress("");
    setWalletBalance("0");
    setAvailableAccounts([]);
    setWalletDropdownOpen(false);
    setShowAccountSelector(false);
    setTransactions([]);
    
    localStorage.removeItem('walletConnected');
    
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    }
  };

  const switchAccount = async (account: string) => {
    try {
      await window.ethereum?.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }]
      });
      
      setWalletAddress(account);
      await getWalletBalance(account);
      setShowAccountSelector(false);
      setWalletDropdownOpen(false);
    } catch (error) {
      console.error('Error switching account:', error);
    }
  };

  const requestAccountSelection = async () => {
    try {
      const accounts = await window.ethereum?.request({
        method: 'eth_requestAccounts'
      });
      if (accounts && accounts.length > 0) {
        setAvailableAccounts(accounts);
        setShowAccountSelector(true);
      }
    } catch (error) {
      console.error('Error requesting accounts:', error);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
  };

  const formatAddress = (address: string) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const isActive = (path: string) => activeItem === path;

  const handleItemClick = (url: string) => {
    setActiveItem(url);
    setSidebarOpen(false);
  };

  const getNavCls = (isActive: boolean) =>
    isActive 
      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-500 border-blue-500/40 shadow-lg" 
      : "hover:bg-gray-800/50 hover:border-blue-500/20 text-gray-400 hover:text-white border-transparent";

  // Render different content based on active item
  const renderMainContent = () => {
    switch (activeItem) {
      case "/dashboard/wallet":
        return renderWalletContent();
      case "/dashboard/governance":
        return renderGovernanceContent();
      case "/dashboard/settings":
        return renderSettingsContent();
      case "/dashboard/security":
        return renderSecurityContent();
      case "/dashboard/leaderboard":
        return renderLeaderboardContent();
      default:
        return renderDashboardContent();
    }
  };

  const renderWalletContent = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Wallet
        </h1>
        <p className="text-gray-500">
          Manage your wallet, view balances, and verifiable credentials
        </p>
      </div>

      {walletConnected ? (
        <>
          {/* Wallet Overview */}
          <div className={`${isDark ? 'bg-gray-900/50' : 'bg-white/50'} backdrop-blur-xl border ${isDark ? 'border-gray-800' : 'border-gray-200'} rounded-xl p-6`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Wallet Overview</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-500 font-medium">Connected to Sepolia</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Address Card */}
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/30' : 'bg-gray-100/50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-500">Wallet Address</h4>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyAddress}
                      className={`p-2 rounded-lg transition-colors ${
                        isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                      }`}
                      title="Copy address"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => window.open(`https://sepolia.etherscan.io/address/${walletAddress}`, '_blank')}
                      className={`p-2 rounded-lg transition-colors ${
                        isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                      }`}
                      title="View on Sepolia Etherscan"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="font-mono text-lg">{formatAddress(walletAddress)}</p>
                <p className="text-xs text-gray-500 mt-1">{walletAddress}</p>
              </div>

              {/* Balance Card */}
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/30' : 'bg-gray-100/50'}`}>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Sepolia ETH Balance</h4>
                <p className="text-2xl font-bold">{walletBalance} SepoliaETH</p>
                <div className="flex gap-2 mt-4">
                  <button className="flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors">
                    <CircleArrowUp className="w-4 h-4" />
                    Send
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm transition-colors">
                    <CircleArrowDown className="w-4 h-4" />
                    Receive
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Account Management */}
          <div className={`${isDark ? 'bg-gray-900/50' : 'bg-white/50'} backdrop-blur-xl border ${isDark ? 'border-gray-800' : 'border-gray-200'} rounded-xl p-6`}>
            <h3 className="text-xl font-semibold mb-4">Account Management</h3>
            <div className="space-y-3">
              {availableAccounts.map((account, index) => (
                <div
                  key={account}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    account === walletAddress
                      ? (isDark 
                          ? 'bg-blue-500/20 border-blue-500/40 text-blue-400' 
                          : 'bg-blue-50 border-blue-200 text-blue-700')
                      : (isDark 
                          ? 'border-gray-700 hover:bg-gray-700 hover:border-gray-600' 
                          : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300')
                  }`}
                >
                  <div>
                    <div className="font-mono text-sm">{formatAddress(account)}</div>
                    <div className="text-xs text-gray-500">Account {index + 1}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {account === walletAddress && (
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                    )}
                    {account !== walletAddress && (
                      <button
                        onClick={() => switchAccount(account)}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded transition-colors"
                      >
                        Switch
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button
                onClick={requestAccountSelection}
                className={`w-full p-3 border-2 border-dashed rounded-lg transition-colors ${
                  isDark 
                    ? 'border-gray-700 hover:border-blue-500/50 text-gray-400 hover:text-blue-400' 
                    : 'border-gray-300 hover:border-blue-500/50 text-gray-600 hover:text-blue-600'
                }`}
              >
                + Add Another Account
              </button>
            </div>
          </div>

          {/* Verifiable Credentials */}
          {/* <div className={`${isDark ? 'bg-gray-900/50' : 'bg-white/50'} backdrop-blur-xl border ${isDark ? 'border-gray-800' : 'border-gray-200'} rounded-xl p-6`}>
            <h3 className="text-xl font-semibold mb-4">Verifiable Credentials</h3>
            <div className="space-y-3">
              {verifiableCredentials.map((credential) => (
                <div
                  key={credential.id}
                  className={`flex items-center justify-between p-4 rounded-lg ${isDark ? 'bg-gray-800/30' : 'bg-gray-100/50'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      credential.status === 'Verified' 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-orange-500/20 text-orange-500'
                    }`}>
                      {credential.status === 'Verified' ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <AlertCircle className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{credential.type}</p>
                      <p className="text-sm text-gray-500">Issued by {credential.issuer} • {credential.date}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    credential.status === 'Verified' 
                      ? 'bg-green-500/20 text-green-500' 
                      : 'bg-orange-500/20 text-orange-500'
                  }`}>
                    {credential.status}
                  </span>
                </div>
              ))}
            </div>
          </div> */}

          {/* Real Transaction History from Etherscan Sepolia */}
          <div className={`${isDark ? 'bg-gray-900/50' : 'bg-white/50'} backdrop-blur-xl border ${isDark ? 'border-gray-800' : 'border-gray-200'} rounded-xl p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Transaction History</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => fetchTransactionHistory(walletAddress)}
                  disabled={isLoadingTransactions}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isDark 
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  } disabled:opacity-50`}
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingTransactions ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
                <button 
                  onClick={() => window.open(`https://sepolia.etherscan.io/address/${walletAddress}`, '_blank')}
                  className="flex items-center gap-2 text-blue-500 hover:text-blue-400 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  View All on Etherscan
                </button>
              </div>
            </div>
            {isLoadingTransactions ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
                <span className="ml-2 text-gray-500">Loading transactions...</span>
              </div>
            ) : transactionError ? (
              <div className={`p-4 rounded-lg ${isDark ? 'bg-red-900/20 border-red-500/40' : 'bg-red-50 border-red-200'} border`}>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <p className="text-sm text-red-500">{transactionError}</p>
                </div>
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-8">
                <History className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">No transactions found for this address</p>
              </div>
            ) : (
              <div className="space-y-3">
                {transactions.slice(0, 10).map((tx) => {
                  const txType = getTransactionType(tx, walletAddress);
                  const txStatus = getTransactionStatus(tx);
                  const ethValue = formatTransactionValue(tx.value);
                  
                  return (
                    <div key={tx.hash} className={`flex items-center justify-between p-4 rounded-lg ${isDark ? 'bg-gray-800/30' : 'bg-gray-100/50'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${txType.bgColor} ${txType.color}`}>
                          <txType.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{txType.type}</p>
                            <span className={`text-xs px-2 py-1 rounded ${txStatus.color} bg-opacity-20`}>
                              {txStatus.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{formatAddress(txType.type === 'Sent' ? tx.to : tx.from)}</span>
                            <Clock className="w-3 h-3" />
                            <span>{formatTimestamp(tx.timeStamp)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${txType.color}`}>
                          {txType.type === 'Sent' ? '-' : '+'}{ethValue} SepoliaETH
                        </p>
                        <button
                          onClick={() => window.open(`https://sepolia.etherscan.io/tx/${tx.hash}`, '_blank')}
                          className="text-xs text-blue-500 hover:text-blue-400"
                        >
                          View Tx
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className={`${isDark ? 'bg-gray-900/50' : 'bg-white/50'} backdrop-blur-xl border ${isDark ? 'border-gray-800' : 'border-gray-200'} rounded-xl p-12 text-center`}>
          <Wallet className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2">No Wallet Connected</h3>
          <p className="text-gray-500 mb-6">
            Connect your wallet to view your balance, transactions, and verifiable credentials.
          </p>
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-8 py-3 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all flex items-center gap-2 mx-auto"
          >
            {isConnecting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <Wallet className="w-4 h-4" />
                <span>Connect Wallet</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );

  // Other render functions remain the same...
  const renderDashboardContent = () => (
    <>
      <div className="space-y-4">
        <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-gray-500">
          Welcome to your NullProof identity management dashboard
        </p>
      </div>
  
      {/* GitHub Integration Section */}
      <div className={`${isDark ? 'bg-gray-900/50' : 'bg-white/50'} backdrop-blur-xl border ${isDark ? 'border-gray-800' : 'border-gray-200'} rounded-xl p-6`}>
        <div className="flex items-center gap-3 mb-6">
          <Github className="w-6 h-6 text-gray-500" />
          <h3 className="text-xl font-semibold">GitHub Identity Verification</h3>
        </div>
  
        {!isGithubLinked ? (
          <div className="space-y-4">
            <p className="text-gray-500">
              Link your GitHub account to generate your on-chain identity proof
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter GitHub username"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                className={`flex-1 px-4 py-3 rounded-lg border ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
              />
              <button
                onClick={linkGithubAccount}
                disabled={isLinkingGithub || !githubUsername.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all flex items-center gap-2"
              >
                {isLinkingGithub ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Linking...</span>
                  </>
                ) : (
                  <>
                    <Github className="w-4 h-4" />
                    <span>Link GitHub</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">GitHub account linked successfully</p>
                  <p className="text-sm text-gray-500">@{githubUsername}</p>
                </div>
              </div>
              <button
                onClick={() => window.open(`https://github.com/${githubUsername}`, '_blank')}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-400 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                View Profile
              </button>
            </div>
  
            {!proofGenerated ? (
              <button
                onClick={generateProof}
                disabled={isGeneratingProof}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
              >
                {isGeneratingProof ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating Proof...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    <span>Generate Identity Proof</span>
                  </>
                )}
              </button>
            ) : (
              <div className={`p-6 rounded-xl border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                    userType === 'founder' 
                      ? 'bg-gold-500/20 text-yellow-500 border border-yellow-500/30'
                      : userType === 'contributor'
                      ? 'bg-blue-500/20 text-blue-500 border border-blue-500/30'
                      : 'bg-green-500/20 text-green-500 border border-green-500/30'
                  }`}>
                    {userType === 'founder' && <TrendingUp className="w-4 h-4" />}
                    {userType === 'contributor' && <Users className="w-4 h-4" />}
                    {userType === 'investor' && <User className="w-4 h-4" />}
                    <span className="capitalize">{userType}</span>
                  </div>
                </div>
  
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-500">GitHub Stats</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Public Repos:</span>
                        <span className="text-sm font-medium">{proofData?.githubStats.publicRepos}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Followers:</span>
                        <span className="text-sm font-medium">{proofData?.githubStats.followers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Contributions:</span>
                        <span className="text-sm font-medium">{proofData?.githubStats.contributions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Account Age:</span>
                        <span className="text-sm font-medium">{proofData?.githubStats.accountAge} years</span>
                      </div>
                    </div>
                  </div>
  
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-500">On-Chain Stats</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Transactions:</span>
                        <span className="text-sm font-medium">{proofData?.onChainStats.transactionCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Wallet Age:</span>
                        <span className="text-sm font-medium">{proofData?.onChainStats.walletAge} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Total Volume:</span>
                        <span className="text-sm font-medium">{proofData?.onChainStats.totalVolume.toFixed(2)} ETH</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Contract Interactions:</span>
                        <span className="text-sm font-medium">{proofData?.onChainStats.contractInteractions}</span>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div className="mt-6 pt-4 border-t border-gray-300 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Proof Status:</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-500">Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );

  const renderGovernanceContent = () => (
    <div className="space-y-4">
      <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Governance
      </h1>
      <p className="text-gray-500">Participate in community governance and voting</p>
      <div className={`${isDark ? 'bg-gray-900/50' : 'bg-white/50'} backdrop-blur-xl border ${isDark ? 'border-gray-800' : 'border-gray-200'} rounded-xl p-6`}>
        <p>Governance content coming soon...</p>
      </div>
    </div>
  );

  const renderSettingsContent = () => (
    <div className="space-y-4">
      <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Settings
      </h1>
      <p className="text-gray-500">Configure your account preferences</p>
      <div className={`${isDark ? 'bg-gray-900/50' : 'bg-white/50'} backdrop-blur-xl border ${isDark ? 'border-gray-800' : 'border-gray-200'} rounded-xl p-6`}>
        <p>Settings content coming soon...</p>
      </div>
    </div>
  );

  const renderSecurityContent = () => (
    <div className="space-y-4">
      <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Security
      </h1>
      <p className="text-gray-500">Manage your security settings and verifications</p>
      <div className={`${isDark ? 'bg-gray-900/50' : 'bg-white/50'} backdrop-blur-xl border ${isDark ? 'border-gray-800' : 'border-gray-200'} rounded-xl p-6`}>
        <p>Security content coming soon...</p>
      </div>
    </div>
  );

  const renderLeaderboardContent = () => (
    <div className="space-y-4">
      <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Leaderboard
      </h1>
      <p className="text-gray-500">View community rankings and achievements</p>
      <div className={`${isDark ? 'bg-gray-900/50' : 'bg-white/50'} backdrop-blur-xl border ${isDark ? 'border-gray-800' : 'border-gray-200'} rounded-xl p-6`}>
        <p>Leaderboard content coming soon...</p>
      </div>
    </div>
  );

  // Rest of the component remains the same...
  return (
    <div className={`min-h-screen flex w-full ${isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Sidebar - same as before */}
      <div className={`fixed inset-y-0 left-0 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out ${sidebarCollapsed ? 'lg:w-16' : 'lg:w-72'} w-72`}>
        <div className={`h-full ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-xl border-r ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
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
        {/* Simplified Header */}
        <header className={`h-20 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-xl border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} flex items-center justify-between px-4 lg:px-8 relative z-[100]`}>
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
            <button className="hover:bg-gray-800/50 rounded-xl h-12 w-12 border border-transparent hover:border-blue-500/20 relative group flex items-center justify-center transition-all">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            </button>
            
            {/* Simplified Wallet Buttons */}
            <div className="flex items-center gap-2">
              {walletConnected ? (
                <>
                  <button
                    onClick={requestAccountSelection}
                    className={`${isDark ? 'bg-gray-800/50 border-blue-500/40 text-blue-400 hover:bg-blue-500/10' : 'bg-gray-100 border-blue-500/40 text-blue-600 hover:bg-blue-50'} font-medium px-4 py-2 rounded-lg border transition-all text-sm`}
                  >
                    Switch
                  </button>
                  <button
                    onClick={disconnectWallet}
                    className={`${isDark ? 'bg-gray-800/50 border-red-500/40 text-red-400 hover:bg-red-500/10' : 'bg-gray-100 border-red-500/40 text-red-600 hover:bg-red-50'} font-medium px-4 py-2 rounded-lg border transition-all text-sm`}
                  >
                    Disconnect
                  </button>
                </>
              ) : (
                <button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-6 py-2 rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all flex items-center gap-2"
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

        {/* Dynamic Main Content */}
        <main className="flex-1 p-4 lg:p-6 space-y-6 overflow-auto">
          {renderMainContent()}
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

export default Dashboard;
