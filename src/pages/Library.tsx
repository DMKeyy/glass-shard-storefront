
import { useState } from "react";
import { 
  Play, 
  Download, 
  Settings, 
  Filter, 
  Search, 
  X, 
  Clock, 
  HardDrive, 
  Calendar,
  Monitor,
  Gamepad2,
  Volume2,
  FolderOpen,
  Trash2,
  RefreshCw,
  Star,
  Share2,
  Shield,
  Globe,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Library = () => {
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [gameSettings, setGameSettings] = useState<any>({});

  const games = [
    {
      id: "1",
      title: "Cyberpunk Nexus",
      status: "installed",
      lastPlayed: "2 hours ago",
      playtime: "45.5 hours",
      size: "67.2 GB",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
      downloadProgress: 100,
      description: "Experience the ultimate futuristic adventure in a neon-lit metropolis where every choice shapes your destiny.",
      developer: "NeonStudio",
      releaseDate: "2024-03-15",
      tags: ["Action", "RPG", "Cyberpunk", "Open World"],
      settings: {
        graphics: {
          resolution: "1920x1080",
          quality: "High",
          vsync: true,
          fps: "60"
        },
        audio: {
          masterVolume: 80,
          musicVolume: 60,
          sfxVolume: 75,
          voiceVolume: 85
        },
        gameplay: {
          difficulty: "Normal",
          autoSave: true,
          subtitles: true,
          language: "English"
        },
        advanced: {
          launchOptions: "",
          cloudSave: true,
          modsEnabled: false
        }
      }
    },
    {
      id: "2",
      title: "Stellar Odyssey",
      status: "downloading",
      lastPlayed: "Never",
      playtime: "0 hours",
      size: "42.8 GB",
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop",
      downloadProgress: 65,
      description: "Embark on an epic journey across the galaxy in this space exploration adventure.",
      developer: "SpaceGames Inc",
      releaseDate: "2024-02-20",
      tags: ["Adventure", "Sci-Fi", "Exploration"]
    },
    {
      id: "3",
      title: "Shadow Realms",
      status: "update-available",
      lastPlayed: "1 day ago",
      playtime: "23.2 hours",
      size: "38.5 GB",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=600&fit=crop",
      downloadProgress: 100,
      description: "Uncover the mysteries of the dark fantasy world in this atmospheric RPG.",
      developer: "DarkForge Games",
      releaseDate: "2024-01-10",
      tags: ["RPG", "Fantasy", "Dark", "Story Rich"]
    },
    {
      id: "4",
      title: "Quantum Drift",
      status: "installed",
      lastPlayed: "3 days ago",
      playtime: "12.8 hours",
      size: "25.1 GB",
      image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop",
      downloadProgress: 100,
      description: "Race through quantum dimensions in this high-speed futuristic racing game.",
      developer: "SpeedTech",
      releaseDate: "2024-04-05",
      tags: ["Racing", "Sci-Fi", "Futuristic"]
    },
    {
      id: "5",
      title: "Mystic Legends",
      status: "not-installed",
      lastPlayed: "Never",
      playtime: "0 hours",
      size: "31.4 GB",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      downloadProgress: 0,
      description: "A magical journey through ancient realms filled with mystical creatures and powerful spells.",
      developer: "Mystic Studios",
      releaseDate: "2024-05-12",
      tags: ["RPG", "Fantasy", "Magic", "Adventure"]
    },
    {
      id: "6",
      title: "Urban Warfare",
      status: "installed",
      lastPlayed: "1 week ago",
      playtime: "89.3 hours",
      size: "55.7 GB",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
      downloadProgress: 100,
      description: "Intense tactical combat in urban environments with advanced AI and realistic physics.",
      developer: "Tactical Games",
      releaseDate: "2024-03-28",
      tags: ["Action", "Tactical", "FPS", "Multiplayer"]
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

  const handleGameClick = (game: any) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const handleGameSettings = (game: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedGame(game);
    setGameSettings(game.settings || {});
    setIsSettingsModalOpen(true);
  };

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setGameSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };



  const GameListCard = ({ game }: { game: any }) => (
    <Card 
      className="glass-panel p-6 transition-all duration-300 hover-glow cursor-pointer hover:scale-[1.02]"
      onClick={() => handleGameClick(game)}
    >
      <div className="flex items-center space-x-6">
        <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={game.image} 
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2">
            {getStatusBadge(game.status)}
          </div>
          {game.status === 'downloading' && (
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 backdrop-blur-sm">
              <Progress value={game.downloadProgress} className="h-1" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-xl font-semibold text-game-text">{game.title}</h3>
            {getStatusBadge(game.status)}
          </div>
          <div className="flex items-center space-x-6 text-sm text-game-muted mb-2">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{game.playtime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <HardDrive className="w-4 h-4" />
              <span>{game.size}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Last played: {game.lastPlayed}</span>
            </div>
          </div>
          <p className="text-sm text-game-muted line-clamp-2">{game.description}</p>
        </div>

        <div className="flex items-center space-x-3">
          {getActionButton(game)}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-game-muted hover:text-game-text"
            onClick={(e) => handleGameSettings(game, e)}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );

  const GameDetailsModal = () => (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="glass-panel max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-game-text">
            {selectedGame?.title}
          </DialogTitle>
        </DialogHeader>
        
        {selectedGame && (
          <div className="space-y-6">
            {/* Game Image and Basic Info */}
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/2">
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                  <img 
                    src={selectedGame.image} 
                    alt={selectedGame.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    {getStatusBadge(selectedGame.status)}
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-game-text mb-2">{selectedGame.title}</h3>
                  <p className="text-game-muted">{selectedGame.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-game-cyan" />
                    <span className="text-sm text-game-muted">Playtime: {selectedGame.playtime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <HardDrive className="w-4 h-4 text-game-cyan" />
                    <span className="text-sm text-game-muted">Size: {selectedGame.size}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-game-cyan" />
                    <span className="text-sm text-game-muted">Last played: {selectedGame.lastPlayed}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-game-muted">Developer: {selectedGame.developer}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-game-text mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedGame.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="bg-game-surface text-game-muted">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-game-glass-border">
              <div className="flex items-center space-x-2">
                {getActionButton(selectedGame)}
                <Button variant="outline" className="border-game-glass-border text-game-text hover:bg-game-surface">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
              
              <div className="text-sm text-game-muted">
                Release Date: {selectedGame.releaseDate}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  const GameSettingsModal = () => (
    <Dialog open={isSettingsModalOpen} onOpenChange={setIsSettingsModalOpen}>
      <DialogContent className="glass-panel max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-game-text flex items-center space-x-2">
            <Settings className="w-6 h-6" />
            <span>{selectedGame?.title} - Settings</span>
          </DialogTitle>
        </DialogHeader>
        
        {selectedGame && (
          <div className="space-y-6">
            <Tabs defaultValue="graphics" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-game-surface">
                <TabsTrigger value="graphics" className="text-game-text data-[state=active]:bg-game-cyan data-[state=active]:text-game-bg">
                  <Monitor className="w-4 h-4 mr-2" />
                  Graphics
                </TabsTrigger>
                <TabsTrigger value="audio" className="text-game-text data-[state=active]:bg-game-cyan data-[state=active]:text-game-bg">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Audio
                </TabsTrigger>
                <TabsTrigger value="gameplay" className="text-game-text data-[state=active]:bg-game-cyan data-[state=active]:text-game-bg">
                  <Gamepad2 className="w-4 h-4 mr-2" />
                  Gameplay
                </TabsTrigger>
                <TabsTrigger value="advanced" className="text-game-text data-[state=active]:bg-game-cyan data-[state=active]:text-game-bg">
                  <Settings className="w-4 h-4 mr-2" />
                  Advanced
                </TabsTrigger>
              </TabsList>

              <TabsContent value="graphics" className="space-y-4 mt-4">
                <Card className="glass-panel p-6">
                  <h3 className="text-lg font-semibold text-game-text mb-4">Graphics Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-game-text">Resolution</label>
                      <Select 
                        value={gameSettings.graphics?.resolution || "1920x1080"} 
                        onValueChange={(value) => handleSettingChange('graphics', 'resolution', value)}
                      >
                        <SelectTrigger className="mt-1 bg-game-surface border-game-glass-border text-game-text">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="glass-panel border-game-glass-border">
                          <SelectItem value="1280x720">1280x720</SelectItem>
                          <SelectItem value="1920x1080">1920x1080</SelectItem>
                          <SelectItem value="2560x1440">2560x1440</SelectItem>
                          <SelectItem value="3840x2160">3840x2160</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-game-text">Quality Preset</label>
                      <Select 
                        value={gameSettings.graphics?.quality || "High"} 
                        onValueChange={(value) => handleSettingChange('graphics', 'quality', value)}
                      >
                        <SelectTrigger className="mt-1 bg-game-surface border-game-glass-border text-game-text">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="glass-panel border-game-glass-border">
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Ultra">Ultra</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-game-text">V-Sync</label>
                        <p className="text-xs text-game-muted">Synchronize frame rate with monitor refresh rate</p>
                      </div>
                      <Switch 
                        checked={gameSettings.graphics?.vsync || false} 
                        onCheckedChange={(checked) => handleSettingChange('graphics', 'vsync', checked)}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-game-text">Frame Rate Limit</label>
                      <Select 
                        value={gameSettings.graphics?.fps || "60"} 
                        onValueChange={(value) => handleSettingChange('graphics', 'fps', value)}
                      >
                        <SelectTrigger className="mt-1 bg-game-surface border-game-glass-border text-game-text">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="glass-panel border-game-glass-border">
                          <SelectItem value="30">30 FPS</SelectItem>
                          <SelectItem value="60">60 FPS</SelectItem>
                          <SelectItem value="120">120 FPS</SelectItem>
                          <SelectItem value="unlimited">Unlimited</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="audio" className="space-y-4 mt-4">
                <Card className="glass-panel p-6">
                  <h3 className="text-lg font-semibold text-game-text mb-4">Audio Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-game-text">Master Volume</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={gameSettings.audio?.masterVolume || 80}
                          onChange={(e) => handleSettingChange('audio', 'masterVolume', parseInt(e.target.value))}
                          className="flex-1 h-2 bg-game-glass-border rounded-lg appearance-none cursor-pointer slider"
                        />
                        <span className="text-sm text-game-muted w-12">{gameSettings.audio?.masterVolume || 80}%</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-game-text">Music Volume</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={gameSettings.audio?.musicVolume || 60}
                          onChange={(e) => handleSettingChange('audio', 'musicVolume', parseInt(e.target.value))}
                          className="flex-1 h-2 bg-game-glass-border rounded-lg appearance-none cursor-pointer slider"
                        />
                        <span className="text-sm text-game-muted w-12">{gameSettings.audio?.musicVolume || 60}%</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-game-text">SFX Volume</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={gameSettings.audio?.sfxVolume || 75}
                          onChange={(e) => handleSettingChange('audio', 'sfxVolume', parseInt(e.target.value))}
                          className="flex-1 h-2 bg-game-glass-border rounded-lg appearance-none cursor-pointer slider"
                        />
                        <span className="text-sm text-game-muted w-12">{gameSettings.audio?.sfxVolume || 75}%</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-game-text">Voice Volume</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={gameSettings.audio?.voiceVolume || 85}
                          onChange={(e) => handleSettingChange('audio', 'voiceVolume', parseInt(e.target.value))}
                          className="flex-1 h-2 bg-game-glass-border rounded-lg appearance-none cursor-pointer slider"
                        />
                        <span className="text-sm text-game-muted w-12">{gameSettings.audio?.voiceVolume || 85}%</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="gameplay" className="space-y-4 mt-4">
                <Card className="glass-panel p-6">
                  <h3 className="text-lg font-semibold text-game-text mb-4">Gameplay Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-game-text">Difficulty</label>
                      <Select 
                        value={gameSettings.gameplay?.difficulty || "Normal"} 
                        onValueChange={(value) => handleSettingChange('gameplay', 'difficulty', value)}
                      >
                        <SelectTrigger className="mt-1 bg-game-surface border-game-glass-border text-game-text">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="glass-panel border-game-glass-border">
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Normal">Normal</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                          <SelectItem value="Nightmare">Nightmare</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-game-text">Auto Save</label>
                        <p className="text-xs text-game-muted">Automatically save game progress</p>
                      </div>
                      <Switch 
                        checked={gameSettings.gameplay?.autoSave || true} 
                        onCheckedChange={(checked) => handleSettingChange('gameplay', 'autoSave', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-game-text">Subtitles</label>
                        <p className="text-xs text-game-muted">Show subtitles during dialogue</p>
                      </div>
                      <Switch 
                        checked={gameSettings.gameplay?.subtitles || true} 
                        onCheckedChange={(checked) => handleSettingChange('gameplay', 'subtitles', checked)}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-game-text">Language</label>
                      <Select 
                        value={gameSettings.gameplay?.language || "English"} 
                        onValueChange={(value) => handleSettingChange('gameplay', 'language', value)}
                      >
                        <SelectTrigger className="mt-1 bg-game-surface border-game-glass-border text-game-text">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="glass-panel border-game-glass-border">
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Spanish">Spanish</SelectItem>
                          <SelectItem value="French">French</SelectItem>
                          <SelectItem value="German">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4 mt-4">
                <Card className="glass-panel p-6">
                  <h3 className="text-lg font-semibold text-game-text mb-4">Advanced Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-game-text">Launch Options</label>
                      <Input 
                        placeholder="-novid -high -threads 8" 
                        value={gameSettings.advanced?.launchOptions || ""}
                        onChange={(e) => handleSettingChange('advanced', 'launchOptions', e.target.value)}
                        className="mt-1 bg-game-surface border-game-glass-border text-game-text"
                      />
                      <p className="text-xs text-game-muted mt-1">Additional command line arguments</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-game-text">Cloud Save</label>
                        <p className="text-xs text-game-muted">Sync save files with cloud storage</p>
                      </div>
                      <Switch 
                        checked={gameSettings.advanced?.cloudSave || true} 
                        onCheckedChange={(checked) => handleSettingChange('advanced', 'cloudSave', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-game-text">Enable Mods</label>
                        <p className="text-xs text-game-muted">Allow mods to be loaded</p>
                      </div>
                      <Switch 
                        checked={gameSettings.advanced?.modsEnabled || false} 
                        onCheckedChange={(checked) => handleSettingChange('advanced', 'modsEnabled', checked)}
                      />
                    </div>

                    <Separator className="bg-game-glass-border" />

                    <div className="space-y-2">
                      <Button variant="outline" className="w-full border-game-glass-border text-game-text hover:bg-game-surface">
                        <FolderOpen className="w-4 h-4 mr-2" />
                        Open Game Directory
                      </Button>
                      <Button variant="outline" className="w-full border-game-glass-border text-game-text hover:bg-game-surface">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Verify Game Files
                      </Button>
                      <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Uninstall Game
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-game-glass-border">
              <div className="flex items-center space-x-2">
                <Button 
                  className="bg-game-cyan hover:bg-game-cyan/80 text-game-bg font-semibold"
                  onClick={() => {
                    // Save settings logic
                    setIsSettingsModalOpen(false);
                  }}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
                <Button variant="outline" className="border-game-glass-border text-game-text hover:bg-game-surface">
                  Reset to Defaults
                </Button>
              </div>
              
              <div className="text-sm text-game-muted">
                Settings will be applied when you launch the game
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  const filteredGames = games.filter(game => {
    if (filterBy === 'all') return true;
    return game.status === filterBy;
  });

  const cardRefs = filteredGames.map(() => useScrollAnimation<HTMLDivElement>());

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

        {/* Games List */}
        <div className="space-y-4">
          {filteredGames.map((game, i) => (
            <div key={game.id} ref={cardRefs[i].ref} className={`fade-in-up${cardRefs[i].visible ? ' visible' : ''}`}>
              <GameListCard game={game} />
            </div>
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
      <GameDetailsModal />
      <GameSettingsModal />
    </div>
  );
};

export default Library;
