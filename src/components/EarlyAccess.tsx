import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const EarlyAccess = () => {
  const [email, setEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !walletAddress) {
      toast({
        title: "Missing Information",
        description: "Please enter both your email and wallet address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitted(true);
    toast({
      title: "Success!",
      description: "You've been added to our early access list.",
    });

    setEmail("");
    setWalletAddress("");
  };

  return (
    <section className="py-20 relative">
      {/* Background layers */}
      <div className="absolute inset-0 bg-transparent"></div>
      <div className="absolute inset-0 bg-transparent"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <Card className="bg-glass-bg backdrop-blur-xl border border-glass-border shadow-2xl animate-fade-in">
          <CardContent className="p-12">
            {/* Icon + Title */}
            <div className="mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow animate-glow">
                <Mail className="w-8 h-8 text-primary-foreground" />
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Get{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Early Access
                </span>
              </h2>

              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Be among the first to experience the future of digital identity.
                Join our exclusive early access program and shape the Web3 identity revolution.
              </p>
            </div>

            {/* Form / Success State */}
            {!isSubmitted ? (
              <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto w-full"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-[220px] bg-input/50 border-border/50 focus:border-primary/50 backdrop-blur-xl"
                required
              />
              <Input
                type="text"
                placeholder="Enter your wallet address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="flex-1 min-w-[220px] bg-input/50 border-border/50 focus:border-primary/50 backdrop-blur-xl"
                required
              />
              <Button
                type="submit"
                className="flex-none bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-primary-foreground font-semibold px-8 whitespace-nowrap group"
              >
                Join Waitlist
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
            
            ) : (
              <div className="flex items-center justify-center gap-3 text-accent animate-slide-up">
                <CheckCircle className="w-6 h-6" />
                <span className="text-lg font-medium">
                  You're on the list! We'll be in touch soon.
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default EarlyAccess;
