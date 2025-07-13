
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Play, TrendingUp, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GameCard } from "@/components/GameCard";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  const featuredGames = [
    {
      id: "1",
      title: "Cyberpunk Nexus",
      description: "Experience the ultimate futuristic adventure in a neon-lit metropolis.",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop",
      price: 59.99,
      originalPrice: 79.99,
      discount: 25
    },
    {
      id: "2", 
      title: "Stellar Odyssey",
      description: "Embark on an epic journey across the galaxy.",
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1200&h=600&fit=crop",
      price: 49.99,
      originalPrice: 69.99,
      discount: 30
    },
    {
      id: "3",
      title: "Shadow Realms",
      description: "Uncover the mysteries of the dark fantasy world.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=600&fit=crop",
      price: 39.99,
      originalPrice: 59.99,
      discount: 33
    }
  ];

  const trendingGames = [
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
    }
  ];

  // Add a list of future added games
  const futureGames = [
    {
      id: 'f1',
      title: 'Neon Horizon',
      releaseDate: '2024-08-15',
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&h=300&fit=crop',
      description: 'A breathtaking journey through a neon-lit city of the future.'
    },
    {
      id: 'f2',
      title: 'Starbound Legacy',
      releaseDate: '2024-09-10',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=300&fit=crop',
      description: 'Explore the stars and uncover ancient secrets in this epic space RPG.'
    },
    {
      id: 'f3',
      title: 'Mystic Realms: Awakening',
      releaseDate: '2024-10-01',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=300&fit=crop',
      description: 'Magic returns to the world in this story-driven fantasy adventure.'
    }
  ];

  const featuredSection = useScrollAnimation<HTMLDivElement>();
  const trendingRefs = trendingGames.map(() => useScrollAnimation<HTMLDivElement>());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredGames.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [featuredGames.length]);

  const nextSlide = () => {
    setSlideDirection('right');
    setCurrentSlide((prev) => (prev + 1) % featuredGames.length);
  };

  const prevSlide = () => {
    setSlideDirection('left');
    setCurrentSlide((prev) => (prev - 1 + featuredGames.length) % featuredGames.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <section ref={featuredSection.ref} className={`relative h-[70vh] overflow-hidden fade-in-up${featuredSection.visible ? ' visible' : ''}`}>
        <div className="absolute inset-0">
          <img 
            src={featuredGames[currentSlide].image}
            alt={featuredGames[currentSlide].title}
            className={`w-full h-full object-cover ${slideDirection === 'left' ? 'slide-in-left' : slideDirection === 'right' ? 'slide-in-right' : ''}`}
            onAnimationEnd={() => setSlideDirection(null)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="hero-fade-bottom" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center space-x-2">
              <Badge className="bg-game-cyan text-game-bg font-medium">FEATURED</Badge>
              {featuredGames[currentSlide].discount && (
                <Badge className="bg-red-600 text-white font-medium">
                  -{featuredGames[currentSlide].discount}% OFF
                </Badge>
              )}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-game-text leading-tight">
              {featuredGames[currentSlide].title}
            </h1>
            
            <p className="text-xl text-game-muted max-w-lg">
              {featuredGames[currentSlide].description}
            </p>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {featuredGames[currentSlide].originalPrice && (
                  <span className="text-xl text-game-muted line-through">
                    ${featuredGames[currentSlide].originalPrice}
                  </span>
                )}
                <span className="text-3xl font-bold text-game-cyan">
                  ${featuredGames[currentSlide].price}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to={`/game/${featuredGames[currentSlide].id}`}>
                <Button className="bg-game-cyan hover:bg-game-cyan/80 text-game-bg font-semibold px-8 py-3 text-lg hover-glow">
                  <Play className="w-5 h-5 mr-2" />
                  Play Now
                </Button>
              </Link>
              
              <Button variant="outline" className="border-game-glass-border text-game-text hover:bg-game-surface px-8 py-3 text-lg">
                Watch Trailer
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 glass-panel hover:bg-game-surface text-game-text"
          onClick={prevSlide}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 glass-panel hover:bg-game-surface text-game-text"
          onClick={nextSlide}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featuredGames.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-game-cyan' : 'bg-white/30'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-game-cyan" />
            <h2 className="text-3xl font-bold text-game-text">Trending Now</h2>
          </div>
          <Link to="/store">
            <Button variant="outline" className="border-game-glass-border text-game-text hover:bg-game-surface">
              View All
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingGames.map((game, i) => (
            <div
              key={game.id}
              ref={trendingRefs[i].ref}
              className={`fade-in-up${trendingRefs[i].visible ? ' visible' : ''}`}
            >
              <GameCard {...game} />
            </div>
          ))}
        </div>
      </section>

      {/* Future Added Games */}
      <section className="py-16 bg-gradient-to-b from-transparent to-game-surface/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-3 mb-8">
            <Star className="w-6 h-6 text-game-cyan" />
            <h2 className="text-3xl font-bold text-game-text">Coming Soon</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {futureGames.map((game) => (
              <Card key={game.id} className="glass-panel p-6 flex flex-col items-center text-center hover:scale-105 transition-all cursor-pointer hover-glow group">
                <img src={game.image} alt={game.title} className="w-full h-40 object-cover rounded mb-4" />
                <h3 className="font-semibold text-game-text text-xl mb-2 group-hover:text-game-cyan transition-colors">{game.title}</h3>
                <p className="text-sm text-game-muted mb-2">{game.description}</p>
                <span className="text-xs text-game-cyan font-medium">Coming {game.releaseDate}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-3 mb-8">
            <Star className="w-6 h-6 text-game-purple" />
            <h2 className="text-3xl font-bold text-game-text">Popular Categories</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Action", icon: "⚔️", count: 234 },
              { name: "RPG", icon: "🏰", count: 189 },
              { name: "Strategy", icon: "♟️", count: 156 },
              { name: "Racing", icon: "🏎️", count: 98 },
              { name: "Adventure", icon: "🗺️", count: 167 },
              { name: "Indie", icon: "💎", count: 312 }
            ].map((category) => (
              <Card key={category.name} className="glass-panel p-6 text-center hover:scale-105 transition-all cursor-pointer hover-glow group">
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-game-text group-hover:text-game-cyan transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-game-muted">{category.count} games</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-game-surface/80 border-t border-game-glass-border py-8 mt-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gradient">GameVault</span>
            <span className="text-game-muted">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex space-x-4">
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-game-muted hover:text-game-cyan transition-colors">Twitter</a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-game-muted hover:text-game-cyan transition-colors">GitHub</a>
            <a href="mailto:support@gamevault.com" className="text-game-muted hover:text-game-cyan transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
