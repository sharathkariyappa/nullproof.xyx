import { Card, CardContent } from "@/components/ui/card";

const Partners = () => {
  const partners = [
    {
      name: "Dcodeblock",
      description:
        "AI-powered gamified platform for Web3 learning & building projects, enabling developers to transition & unlock opportunities in Web3.",
      logo: "/dcodeblock.jpg",
      badge: "Launch Partner",
      impact: "Backed early integrations",
    },
    {
      name: "Virtuals",
      description:
        "Virtuals Protocol is a society of productive AI agents, each designed to generate services or products and autonomously engage in onchain commerce.",
      logo: "/virtuals1.png",
      badge: "Launching Platform",
      impact: "Genesis protocol vault",
    },
    {
      name: "Base Blockchain",
      description:
        "Base is a secure, low-cost, developer-friendly Ethereum L2 designed to bring the next billion users onchain.",
      logo: "/base.png",
      badge: "Ecosystem Partner",
      impact: "Powering scalable, low-cost transactions",
    },
  ];

  return (
    <section className="py-20 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Launching with{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Top Partners
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Strategic collaborations powering our ecosystem from day one.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
          {partners.map((partner, index) => (
            <Card
              key={index}
              className="bg-transparent border border-glass-border hover:border-primary/30 transition-all duration-300 group h-full"
            >
              <CardContent className="p-4 flex flex-col gap-3 items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {partner.name}
                </h3>
                <span className="text-xs text-muted-foreground">
                  {partner.badge}
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {partner.description}
                </p>
                <div className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-light">
                  {partner.impact}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
