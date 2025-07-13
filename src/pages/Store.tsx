
import { useState } from "react";
import { Filter, SlidersHorizontal, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { GameCard } from "@/components/GameCard";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Store = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');

  const categories = [
    { id: 'all', name: 'All Games', count: 1250 },
    { id: 'action', name: 'Action', count: 234 },
    { id: 'rpg', name: 'RPG', count: 189 },
    { id: 'strategy', name: 'Strategy', count: 156 },
    { id: 'racing', name: 'Racing', count: 98 },
    { id: 'adventure', name: 'Adventure', count: 167 },
    { id: 'indie', name: 'Indie', count: 312 },
    { id: 'simulation', name: 'Simulation', count: 94 }
  ];

  const games = [
    {
      id: "1",
      title: "Cyberpunk Nexus",
      price: 59.99,
      originalPrice: 79.99,
      discount: 25,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
      tags: ["Action", "RPG", "Cyberpunk"],
      isNew: true
    },
    {
      id: "2",
      title: "Stellar Odyssey",
      price: 49.99,
      originalPrice: 69.99,
      discount: 30,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop",
      tags: ["Adventure", "Sci-Fi"]
    },
    {
      id: "3",
      title: "Shadow Realms",
      price: 39.99,
      originalPrice: 59.99,
      discount: 33,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
      tags: ["Fantasy", "Action"]
    },
    {
      id: "4",
      title: "Quantum Drift",
      price: 29.99,
      originalPrice: 39.99,
      discount: 25,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop",
      tags: ["Racing", "Sci-Fi"],
      isNew: true
    },
    {
      id: "5",
      title: "Mystic Legends",
      price: 19.99,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      tags: ["RPG", "Fantasy"]
    },
    {
      id: "6",
      title: "Urban Warfare",
      price: 34.99,
      originalPrice: 49.99,
      discount: 30,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
      tags: ["Action", "Shooter"]
    },
    {
      id: "7",
      title: "Space Colony",
      price: 24.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop",
      tags: ["Strategy", "Simulation"],
      isNew: true
    },
    {
      id: "8",
      title: "Ancient Guardians",
      price: 44.99,
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=300&fit=crop",
      tags: ["Adventure", "Mystery"]
    }
  ];

  const gameCardRefs = games.map(() => useScrollAnimation<HTMLDivElement>());

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-game-text mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full text-left flex items-center justify-between p-2 rounded-lg transition-colors ${
                selectedCategory === category.id 
                  ? 'bg-game-cyan/20 text-game-cyan' 
                  : 'text-game-muted hover:text-game-text hover:bg-game-surface'
              }`}
            >
              <span>{category.name}</span>
              <span className="text-xs">{category.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-game-text mb-4">Price Range</h3>
        <div className="space-y-2">
          {[
            { label: 'Free', count: 45 },
            { label: 'Under $10', count: 128 },
            { label: '$10 - $30', count: 234 },
            { label: '$30 - $60', count: 189 },
            { label: 'Over $60', count: 76 }
          ].map((range) => (
            <button
              key={range.label}
              className="w-full text-left flex items-center justify-between p-2 rounded-lg text-game-muted hover:text-game-text hover:bg-game-surface transition-colors"
            >
              <span>{range.label}</span>
              <span className="text-xs">{range.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-game-text mb-4">Features</h3>
        <div className="space-y-2">
          {[
            'Single Player',
            'Multiplayer',
            'Co-op',
            'VR Support',
            'Controller Support',
            'Cloud Saves'
          ].map((feature) => (
            <label key={feature} className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-game-glass-border bg-game-surface" />
              <span className="text-game-muted hover:text-game-text transition-colors">{feature}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-game-text mb-2">Game Store</h1>
            <p className="text-game-muted">Discover your next favorite game</p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Input
                placeholder="Search games..."
                className="w-64 bg-game-surface border-game-glass-border text-game-text placeholder-game-muted focus:border-game-cyan"
              />
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-game-surface border-game-glass-border text-game-text">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-panel border-game-glass-border">
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="release-date">Release Date</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex items-center border border-game-glass-border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                className={viewMode === 'grid' ? 'bg-game-cyan text-game-bg' : 'text-game-muted hover:text-game-text'}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                className={viewMode === 'list' ? 'bg-game-cyan text-game-bg' : 'text-game-muted hover:text-game-text'}
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Mobile Filter */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden border-game-glass-border text-game-text">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="glass-strong border-game-glass-border w-80">
                <div className="mt-8">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 glass-panel p-6 h-fit">
            <FilterSidebar />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Active Filters */}
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-game-muted">Active filters:</span>
              <Badge variant="secondary" className="bg-game-cyan/20 text-game-cyan border-game-cyan/30">
                All Games
                <button className="ml-2 hover:text-game-text">×</button>
              </Badge>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-game-muted">
                Showing {games.length} of 1,250 games
              </p>
            </div>

            {/* Games Grid */}
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }>
              {games.map((game, i) => (
                <div
                  key={game.id}
                  ref={gameCardRefs[i].ref}
                  className={`fade-in-up${gameCardRefs[i].visible ? ' visible' : ''}`}
                >
                  <GameCard {...game} />
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button className="bg-game-cyan hover:bg-game-cyan/80 text-game-bg font-semibold px-8 py-3">
                Load More Games
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Store;
