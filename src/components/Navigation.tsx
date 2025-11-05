import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, LogIn } from 'lucide-react';
import { useState } from 'react';
import helpzzLogo from '@/assets/helpzz-logo.png';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const goToSection = (id: string) => {
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scroll, 50);
    } else {
      scroll();
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Very Large */}
          <Link to="/" className="flex items-center">
            <img src={helpzzLogo} alt="Helpzz - AI Business Solutions" className="h-20 w-auto md:h-16 lg:h-14" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => {
                  if (location.pathname === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    navigate('/');
                  }
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => goToSection("problem")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                The Problem
              </button>
              <button
                onClick={() => goToSection("solution")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Our Solution
              </button>
              <button
                onClick={() => goToSection("pricing")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => goToSection("contact")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={() => goToSection("signup")}>
                <Button size="sm" className="bg-primary hover:bg-primary/90 transition-all duration-300 px-6">
                  Sign Up Now
                </Button>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-border/50">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  if (location.pathname === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    navigate('/');
                  }
                }}
                className="text-muted-foreground hover:text-foreground transition-colors py-2 text-left"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  goToSection("problem");
                }}
                className="text-muted-foreground hover:text-foreground transition-colors py-2 text-left"
              >
                The Problem
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  goToSection("solution");
                }}
                className="text-muted-foreground hover:text-foreground transition-colors py-2 text-left"
              >
                Our Solution
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  goToSection("pricing");
                }}
                className="text-muted-foreground hover:text-foreground transition-colors py-2 text-left"
              >
                Pricing
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  goToSection("contact");
                }}
                className="text-muted-foreground hover:text-foreground transition-colors py-2 text-left"
              >
                Contact
              </button>
              <div className="flex flex-col space-y-3 pt-4">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    goToSection("signup");
                  }}
                  className="w-full"
                >
                  <Button size="sm" className="bg-primary hover:bg-primary/90 w-full">
                    Sign Up Now
                  </Button>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;