import { Button } from "@/components/ui/button";
import { Shield, Zap, Eye, Lock, ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-3d.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,hsl(250_100%_70%_/_0.12)_0%,transparent_100%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,hsl(180_100%_70%_/_0.08)_0%,transparent_100%)]"></div>
      
      {/* Animated Grid with Shimmer */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(250_100%_70%_/_0.03)_1px,transparent_1px),linear-gradient(90deg,hsl(250_100%_70%_/_0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-40"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary-glow rounded-full animate-float opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Content Side */}
          <div className="space-y-10 animate-fade-up">
            {/* Premium Badge */}
            <div className="inline-flex items-center mt-6 gap-3 px-6 py-3 bg-glass-bg backdrop-blur-xl border border-glass-border rounded-full hover:border-primary/40 transition-all duration-300 group cursor-default">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Revolutionary zk-Native Identity Protocol
              </span>
              <div className="w-2 h-2 bg-accent rounded-full animate-glow-pulse"></div>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-8xl font-bold leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-accent via-primary to-primary-glow bg-clip-text text-transparent">
                  NullProof
                </span>
              </h1>
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight">
                Redefining Digital 
                <br />
                <span className="bg-gradient-to-r from-accent via-primary to-primary-glow bg-clip-text text-transparent">
                  Identity Forever
                </span>
              </h2>
            </div>
            
            {/* Enhanced Description */}
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl font-light">
              Experience the future of digital identity with our revolutionary 
              <span className="text-accent font-medium"> AI-powered </span>
              zero-knowledge protocol. Security, privacy, and authenticity 
              <span className="text-primary font-medium"> reimagined</span>.
            </p>
            
            {/* Premium Feature Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, text: "Privacy First", desc: "Zero-knowledge proofs" },
                { icon: Zap, text: "AI Powered", desc: "Intelligent verification" },
                { icon: Eye, text: "Fully Verifiable", desc: "Transparent & trustless" },
                { icon: Lock, text: "Ultra Secure", desc: "Military-grade encryption" }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="group p-5 rounded-2xl bg-glass-bg backdrop-blur-xl border border-glass-border hover:bg-glass-hover hover:border-primary/30 transition-all duration-500 cursor-default animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-foreground text-lg">{feature.text}</span>
                      <p className="text-sm text-muted-foreground mt-1">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Enhanced Visual Side */}
          <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              {/* Enhanced Glow Effects */}
              <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-accent/15 to-primary-glow/20 rounded-3xl blur-3xl animate-glow-pulse"></div>
              
              {/* Main Visual Container */}
              <div className="relative bg-glass-bg backdrop-blur-xl border border-glass-border rounded-3xl p-8 group hover:border-primary/30 transition-all duration-700">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-shimmer"></div>
                
                <img 
                  src={heroImage}
                  alt="Null Proof - Revolutionary ZK Identity Protocol Visualization"
                  className="w-full h-auto rounded-2xl transform group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Badge Elements */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center animate-float shadow-glow group-hover:shadow-accent transition-shadow">
                  <Shield className="w-10 h-10 text-primary-foreground" />
                </div>
                
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-accent to-primary-glow rounded-2xl flex items-center justify-center animate-float shadow-accent" style={{ animationDelay: '1.5s' }}>
                  <Zap className="w-8 h-8 text-primary-foreground" />
                </div>
                
                <div className="absolute top-1/2 -right-4 w-12 h-12 bg-gradient-to-br from-primary-glow to-primary rounded-xl flex items-center justify-center animate-float opacity-80" style={{ animationDelay: '2.5s' }}>
                  <Eye className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;