import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coins, TrendingUp, Lock, Users, Zap, Shield } from "lucide-react";

const Tokenomics = () => {
  const tokenUtilities = [
    {
      icon: Shield,
      title: "Identity Verification",
      description: "Stake tokens to validate your identity and boost your trust score."
    },
    {
      icon: Zap,
      title: "Transaction Fees",
      description: "Covers badge minting, premium badge purchases, and on-chain reputation services."
    },
    {
      icon: TrendingUp,
      title: "Governance Rights",
      description: "Participate in protocol governance by voting on upgrades and key ecosystem proposals."
    },
    {
      icon: Users,
      title: "Rewards Program",
      description: "Earn tokens for active participation, referrals, and contributions to the platform."
    }    
  ];

  const tokenAllocation = [
    { category: "Dev Team", percentage: 25, color: "from-primary to-primary-glow" },
    { category: "KOLs", percentage: 10, color: "from-accent to-primary" },
    { category: "DcodeBlock", percentage: 10, color: "from-primary-glow to-accent" },
    { category: "Airdrops", percentage: 5, color: "from-accent to-primary-glow" },
    { category: "Virtuals", percentage: 50, color: "from-primary to-accent" }
  ];  

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">$CRT</span> Tokenomics
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Our token economy is designed to incentivize participation, ensure security, 
            and drive the growth of the decentralized identity ecosystem
          </p>
        </div>

        <Tabs defaultValue="utility" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-glass-bg backdrop-blur-xl border border-glass-border">
            <TabsTrigger value="utility" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              Token Utility
            </TabsTrigger>
            <TabsTrigger value="allocation" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              Token Allocation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="utility" className="mt-8">
            <div className="grid md:grid-cols-2 gap-8 animate-slide-up">
              {tokenUtilities.map((utility, index) => (
                <Card key={index} className="bg-glass-bg backdrop-blur-xl border border-glass-border hover:border-primary/30 transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <utility.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                          {utility.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {utility.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="allocation" className="mt-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center animate-slide-up">
              {/* Allocation Chart Visualization */}
              <div className="relative">
                <div className="w-80 h-80 mx-auto relative">
                  {tokenAllocation.map((item, index) => {
                    const angle = (item.percentage / 100) * 360;
                    const rotation = tokenAllocation.slice(0, index).reduce((acc, curr) => acc + (curr.percentage / 100) * 360, 0);
                    
                    return (
                      <div
                        key={index}
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.color} opacity-80`}
                        style={{
                          clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((rotation - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((rotation - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((rotation + angle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((rotation + angle - 90) * Math.PI / 180)}%)`,
                        }}
                      />
                    );
                  })}
                  <div className="absolute inset-8 bg-background rounded-full border-4 border-primary/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">$CRT</div>
                      <div className="text-sm text-muted-foreground">Token</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Allocation Breakdown */}
              <div className="space-y-4">
                {tokenAllocation.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-glass-bg backdrop-blur-xl border border-glass-border rounded-lg hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${item.color}`}></div>
                      <span className="font-medium text-foreground">{item.category}</span>
                    </div>
                    <div className="text-xl font-bold text-primary">{item.percentage}%</div>
                  </div>
                ))}
                
                <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Lock className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground">Vesting Schedule</span>
                  </div>
                  <ul className="text-muted-foreground text-sm leading-relaxed space-y-2 list-disc list-inside">
                    <li><strong>Dev Team:</strong> 25% — 1-month cliff + 2–4 month linear vesting</li>
                    <li><strong>KOLs:</strong> 10% — 1-month cliff + 3-month linear vesting</li>
                    <li><strong>DcodeBlock:</strong> 10% — 1-month cliff + 3-month linear vesting</li>
                    <li><strong>Airdrops:</strong> 5% — Distributed during Zealy quests (no vesting)</li>
                    <li><strong>Virtuals Vault:</strong> 50% — Protocol-handled (locked)</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Tokenomics;