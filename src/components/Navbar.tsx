
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Store", path: "/store" },
    { name: "Library", path: "/library" },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(currentScrollY < lastScrollY);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-transform duration-300 ease-in-out bg-transparent mt-4 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="container mx-auto flex items-center justify-between gap-4 h-16">
        {/* Part 1: Logo Section */}
        <div className="glass-panel border border-game-glass-border rounded-full px-6 py-3 flex items-center bg-transparent backdrop-blur-md">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-game-cyan to-game-purple rounded-full flex items-center justify-center">
              <span className="text-game-bg font-bold text-sm">G</span>
            </div>
            <span className="text-xl font-bold text-gradient">GameVault</span>
          </Link>
        </div>
        {/* Part 2: Navigation & Search Section */}
        <div className="glass-panel border border-game-glass-border rounded-full px-6 py-3 flex items-center space-x-6 flex-1 max-w-2xl mx-4 bg-transparent backdrop-blur-md">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-all hover:text-game-cyan hover:-translate-y-1 hover:shadow-md duration-200 ${
                  isActive(item.path) ? "text-game-cyan" : "text-game-muted"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-game-muted" />
              <Input
                placeholder="Search games..."
                className="pl-10 bg-game-surface border-game-glass-border text-game-text placeholder-game-muted focus:border-game-cyan rounded-full"
              />
            </div>
          </div>
          {/* Cart Button */}
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="text-game-muted hover:text-game-cyan hover:bg-game-surface transition-all duration-200 hover:-translate-y-1 hover:shadow-md rounded-full">
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </Link>
        </div>
        {/* Part 3: Profile Section */}
        <div className="glass-panel border border-game-glass-border rounded-full px-6 py-3 flex items-center space-x-4 bg-transparent backdrop-blur-md">
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="text-game-muted hover:text-game-cyan hover:bg-game-surface transition-all duration-200 hover:-translate-y-1 hover:shadow-md rounded-full">
              <User className="w-5 h-5" />
            </Button>
          </Link>
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-game-muted hover:text-game-cyan transition-all duration-200 hover:-translate-y-1 hover:shadow-md rounded-full">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass-strong border-game-glass-border w-80 rounded-l-3xl">
              <div className="flex flex-col space-y-6 mt-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-game-muted" />
                  <Input
                    placeholder="Search games..."
                    className="pl-10 bg-game-surface border-game-glass-border text-game-text rounded-full"
                  />
                </div>
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-all hover:text-game-cyan hover:-translate-y-1 hover:shadow-md duration-200 ${
                        isActive(item.path) ? "text-game-cyan" : "text-game-text"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
