
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Play, ShoppingCart, Heart, Share2, Star, Monitor, Gamepad2, Users, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const GamePage = () => {
  const { id } = useParams();
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const game = {
    id: "1",
    title: "Cyberpunk Nexus",
    developer: "NeonStudio",
    publisher: "FutureGames",
    releaseDate: "2024-03-15",
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    rating: 4.8,
    totalReviews: 15420,
    description: "Experience the ultimate futuristic adventure in a neon-lit metropolis where every choice shapes your destiny. Navigate through a world of corporate espionage, underground hacking, and cybernetic enhancement.",
    longDescription: "Cyberpunk Nexus is an open-world action RPG set in the sprawling megacity of Neo Tokyo. As a freelance mercenary, you'll dive into a world of high-tech, low-life where corporations rule and the line between human and machine blurs. Your choices will determine not just your own fate, but the future of the city itself.",
    tags: ["Action", "RPG", "Cyberpunk", "Open World", "Story Rich"],
    platforms: ["Windows", "PlayStation", "Xbox"],
    languages: ["English", "Spanish", "French", "German", "Japanese"],
    screenshots: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=450&fit=crop"
    ],
    systemRequirements: {
      minimum: {
        os: "Windows 10 64-bit",
        processor: "Intel i5-8400 / AMD Ryzen 5 2600",
        memory: "8 GB RAM",
        graphics: "GTX 1060 6GB / RX 580 8GB",
        storage: "50 GB available space"
      },
      recommended: {
        os: "Windows 11 64-bit",
        processor: "Intel i7-10700K / AMD Ryzen 7 3700X",
        memory: "16 GB RAM",
        graphics: "RTX 3070 / RX 6700 XT",
        storage: "50 GB available space (SSD recommended)"
      }
    },
    features: [
      "Single-player campaign",
      "Open world exploration",
      "Character customization",
      "Multiple endings",
      "Ray tracing support",
      "4K resolution support"
    ]
  };

  const reviews = [
    {
      id: 1,
      author: "CyberGamer_2024",
      rating: 5,
      helpful: 234,
      date: "2024-03-20",
      content: "Absolutely stunning game! The world-building is incredible and the story kept me hooked for hours. The graphics are next-level with ray tracing enabled.",
      hoursPlayed: 45
    },
    {
      id: 2,
      author: "RPGMaster",
      rating: 4,
      helpful: 189,
      date: "2024-03-18",
      content: "Great game overall, though I encountered a few minor bugs. The character progression system is deep and rewarding. Definitely worth the price.",
      hoursPlayed: 67
    },
    {
      id: 3,
      author: "TechReviewer",
      rating: 5,
      helpful: 156,
      date: "2024-03-16",
      content: "Optimized beautifully! Runs smooth on my RTX 4070. The cyberpunk aesthetic is perfectly executed. This is what next-gen gaming should look like.",
      hoursPlayed: 23
    }
  ];

  const nextScreenshot = () => {
    setCurrentScreenshot((prev) => (prev + 1) % game.screenshots.length);
  };

  const prevScreenshot = () => {
    setCurrentScreenshot((prev) => (prev - 1 + game.screenshots.length) % game.screenshots.length);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-game-muted mb-8">
          <Link to="/store" className="hover:text-game-cyan transition-colors">Store</Link>
          <span>/</span>
          <Link to="/store" className="hover:text-game-cyan transition-colors">Action</Link>
          <span>/</span>
          <span className="text-game-text">{game.title}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Media Gallery */}
            <Card className="glass-panel overflow-hidden">
              <div className="relative aspect-video">
                <img 
                  src={game.screenshots[currentScreenshot]}
                  alt={`${game.title} screenshot ${currentScreenshot + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 glass-panel hover:bg-game-surface text-game-text"
                  onClick={prevScreenshot}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 glass-panel hover:bg-game-surface text-game-text"
                  onClick={nextScreenshot}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button className="bg-game-cyan hover:bg-game-cyan/80 text-game-bg font-semibold px-6 py-3 rounded-full glow-cyan">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Trailer
                  </Button>
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="p-4 flex space-x-2 overflow-x-auto">
                {game.screenshots.map((screenshot, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentScreenshot(index)}
                    className={`flex-shrink-0 w-20 h-12 rounded overflow-hidden border-2 transition-all ${
                      index === currentScreenshot ? 'border-game-cyan' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={screenshot} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </Card>

            {/* Game Info Tabs */}
            <Tabs defaultValue="description" className="space-y-6">
              <TabsList className="glass-panel p-1">
                <TabsTrigger value="description" className="data-[state=active]:bg-game-cyan data-[state=active]:text-game-bg">
                  Description
                </TabsTrigger>
                <TabsTrigger value="requirements" className="data-[state=active]:bg-game-cyan data-[state=active]:text-game-bg">
                  System Requirements
                </TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-game-cyan data-[state=active]:text-game-bg">
                  Reviews ({game.totalReviews.toLocaleString()})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-6">
                <Card className="glass-panel p-6">
                  <h3 className="text-xl font-semibold text-game-text mb-4">About This Game</h3>
                  <p className="text-game-muted leading-relaxed mb-6">{game.longDescription}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-game-text mb-2">Key Features</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {game.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-game-muted">
                            <div className="w-2 h-2 bg-game-cyan rounded-full mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="requirements" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="glass-panel p-6">
                    <h3 className="text-lg font-semibold text-game-text mb-4">Minimum Requirements</h3>
                    <div className="space-y-3">
                      {Object.entries(game.systemRequirements.minimum).map(([key, value]) => (
                        <div key={key} className="flex flex-col">
                          <span className="text-sm font-medium text-game-cyan capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="text-game-muted">{value}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="glass-panel p-6">
                    <h3 className="text-lg font-semibold text-game-text mb-4">Recommended Requirements</h3>
                    <div className="space-y-3">
                      {Object.entries(game.systemRequirements.recommended).map(([key, value]) => (
                        <div key={key} className="flex flex-col">
                          <span className="text-sm font-medium text-game-cyan capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="text-game-muted">{value}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card className="glass-panel p-6">
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-game-cyan">{game.rating}</div>
                      <div className="flex items-center justify-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(game.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} 
                          />
                        ))}
                      </div>
                      <div className="text-sm text-game-muted mt-1">Overall Rating</div>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center space-x-2">
                          <span className="text-sm text-game-muted w-8">{stars}★</span>
                          <Progress value={stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 7 : stars === 2 ? 2 : 1} className="flex-1" />
                          <span className="text-sm text-game-muted w-12">(1.2k)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id} className="glass-panel p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-game-cyan to-game-purple rounded-full flex items-center justify-center">
                            <span className="text-game-bg font-bold text-sm">{review.author[0]}</span>
                          </div>
                          <div>
                            <div className="font-semibold text-game-text">{review.author}</div>
                            <div className="text-sm text-game-muted">{review.hoursPlayed} hours played</div>
                          </div>
                        </div>
                        <div className="text-sm text-game-muted">{review.date}</div>
                      </div>

                      <div className="flex items-center space-x-2 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} 
                          />
                        ))}
                      </div>

                      <p className="text-game-muted mb-4">{review.content}</p>

                      <div className="flex items-center justify-between">
                        <button className="text-sm text-game-muted hover:text-game-cyan transition-colors">
                          👍 Helpful ({review.helpful})
                        </button>
                        <button className="text-sm text-game-muted hover:text-game-cyan transition-colors">
                          Report
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <Card className="glass-panel p-6 sticky top-24">
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-game-text mb-2">{game.title}</h1>
                  <p className="text-game-muted">by {game.developer}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-game-surface text-game-muted border-game-glass-border">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(game.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-game-muted">({game.totalReviews.toLocaleString()} reviews)</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    {game.originalPrice && (
                      <span className="text-lg text-game-muted line-through">
                        ${game.originalPrice}
                      </span>
                    )}
                    <span className="text-2xl font-bold text-game-cyan">
                      ${game.price}
                    </span>
                  </div>

                  {game.discount && (
                    <Badge className="bg-red-600 text-white font-medium">
                      -{game.discount}% OFF
                    </Badge>
                  )}
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-game-cyan hover:bg-game-cyan/80 text-game-bg font-semibold py-3 glow-cyan">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-game-glass-border text-game-text hover:bg-game-surface"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                    {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </Button>
                  
                  <Button variant="ghost" className="w-full text-game-muted hover:text-game-text hover:bg-game-surface">
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </Card>

            {/* Game Details */}
            <Card className="glass-panel p-6">
              <h3 className="font-semibold text-game-text mb-4">Game Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-game-muted flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Release Date
                  </span>
                  <span className="text-game-text">{game.releaseDate}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-game-muted flex items-center">
                    <Monitor className="w-4 h-4 mr-2" />
                    Platforms
                  </span>
                  <div className="flex space-x-1">
                    {game.platforms.map((platform) => (
                      <Badge key={platform} variant="secondary" className="text-xs bg-game-surface text-game-muted">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-game-muted flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Publisher
                  </span>
                  <span className="text-game-text">{game.publisher}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-game-muted flex items-center">
                    <Gamepad2 className="w-4 h-4 mr-2" />
                    Languages
                  </span>
                  <span className="text-game-text text-right">{game.languages.slice(0, 2).join(', ')}{game.languages.length > 2 ? ` +${game.languages.length - 2}` : ''}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
