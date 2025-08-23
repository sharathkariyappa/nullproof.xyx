import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, Check, Users } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Users,
      title: "Multi-Source Data Analysis",
      description:
        "Integrates on-chain transaction data with off-chain reputation signals to deliver a complete, trusted identity profile.",
      step: "01",
    },
    {
      icon: Shield,
      title: "Zero-Knowledge Verification",
      description:
        "Enables privacy-first identity checks, proving authenticity without revealing personal details.",
      step: "02",
    },
    {
      icon: Zap,
      title: "Transparent Proofs",
      description:
        "Generates proofs that are verifiable on-chain while safeguarding user data and preserving trust boundaries.",
      step: "03",
    },
    {
      icon: Check,
      title: "Create Verifiable Credentials",
      description:
        "Issue verifiable credentials and showcase authenticity seamlessly across applications.",
      step: "04",
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            How <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Null Proof</span> Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Our revolutionary ZK-based identity protocol combines AI with cryptographic proofs to create 
            a seamless, secure, and private identity verification system
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8 animate-slide-up">
          {steps.map((step, index) => (
            <Card key={index} className="relative bg-transparent border border-glass-border hover:border-primary/30 transition-all duration-300 group overflow-hidden">
              {/* Step Number */}
              <div className="absolute top-4 right-4 text-6xl font-bold text-primary/20 group-hover:text-primary/30 transition-colors">
                {step.step}
              </div>
              
              <CardContent className="p-8 relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Card>
          ))}
        </div>

        {/* Connection Lines */}
        <div className="hidden xl:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl">
          <div className="relative h-px">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
            <div className="absolute top-0 left-1/4 w-2 h-2 bg-primary rounded-full transform -translate-y-1/2 animate-pulse"></div>
            <div className="absolute top-0 left-2/4 w-2 h-2 bg-accent rounded-full transform -translate-y-1/2 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-0 left-3/4 w-2 h-2 bg-primary-glow rounded-full transform -translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;