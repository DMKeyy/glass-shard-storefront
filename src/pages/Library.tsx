
import { useState } from "react";
import { Play, Download, Settings, Filter, Grid, List, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Library = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const games = [
    {
      id: "1",
      title: "Cyberpunk Nexus",
      status: "installed",
      lastPlayed: "2 hours ago",
      playtime: "45.5 hours",
      size: "67.2 GB",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
      downloadProgress: 100
    },
    {
      id: "2",
      title: "Stellar Odyssey",
      status: "downloading",
      lastPlayed: "Never",
      playtime: "0 hours",
      size: "42.8 GB",
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop",
      downloadProgress: 65
    },
    {
      id: "3",
      title: "Shadow Realms",
      status: "update-available",
      lastPlayed: "1 day ago",
      playtime: "23.2 hours",
      size: "38.5 GB",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      downloadProgress: 100
    },
    {
      id: "4",
      title: "Quantum Drift",
      status: "installed",
      lastPlayed: "3 days ago",
      playtime: "12.8 hours",
      size: "25.1 GB",
      image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop",
      downloadProgress: 100
    },
    {
      id: "5",
      title: "Mystic Legends",
      status: "not-installed",
      lastPlayed: "Never",
      playtime: "0 hours",
      size: "31.4 GB",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      downloadProgress: 0
    },
    {
      id: "6",
      title: "Urban Warfare",
      status: "installed",
      lastPlayed: "1 week ago",
      playtime: "89.3 hours",
      size: "55.7 GB",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
      downloadProgress: 100
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'installed':
        return <Badge className="bg-green-600 text-white">Installed</Badge>;
      case 'downloading':
        return <Badge className="bg-game-cyan text-game-bg">Downloading</Badge>;
      case 'update-available':
        return <Badge className="bg-yellow-600 text-white">Update Available</Badge>;
      case 'not-installed':
        return <Badge variant="secondary" className="bg-game-surface text-game-muted">Not Installed</Badge>;
      default:
        return null;
    }
  };

  const getActionButton = (game: any) => {
    switch (game.status) {
      case 'installed':
        return (
          <Button className="bg-game-cyan hover:bg-game-cyan/80 text-game-bg font-semibold">
            <Play className="w-4 h-4 mr-2" />
            Play
          </Button>
        );
      case 'downloading':
        return (
          <Button variant="outline" className="border-game-glass-border text-game-text" disabled>
            Downloading... {game.downloadProgress}%
          </Button>
        );
      case 'update-available':
        return (
          <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            Update
          </Button>
        );
      case 'not-installed':
        return (
          <Button variant="outline" className="border-game-cyan text-game-cyan hover:bg-game-cyan hover:text-game-bg">
            <Download className="w-4 h-4 mr-2" />
            Install
          </Button>
        );
      default:
        return null;
    }
  };

  const GameGridCard = ({ game }: { game: any }) => (
    <Card className="glass-panel overflow-hidden transition-all duration-300 hover:scale-105 hover-glow">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img 
          src={game.image} 
          alt={game.title}
          className="w-full h-full object-cover"
        />
        
        {/* Status Overlay */}
        <div className="absolute top-2 left-2">
          {getStatusBadge(game.status)}
        </div>

        {/* Download Progress */}
        {game.status === 'downloading' && (
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 backdrop-blur-sm">
            <Progress value={game.downloadProgress} className="h-2" />
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-game-text line-clamp-1">{game.title}</h3>
          <div className="flex items-center justify-between text-sm text-game-muted mt-1">
            <span>{game.playtime}</span>
            <span>{game.size}</span>
          </div>
          <p className="text-xs text-game-muted mt-1">Last played: {game.lastPlayed}</p>
        </div>

        <div className="flex items-center justify-between">
          {getActionButton(game)}
          <Button variant="ghost" size="icon" className="text-game-muted hover:text-game-text">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );

  const GameListCard = ({ game }: { game: any }) => (
    <Card className="glass-panel p-4 transition-all duration-300 hover-glow">
      <div className="flex items-center space-x-4">
        <div className="relative w-24 h-16 rounded overflow-hidden flex-shrink-0">
          <img 
            src={game.image} 
            alt={game.title}
            className="w-full h-full object-cover"
          />
          {game.status === 'downloading' && (
            <div className="absolute bottom-0 left-0 right-0">
              <Progress value={game.downloadProgress} className="h-1" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-game-text truncate">{game.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-game-muted">
            <span>{game.playtime}</span>
            <span>Last played: {game.lastPlayed}</span>
            <span>{game.size}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {getStatusBadge(game.status)}
          {getActionButton(game)}
          <Button variant="ghost" size="icon" className="text-game-muted hover:text-game-text">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );

  const filteredGames = games.filter(game => {
    if (filterBy === 'all') return true;
    return game.status === filterBy;
  });

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-game-text mb-2">My Library</h1>
            <p className="text-game-muted">{filteredGames.length} games in your library</p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-game-muted" />
              <Input
                placeholder="Search library..."
                className="pl-10 w-64 bg-game-surface border-game-glass-border text-game-text placeholder-game-muted focus:border-game-cyan"
              />
            </div>

            {/* Filter */}
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-40 bg-game-surface border-game-glass-border text-game-text">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-panel border-game-glass-border">
                <SelectItem value="all">All Games</SelectItem>
                <SelectItem value="installed">Installed</SelectItem>
                <SelectItem value="downloading">Downloading</SelectItem>
                <SelectItem value="update-available">Updates Available</SelectItem>
                <SelectItem value="not-installed">Not Installed</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32 bg-game-surface border-game-glass-border text-game-text">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-panel border-game-glass-border">
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="playtime">Playtime</SelectItem>
                <SelectItem value="size">Size</SelectItem>
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
          </div>
        </div>

        {/* Active Downloads */}
        {games.some(g => g.status === 'downloading') && (
          <Card className="glass-panel p-6 mb-8">
            <h2 className="text-xl font-semibold text-game-text mb-4 flex items-center">
              <Download className="w-5 h-5 mr-2 text-game-cyan" />
              Active Downloads
            </h2>
            <div className="space-y-4">
              {games.filter(g => g.status === 'downloading').map(game => (
                <div key={game.id} className="flex items-center space-x-4">
                  <div className="w-16 h-10 rounded overflow-hidden">
                    <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-game-text">{game.title}</span>
                      <span className="text-sm text-game-muted">{game.downloadProgress}%</span>
                    </div>
                    <Progress value={game.downloadProgress} className="h-2" />
                  </div>
                  <Button variant="ghost" size="sm" className="text-game-muted hover:text-game-text">
                    Pause
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Games Grid/List */}
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }>
          {filteredGames.map((game) => (
            viewMode === 'grid' 
              ? <GameGridCard key={game.id} game={game} />
              : <GameListCard key={game.id} game={game} />
          ))}
        </div>

        {/* Empty State */}
        {filteredGames.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-game-surface flex items-center justify-center">
              <Filter className="w-12 h-12 text-game-muted" />
            </div>
            <h3 className="text-xl font-semibold text-game-text mb-2">No games found</h3>
            <p className="text-game-muted mb-6">Try adjusting your filters or search terms.</p>
            <Button variant="outline" className="border-game-glass-border text-game-text hover:bg-game-surface">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
