
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Play, TrendingUp, Clock, Star, Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GameCard } from "@/components/GameCard";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showEventModal, setShowEventModal] = useState(false);

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
    },
    {
      id: "4",
      title: "Neon Horizon",
      description: "A breathtaking journey through a neon-lit city of the future.",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=1200&h=600&fit=crop",
      price: 44.99,
      originalPrice: 64.99,
      discount: 31
    },
    {
      id: "5",
      title: "Starbound Legacy",
      description: "Explore the stars and uncover ancient secrets in this epic space RPG.",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&h=600&fit=crop",
      price: 54.99,
      originalPrice: 74.99,
      discount: 27
    }
  ];

  const trendingGames = [
    {
      id: "6",
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
      id: "7",
      title: "Mystic Legends",
      price: 19.99,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      tags: ["RPG", "Fantasy"]
    },
    {
      id: "8",
      title: "Urban Warfare",
      price: 34.99,
      originalPrice: 49.99,
      discount: 30,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
      tags: ["Action", "Shooter"]
    },
    {
      id: "9",
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
    },
    {
      id: 'f4',
      title: 'Quantum Protocol',
      releaseDate: '2024-11-20',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop',
      description: 'A mind-bending puzzle game set in quantum mechanics.'
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
      <section ref={featuredSection.ref} className={`absolute top-0 left-0 w-full h-screen z-0 overflow-hidden fade-in-up${featuredSection.visible ? ' visible' : ''}`}>
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
      <div className="h-screen" />

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

      {/* Special Offers Section */}
      <section className="py-16 bg-gradient-to-b from-transparent to-game-surface/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Star className="w-6 h-6 text-red-500" />
              <h2 className="text-3xl font-bold text-game-text">Special Offers</h2>
            </div>
            <Link to="/store">
              <Button variant="outline" className="border-game-glass-border text-game-text hover:bg-game-surface">
                View All Offers
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: "30",
                title: "Digital Dreams",
                price: 39.99,
                originalPrice: 59.99,
                discount: 33,
                rating: 4.9,
                image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
                tags: ["Indie", "Puzzle"]
              },
              {
                id: "31",
                title: "Neon Racer",
                price: 19.99,
                originalPrice: 29.99,
                discount: 33,
                rating: 4.6,
                image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
                tags: ["Racing", "Arcade"]
              },
              {
                id: "32",
                title: "Cyber Defense",
                price: 29.99,
                originalPrice: 39.99,
                discount: 25,
                rating: 4.2,
                image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop",
                tags: ["Strategy", "Tower Defense"]
              },
              {
                id: "33",
                title: "Stellar Command",
                price: 39.99,
                originalPrice: 49.99,
                discount: 20,
                rating: 4.7,
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
                tags: ["Strategy", "Sci-Fi"]
              }
            ].map((game, i) => (
              <div
                key={game.id}
              >
                <GameCard {...game} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Releases Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Star className="w-6 h-6 text-game-cyan" />
            <h2 className="text-3xl font-bold text-game-text">New Releases</h2>
          </div>
          <Link to="/store">
            <Button variant="outline" className="border-game-glass-border text-game-text hover:bg-game-surface">
              View All New
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              id: "34",
              title: "Quantum Protocol",
              price: 49.99,
              rating: 4.8,
              image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop",
              tags: ["Puzzle", "Indie"],
              isNew: true
            },
            {
              id: "35",
              title: "Crystal Chronicles",
              price: 44.99,
              rating: 4.7,
              image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
              tags: ["Adventure", "Fantasy"],
              isNew: true
            },
            {
              id: "36",
              title: "Neon Warriors",
              price: 34.99,
              originalPrice: 44.99,
              discount: 22,
              rating: 4.5,
              image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
              tags: ["Action", "Fighting"],
              isNew: true
            },
            {
              id: "37",
              title: "Shadow Tactics",
              price: 24.99,
              rating: 4.4,
              image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
              tags: ["Stealth", "Strategy"],
              isNew: true
            }
          ].map((game, i) => (
            <div
              key={game.id}
            >
              <GameCard {...game} />
            </div>
          ))}
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
              { name: "Action", count: 234 },
              { name: "RPG", count: 189 },
              { name: "Strategy", count: 156 },
              { name: "Racing", count: 98 },
              { name: "Adventure", count: 167 },
              { name: "Indie", count: 312 }
            ].map((category) => (
              <Card key={category.name} className="glass-panel p-6 text-center hover:scale-105 transition-all cursor-pointer hover-glow group">
                <h3 className="font-semibold text-game-text group-hover:text-game-cyan transition-colors text-lg">
                  {category.name}
                </h3>
                <p className="text-sm text-game-muted mt-2">{category.count} games</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Free Games Section */}
      <section className="py-16 bg-gradient-to-b from-transparent to-game-surface/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Star className="w-6 h-6 text-green-500" />
              <h2 className="text-3xl font-bold text-game-text">Free Games</h2>
            </div>
            <Link to="/store">
              <Button variant="outline" className="border-game-glass-border text-game-text hover:bg-game-surface">
                View All Free
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: "38",
                title: "Crystal Quest",
                price: 0,
                rating: 4.3,
                image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
                tags: ["Adventure", "Puzzle"]
              },
              {
                id: "39",
                title: "Quantum Puzzle",
                price: 0,
                rating: 4.1,
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
                tags: ["Puzzle", "Indie"]
              },
              {
                id: "40",
                title: "Neon Escape",
                price: 0,
                rating: 4.2,
                image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
                tags: ["Puzzle", "Arcade"]
              },
              {
                id: "41",
                title: "Digital Storm",
                price: 0,
                rating: 4.6,
                image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop",
                tags: ["Action", "Arcade"]
              }
            ].map((game, i) => (
              <div
                key={game.id}
              >
                <GameCard {...game} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events & Announcements Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Star className="w-6 h-6 text-yellow-500" />
            <h2 className="text-3xl font-bold text-game-text">Events & Announcements</h2>
          </div>
          <Link to="/store">
            <Button variant="outline" className="border-game-glass-border text-game-text hover:bg-game-surface">
              View All Events
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              id: "e1",
              title: "Summer Gaming Fest",
              date: "2024-07-15",
              time: "10:00 AM - 8:00 PM",
              location: "Convention Center",
              type: "Festival",
              image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
              description: "Join us for the biggest gaming festival of the summer! Experience new game demos, meet developers, participate in tournaments, and enjoy exclusive discounts on your favorite games.",
              attendees: 2500,
              price: "Free",
              organizer: "GameVault Events"
            },
            {
              id: "e2",
              title: "Indie Showcase",
              date: "2024-08-20",
              time: "2:00 PM - 6:00 PM",
              location: "Digital Arena",
              type: "Showcase",
              image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
              description: "Discover the next big indie games! Meet independent developers, play exclusive demos, and support the future of gaming. Special discounts available for showcased games.",
              attendees: 800,
              price: "Free",
              organizer: "Indie Developers Guild"
            },
            {
              id: "e3",
              title: "Cyberpunk Week",
              date: "2024-09-10",
              time: "All Week",
              location: "Online & Local Venues",
              type: "Theme Week",
              image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
              description: "Immerse yourself in the neon-lit world of cyberpunk gaming! Special events, themed tournaments, exclusive content drops, and massive discounts on cyberpunk games.",
              attendees: 1500,
              price: "Free",
              organizer: "Cyberpunk Gaming Community"
            },
            {
              id: "e4",
              title: "Strategy Tournament",
              date: "2024-10-05",
              time: "12:00 PM - 10:00 PM",
              location: "Esports Arena",
              type: "Tournament",
              image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop",
              description: "Compete in the ultimate strategy gaming tournament! Multiple game categories, cash prizes, and the chance to prove you're the best strategist. Registration required.",
              attendees: 500,
              price: "$25 Entry",
              organizer: "Strategy Gaming League"
            }
          ].map((event) => (
            <Card 
              key={event.id} 
              className="glass-panel overflow-hidden hover:scale-105 transition-all cursor-pointer hover-glow group"
              onClick={() => {
                setSelectedEvent(event);
                setShowEventModal(true);
              }}
            >
              <div className="relative">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-yellow-500 text-white font-medium">{event.type}</Badge>
                </div>
                <div className="absolute bottom-2 left-2">
                  <Badge className="bg-game-cyan text-game-bg font-medium">{event.price}</Badge>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-game-text text-lg mb-2 group-hover:text-game-cyan transition-colors line-clamp-1">
                  {event.title}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-game-muted mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-game-muted mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-game-muted">
                  <Users className="w-4 h-4" />
                  <span>{event.attendees} attendees</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Spotlight / Editor's Picks Section */}
      <section className="py-16 bg-gradient-to-b from-transparent to-game-surface/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Star className="w-6 h-6 text-purple-500" />
              <h2 className="text-3xl font-bold text-game-text">Editor's Picks</h2>
            </div>
            <Link to="/store">
              <Button variant="outline" className="border-game-glass-border text-game-text hover:bg-game-surface">
                View All Picks
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: "46",
                title: "Cyberpunk Nexus",
                price: 59.99,
                originalPrice: 79.99,
                discount: 25,
                rating: 4.8,
                image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
                tags: ["Action", "RPG", "Cyberpunk"]
              },
              {
                id: "47",
                title: "Stellar Odyssey",
                price: 49.99,
                originalPrice: 69.99,
                discount: 30,
                rating: 4.7,
                image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop",
                tags: ["Adventure", "Sci-Fi"]
              },
              {
                id: "48",
                title: "Shadow Realms",
                price: 39.99,
                originalPrice: 59.99,
                discount: 33,
                rating: 4.6,
                image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
                tags: ["Fantasy", "Action"]
              },
              {
                id: "49",
                title: "Ancient Scrolls",
                price: 39.99,
                originalPrice: 59.99,
                discount: 33,
                rating: 4.8,
                image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=300&fit=crop",
                tags: ["RPG", "Adventure"]
              }
            ].map((game, i) => (
              <div
                key={game.id}
              >
                <GameCard {...game} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Added Games */}
      <section className="py-16 bg-gradient-to-b from-transparent to-game-surface/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-3 mb-8">
            <Star className="w-6 h-6 text-game-cyan" />
            <h2 className="text-3xl font-bold text-game-text">Coming Soon</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {futureGames.map((game) => (
              <Card key={game.id} className="glass-panel overflow-hidden hover:scale-105 transition-all cursor-pointer hover-glow group">
                <div className="relative">
                  <img src={game.image} alt={game.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-game-cyan text-game-bg font-medium">Coming Soon</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-game-text text-lg mb-2 group-hover:text-game-cyan transition-colors line-clamp-1">{game.title}</h3>
                  <p className="text-sm text-game-muted mb-3 line-clamp-2">{game.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-game-cyan font-medium">Release: {game.releaseDate}</span>
                    <Button variant="outline" size="sm" className="border-game-glass-border text-game-text hover:bg-game-surface">
                      Wishlist
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-game-surface border border-game-glass-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedEvent.image} 
                alt={selectedEvent.title} 
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
                onClick={() => setShowEventModal(false)}
              >
                ×
              </Button>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-game-text">{selectedEvent.title}</h2>
                <Badge className="bg-yellow-500 text-white font-medium">{selectedEvent.type}</Badge>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-2 text-game-muted">
                  <Calendar className="w-5 h-5" />
                  <span>{selectedEvent.date} • {selectedEvent.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-game-muted">
                  <MapPin className="w-5 h-5" />
                  <span>{selectedEvent.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-game-muted">
                  <Users className="w-5 h-5" />
                  <span>{selectedEvent.attendees} attendees expected</span>
                </div>
                <div className="flex items-center space-x-2 text-game-muted">
                  <span className="font-medium text-game-cyan">{selectedEvent.price}</span>
                </div>
              </div>
              
              <p className="text-game-muted mb-6 leading-relaxed">{selectedEvent.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-game-muted">Organized by {selectedEvent.organizer}</span>
                <div className="flex space-x-3">
                  <Button variant="outline" className="border-game-glass-border text-game-text hover:bg-game-surface">
                    Add to Calendar
                  </Button>
                  <Button className="bg-game-cyan hover:bg-game-cyan/80 text-game-bg font-semibold">
                    Register Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
