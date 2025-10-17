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
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={helpzzLogo} alt="Helpzz" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                Categories
              </Link>
              <Link
                to="/#benefits"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  goToSection('benefits');
                }}
              >
                Benefits
              </Link>
              <Link to="/examples" className="text-muted-foreground hover:text-foreground transition-colors">
                Examples
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <Link to="/auth">
                <Button variant="outline" size="sm">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="sm" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                  Get Started
                </Button>
              </Link>
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
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors py-2">
                Home
              </Link>
              <Link to="/categories" className="text-muted-foreground hover:text-foreground transition-colors py-2">
                Categories
              </Link>
              <Link
                to="/#benefits"
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  goToSection('benefits');
                }}
              >
                Benefits
              </Link>
              <Link to="/examples" className="text-muted-foreground hover:text-foreground transition-colors py-2">
                Examples
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors py-2">
                Contact
              </Link>
              <div className="flex flex-col space-y-3 pt-4">
                <Link to="/auth" className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/contact" className="w-full">
                  <Button size="sm" className="bg-gradient-primary w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;