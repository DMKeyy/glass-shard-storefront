
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Store", path: "/store" },
    { name: "Library", path: "/library" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b border-game-glass-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-game-cyan to-game-purple rounded-lg flex items-center justify-center">
            <span className="text-game-bg font-bold text-sm">G</span>
          </div>
          <span className="text-xl font-bold text-gradient">GameVault</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-all hover:text-game-cyan ${
                isActive(item.path) ? "text-game-cyan" : "text-game-muted"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-game-muted" />
            <Input
              placeholder="Search games..."
              className="pl-10 bg-game-surface border-game-glass-border text-game-text placeholder-game-muted focus:border-game-cyan"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="text-game-muted hover:text-game-cyan hover:bg-game-surface">
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-game-muted hover:text-game-cyan hover:bg-game-surface">
                <User className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass-panel border-game-glass-border">
              <DropdownMenuItem className="text-game-text hover:bg-game-surface">Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-game-text hover:bg-game-surface">Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-game-text hover:bg-game-surface">Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-game-muted hover:text-game-cyan">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass-strong border-game-glass-border w-80">
              <div className="flex flex-col space-y-6 mt-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-game-muted" />
                  <Input
                    placeholder="Search games..."
                    className="pl-10 bg-game-surface border-game-glass-border text-game-text"
                  />
                </div>
                
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-all hover:text-game-cyan ${
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
