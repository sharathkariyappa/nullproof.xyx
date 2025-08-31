import { useEffect, useState } from "react";
import { BadgeCheck, Lock, Coins, ShieldCheck, Clock, AlertCircle } from "lucide-react";

type Props = {
  isDark: boolean;
  myWallet?: string;
};

type VCData = {
  jwt: string;
  vc: any;
};

type StakingInfo = {
  hasVCStake: boolean;
  vcStakeAmount: string;
  requiredAmount: string;
  isStaking: boolean;
};

export default function VerifiableCredentialsPage({ isDark, myWallet }: Props) {
  const card = isDark
    ? "bg-transparent border border-[var(--glass-border)]"
    : "bg-white border border-gray-200";

    const pill = "px-2.5 py-1 rounded-full text-xs font-medium";
  const textClass = isDark ? "text-gradient-nullproof" : "text-black";
  const iconClass = isDark ? "text-gradient-nullproof" : "text-black";

  const [loading, setLoading] = useState(false);
  const [vcData, setVcData] = useState<VCData | null>(null);
  const [githubUser, setGithubUser] = useState<string | null>(null);
  const [stakingInfo, setStakingInfo] = useState<StakingInfo>({
    hasVCStake: false,
    vcStakeAmount: "0",
    requiredAmount: "50",
    isStaking: false
  });
  const [tokenBalance, setTokenBalance] = useState<string>("0");
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Check if user already has a VC and staking status
  useEffect(() => {
    if (!myWallet) return;
    
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch VC data
        const vcRes = await fetch(`${backendUrl}/api/vc/by-wallet/${myWallet}`);
        if (vcRes.ok) {
          const vcData = await vcRes.json();
          setVcData(vcData);
        }

        // Fetch staking status
        const stakingRes = await fetch(`${backendUrl}/api/contract/staking-status/${myWallet}`);
        if (stakingRes.ok) {
          const stakingData = await stakingRes.json();
          setStakingInfo(stakingData);
        }

        // Fetch token balance
        const balanceRes = await fetch(`${backendUrl}/api/contract/balance/${myWallet}`);
        if (balanceRes.ok) {
          const balanceData = await balanceRes.json();
          setTokenBalance(balanceData.balance);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [myWallet, backendUrl]);

  useEffect(() => {
    const userData = getGithubUsernameFromCookie();
    if (userData) {
      setGithubUser(userData.login);
    }
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

  // Handle token staking
  const handleStakeTokens = async () => {
    if (!window.ethereum || !myWallet) {
      alert("Please connect your wallet first.");
      return;
    }

    if (parseFloat(tokenBalance) < parseFloat(stakingInfo.requiredAmount)) {
      alert(`Insufficient balance. You need ${stakingInfo.requiredAmount} CRT tokens.`);
      return;
    }

    try {
      setStakingInfo(prev => ({ ...prev, isStaking: true }));
      
      const message = `I want to stake ${stakingInfo.requiredAmount} CRT tokens for VC issuance: ${myWallet}`;
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [message, myWallet],
      });

      const res = await fetch(`${backendUrl}/api/contract/stake/vc`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: myWallet,
          amount: stakingInfo.requiredAmount,
          message,
          signature,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStakingInfo(prev => ({
          ...prev,
          hasStaked: true,
          stakedAmount: stakingInfo.requiredAmount,
          isStaking: false
        }));
        // Update token balance
        setTokenBalance(prev => 
          (parseFloat(prev) - parseFloat(stakingInfo.requiredAmount)).toString()
        );
        alert("Tokens staked successfully! You can now issue VCs.");
      } else {
        alert(data.error || "Failed to stake tokens");
      }
    } catch (err) {
      console.error("Staking error:", err);
      alert("Error staking tokens");
    } finally {
      setStakingInfo(prev => ({ ...prev, isStaking: false }));
    }
  };

  // Handle VC issuance (only if staked)
  const handleIssueVC = async () => {
    if (!window.ethereum || !myWallet) {
      alert("Please connect your wallet first.");
      return;
    }

    if (!stakingInfo.hasVCStake) {
      alert("Please stake tokens first to issue a VC.");
      return;
    }

    try {
      setLoading(true);
      const message = `I want to issue a Verifiable Credential for: ${myWallet}`;
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [message, myWallet],
      });

      const res = await fetch(`${backendUrl}/api/vc/issue`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: myWallet,
          message,
          signature,
          githubUsername: githubUser || null,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setVcData(data);
        alert("VC issued successfully!");
      } else {
        alert(data.error || "Failed to issue VC");
      }
    } catch (err) {
      console.error("VC issue error:", err);
      alert("Error issuing VC");
    } finally {
      setLoading(false);
    }
  };

  // Handle unstaking (optional)
  const handleUnstakeTokens = async () => {
    if (!window.ethereum || !myWallet) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      setStakingInfo(prev => ({ ...prev, isStaking: true }));
      
      const message = `I want to unstake my CRT tokens: ${myWallet}`;
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [message, myWallet],
      });

      const res = await fetch(`${backendUrl}/api/staking/unstake`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: myWallet,
          message,
          signature,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStakingInfo({
          hasVCStake: false,
          vcStakeAmount: "0",
          requiredAmount: stakingInfo.requiredAmount,
          isStaking: false
        });
        // Update token balance
        setTokenBalance(prev => 
          (parseFloat(prev) + parseFloat(stakingInfo.vcStakeAmount)).toString()
        );
        // Clear VC data as it's no longer valid
        setVcData(null);
        alert("Tokens unstaked successfully! Your VC has been revoked.");
      } else {
        alert(data.error || "Failed to unstake tokens");
      }
    } catch (err) {
      console.error("Unstaking error:", err);
      alert("Error unstaking tokens");
    } finally {
      setStakingInfo(prev => ({ ...prev, isStaking: false }));
    }
  };

  const getStatusPill = () => {
    if (vcData) {
      return (
        <span className="bg-green-500/10 text-green-400 border border-green-400/30 items-center gap-2 justify-center inline-flex py-1.5 px-3 rounded-full">
          <BadgeCheck className="w-3.5 h-3.5" /> VC Active
        </span>
      );
    } else if (stakingInfo.hasVCStake) {
      return (
        <span className="bg-blue-500/10 text-blue-400 border border-blue-400/30 items-center gap-2 justify-center inline-flex py-1.5 px-3 rounded-full">
          <Coins className="w-3.5 h-3.5" /> Staked - Ready for VC
        </span>
      );
    } else {
      return (
        <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-400/30 items-center gap-2 justify-center inline-flex py-1.5 px-3 rounded-full">
          <AlertCircle className="w-3.5 h-3.5" /> Stake Required
        </span>
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2">
          <span className={`${pill} ${getStatusPill()}`}>
            {getStatusPill()}
          </span>
        </div>

        <h1 className={`text-2xl md:text-3xl font-bold ${textClass}`}>
          Verifiable Credentials
        </h1>
      </div>

      {/* Balance Info */}
      {myWallet && (
        <div className={`p-4 rounded-lg border ${card}`}>
          <div className="flex items-center justify-between">
            <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Your CRT Balance: <span className="font-semibold">{tokenBalance} CRT</span>
            </span>
            <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Staked: <span className="font-semibold">{stakingInfo.vcStakeAmount} CRT</span>
            </span>
          </div>
        </div>
      )}

      {/* Action Card */}
      <div className={`p-5 rounded-2xl border shadow-xl ${card}`}>
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl shadow-md">
            <Coins className={`w-5 h-5 ${iconClass}`} />
          </div>

          <div className="flex-1">
            <h2 className={`font-semibold mb-1 ${textClass}`}>
              {vcData
                ? "Your Verifiable Credential is Active"
                : stakingInfo.hasVCStake
                ? "Ready to Issue Verifiable Credential"
                : "Stake $CRT to Issue Credentials"}
            </h2>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              } mb-3`}
            >
              {vcData
                ? "This credential proves your on-chain and off-chain reputation. Use it in supported dApps."
                : stakingInfo.hasVCStake
                ? "You have staked the required tokens. You can now create your verifiable credential."
                : `To create and anchor a VC on-chain, you'll stake ${stakingInfo.requiredAmount} $CRT. Staked tokens secure the network and enable revocation & updates.`}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {vcData ? (
                <>
                  <button
                    onClick={() => navigator.clipboard.writeText(vcData.jwt)}
                    className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium shadow-md"
                  >
                    Copy VC JWT
                  </button>
                  {/* <button
                    onClick={handleUnstakeTokens}
                    disabled={stakingInfo.isStaking}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium shadow-md"
                  >
                    {stakingInfo.isStaking ? "Unstaking..." : "Unstake & Revoke VC"}
                  </button> */}
                </>
              ) : stakingInfo.hasVCStake ? (
                <button
                  disabled={loading}
                  onClick={handleIssueVC}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium shadow-md"
                >
                  {loading ? "Issuing VC..." : "Issue VC"}
                </button>
              ) : (
                <button
                  disabled={stakingInfo.isStaking || parseFloat(tokenBalance) < parseFloat(stakingInfo.requiredAmount)}
                  onClick={handleStakeTokens}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium shadow-md disabled:opacity-50"
                >
                  {stakingInfo.isStaking 
                    ? "Staking..." 
                    : `Stake ${stakingInfo.requiredAmount} CRT`}
                </button>
              )}

              <span
                className={`ml-auto text-xs ${
                  isDark ? "text-gray-500" : "text-gray-500"
                }`}
              >
                {myWallet
                  ? `Connected: ${myWallet.slice(0, 6)}...${myWallet.slice(-4)}`
                  : "Wallet not connected"}
              </span>
            </div>

            {/* Insufficient balance warning */}
            {!stakingInfo.hasVCStake && parseFloat(tokenBalance) < parseFloat(stakingInfo.requiredAmount) && (
              <div className="mt-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-400/30">
                <p className="text-sm text-yellow-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Insufficient balance. You need {stakingInfo.requiredAmount} CRT but have {tokenBalance} CRT.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* VC Preview */}
      {vcData ? (
        <div className={`p-4 rounded-2xl border ${card}`}>
          <h3 className={`text-sm font-semibold mb-2 ${textClass}`}>
            VC Preview
          </h3>
          <pre className="text-xs overflow-auto max-h-48 bg-black/10 p-2 rounded">
            {JSON.stringify(vcData.vc, null, 2)}
          </pre>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-2xl border ${card}`}>
            <div className="flex items-center gap-2 mb-2">
              <BadgeCheck className={`w-4 h-4 ${iconClass}`} />
              <h3 className={`text-sm font-semibold ${textClass}`}>
                Proof of Contribution
              </h3>
            </div>
            <p
              className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Verify GitHub commits, PRs, issues, and repo impact as a credential.
            </p>
          </div>

          <div className={`p-4 rounded-2xl border ${card}`}>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className={`w-4 h-4 ${iconClass}`} />
              <h3 className={`text-sm font-semibold ${textClass}`}>
                On-chain Activity
              </h3>
            </div>
            <p
              className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Anchor your degen score, governance votes, and NFT provenance.
            </p>
          </div>

          <div className={`p-4 rounded-2xl border ${card}`}>
            <div className="flex items-center gap-2 mb-2">
              <Lock className={`w-4 h-4 ${iconClass}`} />
              <h3 className={`text-sm font-semibold ${textClass}`}>
                Privacy-First
              </h3>
            </div>
            <p
              className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Selective disclosure & revocation. You control what you reveal.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}