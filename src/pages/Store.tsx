
import { useState } from "react";
import { Filter, SlidersHorizontal, Grid, List, Clock, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { GameCard } from "@/components/GameCard";
import { Card } from "@/components/ui/card";

const Store = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [searchQuery, setSearchQuery] = useState("");

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

  const priceRanges = [
    { label: 'all', text: 'All', test: () => true },
    { label: 'free', text: 'Free', test: (price: number) => price === 0 },
    { label: 'under10', text: 'Under $10', test: (price: number) => price > 0 && price < 10 },
    { label: '10-30', text: '$10 - $30', test: (price: number) => price >= 10 && price <= 30 },
    { label: '30-60', text: '$30 - $60', test: (price: number) => price > 30 && price <= 60 },
    { label: 'over60', text: 'Over $60', test: (price: number) => price > 60 }
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
      isNew: true,
      description: "Experience the ultimate futuristic adventure in a neon-lit metropolis where every choice shapes your destiny.",
      developer: "NeonStudio",
      releaseDate: "2024-03-15"
    },
    {
      id: "2",
      title: "Stellar Odyssey",
      price: 49.99,
      originalPrice: 69.99,
      discount: 30,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop",
      tags: ["Adventure", "Sci-Fi"],
      description: "Embark on an epic journey across the galaxy in this space exploration adventure.",
      developer: "SpaceGames Inc",
      releaseDate: "2024-02-20"
    },
    {
      id: "3",
      title: "Shadow Realms",
      price: 39.99,
      originalPrice: 59.99,
      discount: 33,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
      tags: ["Fantasy", "Action"],
      description: "Uncover the mysteries of the dark fantasy world in this atmospheric RPG.",
      developer: "DarkForge Games",
      releaseDate: "2024-01-10"
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
      isNew: true,
      description: "Race through quantum dimensions in this high-speed futuristic racing game.",
      developer: "SpeedTech",
      releaseDate: "2024-04-05"
    },
    {
      id: "5",
      title: "Mystic Legends",
      price: 19.99,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      tags: ["RPG", "Fantasy"],
      description: "A magical journey through ancient realms filled with mystical creatures and powerful spells.",
      developer: "Mystic Studios",
      releaseDate: "2024-05-12"
    },
    {
      id: "6",
      title: "Urban Warfare",
      price: 34.99,
      originalPrice: 49.99,
      discount: 30,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
      tags: ["Action", "Shooter"],
      description: "Intense tactical combat in urban environments with advanced AI and realistic physics.",
      developer: "Tactical Games",
      releaseDate: "2024-03-28"
    },
    {
      id: "7",
      title: "Space Colony",
      price: 24.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop",
      tags: ["Strategy", "Simulation"],
      isNew: true,
      description: "Build and manage your own space colony in this strategic simulation game.",
      developer: "Colony Studios",
      releaseDate: "2024-04-15"
    },
    {
      id: "8",
      title: "Ancient Guardians",
      price: 44.99,
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=300&fit=crop",
      tags: ["Adventure", "Mystery"],
      description: "Explore ancient ruins and uncover forgotten secrets in this archaeological adventure.",
      developer: "Archaeology Games",
      releaseDate: "2024-05-20"
    },
    {
      id: "9",
      title: "Digital Dreams",
      price: 39.99,
      originalPrice: 59.99,
      discount: 33,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
      tags: ["Indie", "Puzzle"],
      isNew: true,
      description: "A mind-bending puzzle game that challenges your perception of reality.",
      developer: "Dream Studios",
      releaseDate: "2024-02-10"
    },
    {
      id: "10",
      title: "Crystal Quest",
      price: 14.99,
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
      tags: ["Adventure", "Puzzle"],
      description: "Journey through crystal caves and solve ancient puzzles in this enchanting adventure.",
      developer: "Crystal Games",
      releaseDate: "2024-06-01"
    },
    {
      id: "11",
      title: "Neon Racer",
      price: 19.99,
      originalPrice: 29.99,
      discount: 33,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
      tags: ["Racing", "Arcade"],
      description: "High-speed racing through neon-lit cityscapes with stunning visual effects.",
      developer: "Neon Racing",
      releaseDate: "2024-03-01"
    },
    {
      id: "12",
      title: "Mystic Realms: Awakening",
      price: 49.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=300&fit=crop",
      tags: ["RPG", "Fantasy"],
      isNew: true,
      description: "Magic returns to the world in this story-driven fantasy adventure with epic battles.",
      developer: "Mystic Realms Studio",
      releaseDate: "2024-01-25"
    },
    {
      id: "13",
      title: "Cyber Defense",
      price: 29.99,
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop",
      tags: ["Strategy", "Tower Defense"],
      description: "Defend your digital fortress against waves of cyber threats in this strategic tower defense.",
      developer: "Cyber Defense Games",
      releaseDate: "2024-04-10"
    },
    {
      id: "14",
      title: "Stellar Command",
      price: 39.99,
      originalPrice: 49.99,
      discount: 20,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
      tags: ["Strategy", "Sci-Fi"],
      description: "Command your fleet across the stars in this epic space strategy game.",
      developer: "Stellar Games",
      releaseDate: "2024-03-15"
    },
    {
      id: "15",
      title: "Shadow Tactics",
      price: 24.99,
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
      tags: ["Stealth", "Strategy"],
      description: "Master the art of stealth in this tactical infiltration game.",
      developer: "Shadow Studios",
      releaseDate: "2024-05-05"
    },
    {
      id: "16",
      title: "Quantum Puzzle",
      price: 9.99,
      rating: 4.1,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      tags: ["Puzzle", "Indie"],
      description: "Solve mind-bending quantum puzzles in this innovative indie game.",
      developer: "Quantum Studios",
      releaseDate: "2024-06-15"
    },
    {
      id: "17",
      title: "Neon Warriors",
      price: 34.99,
      originalPrice: 44.99,
      discount: 22,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
      tags: ["Action", "Fighting"],
      description: "Fight in neon-lit arenas with stunning martial arts and special effects.",
      developer: "Neon Warriors Studio",
      releaseDate: "2024-04-20"
    },
    {
      id: "18",
      title: "Crystal Kingdom",
      price: 19.99,
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      tags: ["Adventure", "Fantasy"],
      description: "Explore a magical crystal kingdom filled with wonder and mystery.",
      developer: "Crystal Kingdom Games",
      releaseDate: "2024-05-10"
    },
    {
      id: "19",
      title: "Digital Storm",
      price: 29.99,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop",
      tags: ["Action", "Adventure"],
      isNew: true,
      description: "Navigate through digital storms in this action-packed adventure game.",
      developer: "Digital Storm Studios",
      releaseDate: "2024-03-25"
    },
    {
      id: "20",
      title: "Starbound Legacy",
      price: 54.99,
      originalPrice: 74.99,
      discount: 27,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=300&fit=crop",
      tags: ["RPG", "Sci-Fi"],
      isNew: true,
      description: "Continue the legacy in this epic space RPG with branching storylines.",
      developer: "Starbound Studios",
      releaseDate: "2024-04-30"
    }
  ];

  // Filtering logic
  const filteredGames = games.filter((game) => {
    // Category filter
    const categoryMatch = selectedCategory === 'all' || game.tags.map(t => t.toLowerCase()).includes(selectedCategory);
    // Price filter
    const priceRangeObj = priceRanges.find(r => r.label === selectedPriceRange) || priceRanges[0];
    const priceMatch = priceRangeObj.test(game.price);
    // Search filter
    const q = searchQuery.trim().toLowerCase();
    const searchMatch =
      !q ||
      game.title.toLowerCase().includes(q) ||
      game.description?.toLowerCase().includes(q) ||
      game.tags.some((tag: string) => tag.toLowerCase().includes(q));
    return categoryMatch && priceMatch && searchMatch;
  });

  const StoreListCard = ({ game }: { game: any }) => (
    <Card 
      className="glass-panel p-6 transition-all duration-300 hover-glow cursor-pointer hover:scale-[1.02]"
    >
      <div className="flex items-center space-x-6">
        <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={game.image} 
            alt={game.title}
            className="w-full h-full object-cover"
          />
          {game.isNew && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-game-cyan text-game-bg font-medium">NEW</Badge>
            </div>
          )}
          {game.discount && (
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-red-600 text-white font-medium">-{game.discount}%</Badge>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-xl font-semibold text-game-text">{game.title}</h3>
            {game.isNew && (
              <Badge className="bg-game-cyan text-game-bg font-medium">NEW</Badge>
            )}
          </div>
          <div className="flex items-center space-x-6 text-sm text-game-muted mb-2">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>{game.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>{game.developer}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>Released: {game.releaseDate}</span>
            </div>
          </div>
          <p className="text-sm text-game-muted line-clamp-2 mb-3">{game.description}</p>
          <div className="flex flex-wrap gap-2">
            {game.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="bg-game-surface text-game-muted text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end space-y-3">
          <div className="text-right">
            {game.originalPrice && (
              <div className="text-sm text-game-muted line-through">
                ${game.originalPrice}
              </div>
            )}
            <div className="text-2xl font-bold text-game-cyan">
              ${game.price}
            </div>
          </div>
          <Button className="bg-game-cyan hover:bg-game-cyan/80 text-game-bg font-semibold">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );

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
          {priceRanges.slice(1).map((range) => (
            <button
              key={range.label}
              onClick={() => setSelectedPriceRange(range.label)}
              className={`w-full text-left flex items-center justify-between p-2 rounded-lg transition-colors ${
                selectedPriceRange === range.label 
                  ? 'bg-game-cyan/20 text-game-cyan' 
                  : 'text-game-muted hover:text-game-text hover:bg-game-surface'
              }`}
            >
              <span>{range.text}</span>
            </button>
          ))}
          <button
            onClick={() => setSelectedPriceRange('all')}
            className={`w-full text-left flex items-center justify-between p-2 rounded-lg transition-colors ${
              selectedPriceRange === 'all' 
                ? 'bg-game-cyan/20 text-game-cyan' 
                : 'text-game-muted hover:text-game-text hover:bg-game-surface'
            }`}
          >
            <span>All</span>
          </button>
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
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

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
          <aside className="hidden md:block w-64 glass-panel p-6 h-fit rounded-2xl">
            <FilterSidebar />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Active Filters */}
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-game-muted">Active filters:</span>
              <Badge variant="secondary" className="bg-game-cyan/20 text-game-cyan border-game-cyan/30">
                {selectedCategory === 'all' ? 'All Games' : categories.find(c => c.id === selectedCategory)?.name}
                <button className="ml-2 hover:text-game-text">×</button>
              </Badge>
              <Badge variant="secondary" className="bg-game-cyan/20 text-game-cyan border-game-cyan/30">
                {selectedPriceRange === 'all' ? 'All Prices' : priceRanges.find(r => r.label === selectedPriceRange)?.text}
                <button className="ml-2 hover:text-game-text">×</button>
              </Badge>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-game-muted">
                Showing {filteredGames.length} of {games.length} games
              </p>
            </div>

            {/* Games Display */}
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }>
              {filteredGames.map((game) => (
                viewMode === 'grid' ? (
                <GameCard key={game.id} {...game} />
                ) : (
                  <StoreListCard key={game.id} game={game} />
                )
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
