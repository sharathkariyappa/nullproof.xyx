import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Clock } from "lucide-react";

const Roadmap = () => {
  const roadmapData = [
    {
      quarter: "Q3 2025",
      status: "in-progress",
      title: "MVP & Virtuals Launch",
      items: [
        "MVP ready for demo & use",
        "ZK-proof verification",
        "Basic badge minting",
        "Sepolia testnet & Base Testnet",
        "Virtuals Demo Day at Hack2Launch",
      ]
    },
    {
      quarter: "Q4 2025",
      status: "planned",
      title: "DAO & Governance Rollout",
      items: [
        "Governance module & voting",
        "Proposals for badge types & upgrades",
        "Partnerships with DAOs & dApps",
        "Grant platform integrations",
        "Ambassador & bounty programs",
      ]
    },
    {
      quarter: "Q1 2026",
      status: "planned",
      title: "SDK, API, & Custom Badge Layer",
      items: [
        "Plug-and-play SDK",
        "REST + GraphQL APIs",
        "Custom badge marketplace",
        "DAO-curated templates",
      ]
    },
    {
      quarter: "Q2 2026",
      status: "planned",
      title: "Mentorship & Cross-Chain Expansion",
      items: [
        "Mentorship & role networking",
        "AI-based role matching",
        "Cross-chain ZK proofs",
        "DID & ZK proof standardization",
        "EIP/ERC proposals for ZK-role proofs"
      ]
    }
  ];
  

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-6 h-6 text-accent" />;
      case "in-progress":
        return <Clock className="w-6 h-6 text-primary animate-pulse" />;
      default:
        return <Circle className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-accent/20 text-accent border-accent/30">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-primary/20 text-primary border-primary/30">In Progress</Badge>;
      default:
        return <Badge variant="outline" className="border-muted-foreground/30 text-muted-foreground">Planned</Badge>;
    }
  };

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Development <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Roadmap</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Our journey to revolutionize digital identity in Web3. 
            Follow our progress as we build the future of decentralized identity verification.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary-glow transform -translate-x-1/2"></div>
          
          <div className="space-y-16 animate-slide-up">
            {roadmapData.map((phase, index) => (
              <div key={index} className={`relative grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                {/* Timeline Dot */}
                <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-12 h-12 bg-transparent border-2 border-primary rounded-full flex items-center justify-center shadow-glow">
                    {getStatusIcon(phase.status)}
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <Card className="bg-transparent border border-glass-border hover:border-primary/30 transition-all duration-300 group">
                    <CardContent className="p-8">
                      <div className={`flex items-center gap-4 mb-6 ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
                        <div className="lg:hidden">
                          {getStatusIcon(phase.status)}
                        </div>
                        <div>
                          <div className="text-sm text-primary font-medium mb-1">{phase.quarter}</div>
                          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {phase.title}
                          </h3>
                        </div>
                        {getStatusBadge(phase.status)}
                      </div>
                      
                      <div className="space-y-3">
                        {phase.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                            <span className="text-muted-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Spacer for alternate layout */}
                <div className={`hidden lg:block ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;