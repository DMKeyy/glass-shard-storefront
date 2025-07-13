import { useState } from "react";
import { 
  User, 
  Download, 
  Monitor, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  HardDrive,
  Wifi,
  Volume2,
  Gamepad2,
  CreditCard,
  Key,
  Trash2,
  Save,
  X,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [downloadPath, setDownloadPath] = useState("C:\\Games");
  const [maxConcurrentDownloads, setMaxConcurrentDownloads] = useState("3");
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState({
    downloads: true,
    updates: true,
    news: false,
    achievements: true
  });
  const [privacy, setPrivacy] = useState({
    sharePlaytime: true,
    shareLibrary: false,
    allowAnalytics: true
  });

  const { ref, visible } = useScrollAnimation<HTMLDivElement>();

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  const SettingCard = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
    <Card className="glass-panel p-6 space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-game-text">{title}</h3>
        <p className="text-sm text-game-muted">{description}</p>
      </div>
      {children}
    </Card>
  );

  const SettingItem = ({ 
    title, 
    description, 
    children 
  }: { 
    title: string; 
    description: string; 
    children: React.ReactNode 
  }) => (
    <div className="flex items-center justify-between py-4">
      <div className="flex-1">
        <h4 className="font-medium text-game-text">{title}</h4>
        <p className="text-sm text-game-muted">{description}</p>
      </div>
      <div className="ml-4">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" ref={ref}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-game-text mb-2">Settings</h1>
          <p className="text-game-muted">Manage your account and application preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="glass-panel p-4">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("account")}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-3 ${
                    activeTab === "account" 
                      ? "bg-game-cyan/20 text-game-cyan" 
                      : "text-game-muted hover:text-game-text hover:bg-game-surface"
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Account</span>
                </button>
                <button
                  onClick={() => setActiveTab("downloads")}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-3 ${
                    activeTab === "downloads" 
                      ? "bg-game-cyan/20 text-game-cyan" 
                      : "text-game-muted hover:text-game-text hover:bg-game-surface"
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>Downloads</span>
                </button>
                <button
                  onClick={() => setActiveTab("performance")}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-3 ${
                    activeTab === "performance" 
                      ? "bg-game-cyan/20 text-game-cyan" 
                      : "text-game-muted hover:text-game-text hover:bg-game-surface"
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  <span>Performance</span>
                </button>
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-3 ${
                    activeTab === "notifications" 
                      ? "bg-game-cyan/20 text-game-cyan" 
                      : "text-game-muted hover:text-game-text hover:bg-game-surface"
                  }`}
                >
                  <Bell className="w-4 h-4" />
                  <span>Notifications</span>
                </button>
                <button
                  onClick={() => setActiveTab("privacy")}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-3 ${
                    activeTab === "privacy" 
                      ? "bg-game-cyan/20 text-game-cyan" 
                      : "text-game-muted hover:text-game-text hover:bg-game-surface"
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  <span>Privacy</span>
                </button>
                <button
                  onClick={() => setActiveTab("appearance")}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-3 ${
                    activeTab === "appearance" 
                      ? "bg-game-cyan/20 text-game-cyan" 
                      : "text-game-muted hover:text-game-text hover:bg-game-surface"
                  }`}
                >
                  <Palette className="w-4 h-4" />
                  <span>Appearance</span>
                </button>
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Account Settings */}
            {activeTab === "account" && (
              <div className="space-y-6">
                <SettingCard 
                  title="Profile Information" 
                  description="Manage your account details and preferences"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-game-cyan flex items-center justify-center">
                        <User className="w-8 h-8 text-game-bg" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-game-text">John Doe</h4>
                        <p className="text-sm text-game-muted">Premium Member</p>
                        <Badge className="bg-game-cyan text-game-bg mt-1">Active</Badge>
                      </div>
                      <Button variant="outline" className="border-game-glass-border text-game-text hover:bg-game-surface">
                        Change Avatar
                      </Button>
                    </div>
                    
                    <Separator className="bg-game-glass-border" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-game-text">Username</label>
                        <Input 
                          defaultValue="johndoe" 
                          className="mt-1 bg-game-surface border-game-glass-border text-game-text"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-game-text">Email</label>
                        <Input 
                          defaultValue="john@example.com" 
                          className="mt-1 bg-game-surface border-game-glass-border text-game-text"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-game-text">Display Name</label>
                        <Input 
                          defaultValue="John Doe" 
                          className="mt-1 bg-game-surface border-game-glass-border text-game-text"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-game-text">Language</label>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger className="mt-1 bg-game-surface border-game-glass-border text-game-text">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="glass-panel border-game-glass-border">
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </SettingCard>

                <SettingCard 
                  title="Security" 
                  description="Manage your account security settings"
                >
                  <div className="space-y-4">
                    <SettingItem 
                      title="Two-Factor Authentication" 
                      description="Add an extra layer of security to your account"
                    >
                      <Switch />
                    </SettingItem>
                    <SettingItem 
                      title="Session Management" 
                      description="Manage active sessions and devices"
                    >
                      <Button variant="outline" size="sm" className="border-game-glass-border text-game-text hover:bg-game-surface">
                        Manage Sessions
                      </Button>
                    </SettingItem>
                    <SettingItem 
                      title="Change Password" 
                      description="Update your account password"
                    >
                      <Button variant="outline" size="sm" className="border-game-glass-border text-game-text hover:bg-game-surface">
                        Change Password
                      </Button>
                    </SettingItem>
                  </div>
                </SettingCard>

                <SettingCard 
                  title="Billing & Subscription" 
                  description="Manage your subscription and payment methods"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-game-surface rounded-lg">
                      <div>
                        <h4 className="font-medium text-game-text">Premium Plan</h4>
                        <p className="text-sm text-game-muted">$9.99/month</p>
                      </div>
                      <Badge className="bg-green-600 text-white">Active</Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="border-game-glass-border text-game-text hover:bg-game-surface">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Payment Methods
                      </Button>
                      <Button variant="outline" className="border-game-glass-border text-game-text hover:bg-game-surface">
                        Billing History
                      </Button>
                    </div>
                  </div>
                </SettingCard>
              </div>
            )}

            {/* Download Settings */}
            {activeTab === "downloads" && (
              <div className="space-y-6">
                <SettingCard 
                  title="Download Preferences" 
                  description="Configure how games are downloaded and installed"
                >
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-game-text">Download Location</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Input 
                          value={downloadPath} 
                          onChange={(e) => setDownloadPath(e.target.value)}
                          className="bg-game-surface border-game-glass-border text-game-text"
                        />
                        <Button variant="outline" className="border-game-glass-border text-game-text hover:bg-game-surface">
                          Browse
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-game-text">Max Concurrent Downloads</label>
                      <Select value={maxConcurrentDownloads} onValueChange={setMaxConcurrentDownloads}>
                        <SelectTrigger className="mt-1 bg-game-surface border-game-glass-border text-game-text">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="glass-panel border-game-glass-border">
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <SettingItem 
                      title="Auto-Install Updates" 
                      description="Automatically install game updates when available"
                    >
                      <Switch defaultChecked />
                    </SettingItem>

                    <SettingItem 
                      title="Download During Off-Peak Hours" 
                      description="Schedule downloads for off-peak hours to save bandwidth"
                    >
                      <Switch />
                    </SettingItem>

                    <SettingItem 
                      title="Limit Download Speed" 
                      description="Set maximum download speed to avoid affecting other activities"
                    >
                      <div className="flex items-center space-x-2">
                        <Input 
                          placeholder="Unlimited" 
                          className="w-24 bg-game-surface border-game-glass-border text-game-text"
                        />
                        <span className="text-sm text-game-muted">MB/s</span>
                      </div>
                    </SettingItem>
                  </div>
                </SettingCard>

                <SettingCard 
                  title="Storage Management" 
                  description="Manage your game storage and disk space"
                >
                  <div className="space-y-4">
                    <div className="p-4 bg-game-surface rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-game-text">Disk Usage</span>
                        <span className="text-sm text-game-muted">245.6 GB / 1 TB</span>
                      </div>
                      <div className="w-full bg-game-glass-border rounded-full h-2">
                        <div className="bg-game-cyan h-2 rounded-full" style={{ width: '24.5%' }}></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-game-surface rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <HardDrive className="w-4 h-4 text-game-cyan" />
                          <span className="text-sm font-medium text-game-text">Games</span>
                        </div>
                        <p className="text-2xl font-bold text-game-text">180.2 GB</p>
                        <p className="text-xs text-game-muted">45 games installed</p>
                      </div>
                      <div className="p-4 bg-game-surface rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Download className="w-4 h-4 text-game-cyan" />
                          <span className="text-sm font-medium text-game-text">Downloads</span>
                        </div>
                        <p className="text-2xl font-bold text-game-text">65.4 GB</p>
                        <p className="text-xs text-game-muted">3 games downloading</p>
                      </div>
                    </div>
                  </div>
                </SettingCard>
              </div>
            )}

            {/* Performance Settings */}
            {activeTab === "performance" && (
              <div className="space-y-6">
                <SettingCard 
                  title="Graphics & Performance" 
                  description="Configure graphics settings and performance options"
                >
                  <div className="space-y-4">
                    <SettingItem 
                      title="Hardware Acceleration" 
                      description="Use GPU acceleration for better performance"
                    >
                      <Switch defaultChecked />
                    </SettingItem>

                    <SettingItem 
                      title="Background Processing" 
                      description="Allow the app to process tasks in the background"
                    >
                      <Switch defaultChecked />
                    </SettingItem>

                    <SettingItem 
                      title="Auto-Close Games" 
                      description="Automatically close games when launching new ones"
                    >
                      <Switch />
                    </SettingItem>

                    <div>
                      <label className="text-sm font-medium text-game-text">Frame Rate Limit</label>
                      <Select defaultValue="60">
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
                </SettingCard>

                <SettingCard 
                  title="System Resources" 
                  description="Manage CPU and memory usage"
                >
                  <div className="space-y-4">
                    <SettingItem 
                      title="High Performance Mode" 
                      description="Prioritize performance over battery life"
                    >
                      <Switch />
                    </SettingItem>

                    <SettingItem 
                      title="Memory Management" 
                      description="Automatically free up memory when needed"
                    >
                      <Switch defaultChecked />
                    </SettingItem>

                    <div>
                      <label className="text-sm font-medium text-game-text">CPU Priority</label>
                      <Select defaultValue="normal">
                        <SelectTrigger className="mt-1 bg-game-surface border-game-glass-border text-game-text">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="glass-panel border-game-glass-border">
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </SettingCard>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <SettingCard 
                  title="Notification Preferences" 
                  description="Choose which notifications you want to receive"
                >
                  <div className="space-y-4">
                    <SettingItem 
                      title="Download Complete" 
                      description="Notify when game downloads finish"
                    >
                      <Switch 
                        checked={notifications.downloads} 
                        onCheckedChange={(checked) => handleNotificationChange('downloads', checked)}
                      />
                    </SettingItem>

                    <SettingItem 
                      title="Game Updates" 
                      description="Notify when game updates are available"
                    >
                      <Switch 
                        checked={notifications.updates} 
                        onCheckedChange={(checked) => handleNotificationChange('updates', checked)}
                      />
                    </SettingItem>

                    <SettingItem 
                      title="News & Announcements" 
                      description="Receive news about new games and features"
                    >
                      <Switch 
                        checked={notifications.news} 
                        onCheckedChange={(checked) => handleNotificationChange('news', checked)}
                      />
                    </SettingItem>

                    <SettingItem 
                      title="Achievements" 
                      description="Notify when you unlock achievements"
                    >
                      <Switch 
                        checked={notifications.achievements} 
                        onCheckedChange={(checked) => handleNotificationChange('achievements', checked)}
                      />
                    </SettingItem>
                  </div>
                </SettingCard>

                <SettingCard 
                  title="Notification Channels" 
                  description="Configure how you receive notifications"
                >
                  <div className="space-y-4">
                    <SettingItem 
                      title="Desktop Notifications" 
                      description="Show notifications on your desktop"
                    >
                      <Switch defaultChecked />
                    </SettingItem>

                    <SettingItem 
                      title="Sound Alerts" 
                      description="Play sound when notifications arrive"
                    >
                      <Switch defaultChecked />
                    </SettingItem>

                    <SettingItem 
                      title="Email Notifications" 
                      description="Send notifications to your email"
                    >
                      <Switch />
                    </SettingItem>
                  </div>
                </SettingCard>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === "privacy" && (
              <div className="space-y-6">
                <SettingCard 
                  title="Privacy Controls" 
                  description="Manage your privacy and data sharing preferences"
                >
                  <div className="space-y-4">
                    <SettingItem 
                      title="Share Playtime" 
                      description="Allow others to see your game playtime"
                    >
                      <Switch 
                        checked={privacy.sharePlaytime} 
                        onCheckedChange={(checked) => handlePrivacyChange('sharePlaytime', checked)}
                      />
                    </SettingItem>

                    <SettingItem 
                      title="Share Library" 
                      description="Make your game library visible to friends"
                    >
                      <Switch 
                        checked={privacy.shareLibrary} 
                        onCheckedChange={(checked) => handlePrivacyChange('shareLibrary', checked)}
                      />
                    </SettingItem>

                    <SettingItem 
                      title="Analytics & Telemetry" 
                      description="Help improve the app by sharing usage data"
                    >
                      <Switch 
                        checked={privacy.allowAnalytics} 
                        onCheckedChange={(checked) => handlePrivacyChange('allowAnalytics', checked)}
                      />
                    </SettingItem>
                  </div>
                </SettingCard>

                <SettingCard 
                  title="Data Management" 
                  description="Manage your data and account information"
                >
                  <div className="space-y-4">
                    <SettingItem 
                      title="Export Data" 
                      description="Download a copy of your data"
                    >
                      <Button variant="outline" size="sm" className="border-game-glass-border text-game-text hover:bg-game-surface">
                        Export
                      </Button>
                    </SettingItem>

                    <SettingItem 
                      title="Delete Account" 
                      description="Permanently delete your account and all data"
                    >
                      <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </SettingItem>
                  </div>
                </SettingCard>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <div className="space-y-6">
                <SettingCard 
                  title="Theme & Appearance" 
                  description="Customize the look and feel of the application"
                >
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-game-text">Theme</label>
                      <Select value={theme} onValueChange={setTheme}>
                        <SelectTrigger className="mt-1 bg-game-surface border-game-glass-border text-game-text">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="glass-panel border-game-glass-border">
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="auto">Auto (System)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <SettingItem 
                      title="Glass Morphism Effects" 
                      description="Enable glass-like transparency effects"
                    >
                      <Switch defaultChecked />
                    </SettingItem>

                    <SettingItem 
                      title="Animations" 
                      description="Show smooth animations and transitions"
                    >
                      <Switch defaultChecked />
                    </SettingItem>

                    <SettingItem 
                      title="Compact Mode" 
                      description="Use a more compact layout"
                    >
                      <Switch />
                    </SettingItem>
                  </div>
                </SettingCard>

                <SettingCard 
                  title="Interface Customization" 
                  description="Customize interface elements and layout"
                >
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-game-text">Accent Color</label>
                      <div className="flex space-x-2 mt-2">
                        {['cyan', 'purple', 'green', 'orange', 'pink'].map((color) => (
                          <button
                            key={color}
                            className={`w-8 h-8 rounded-full border-2 ${
                              color === 'cyan' ? 'border-game-cyan' : 'border-game-glass-border'
                            }`}
                            style={{ backgroundColor: `var(--game-${color})` }}
                          />
                        ))}
                      </div>
                    </div>

                    <SettingItem 
                      title="Show Game Icons" 
                      description="Display game icons in the library"
                    >
                      <Switch defaultChecked />
                    </SettingItem>

                    <SettingItem 
                      title="Show FPS Counter" 
                      description="Display FPS counter in games"
                    >
                      <Switch />
                    </SettingItem>
                  </div>
                </SettingCard>
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="fixed bottom-6 right-6">
          <Button className="bg-game-cyan hover:bg-game-cyan/80 text-game-bg font-semibold px-6 py-3">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings; 