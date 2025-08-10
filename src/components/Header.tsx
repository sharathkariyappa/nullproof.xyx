import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Whitepaper", href: "/NullProof_Whitepaper.pdf", external: true },
  ];

  const handleLaunchApp = () => {
    navigate("/dashboard");
  };

  const renderNavLink = (item) => {
    if (item.external) {
      return (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors font-medium relative group"
        >
          {item.name}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></span>
        </a>
      );
    }
    return (
      <Link
        key={item.name}
        to={item.href}
        className="text-muted-foreground hover:text-foreground transition-colors font-medium relative group"
      >
        {item.name}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></span>
      </Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-glass-bg backdrop-blur-xl border-b border-glass-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img
              src="/logo.png"
              alt="Nullproof Logo"
              className="w-8 h-8 rounded-full object-cover shadow-glow"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              NullProof
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => renderNavLink(item))}
          </nav>

          {/* CTA Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              onClick={handleLaunchApp}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-primary-foreground font-semibold shadow-glow"
            >
              Launch App
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:bg-muted/50 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-glass-bg backdrop-blur-xl border-t border-glass-border animate-slide-up">
          <nav className="flex flex-col p-6 space-y-4">
            {navItems.map((item) => renderNavLink(item))}
            <div className="flex flex-col gap-3 pt-4 border-t border-border/50">
              <Button
                onClick={() => {
                  handleLaunchApp();
                  setIsMenuOpen(false);
                }}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-primary-foreground font-semibold"
              >
                Launch App
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
