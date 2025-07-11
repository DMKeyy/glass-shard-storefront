
import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, Gift, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      title: "Cyberpunk Nexus",
      price: 59.99,
      originalPrice: 79.99,
      discount: 25,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop",
      tags: ["Action", "RPG"]
    },
    {
      id: "2",
      title: "Stellar Odyssey",
      price: 49.99,
      originalPrice: 69.99,
      discount: 30,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=200&fit=crop",
      tags: ["Adventure", "Sci-Fi"]
    },
    {
      id: "3",
      title: "Quantum Drift",
      price: 29.99,
      originalPrice: 39.99,
      discount: 25,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=200&fit=crop",
      tags: ["Racing", "Sci-Fi"]
    }
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'gamevault10') {
      setAppliedPromo('GAMEVAULT10');
      setPromoCode("");
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const originalSubtotal = cartItems.reduce((sum, item) => sum + ((item.originalPrice || item.price) * item.quantity), 0);
  const discountAmount = originalSubtotal - subtotal;
  const promoDiscount = appliedPromo ? subtotal * 0.1 : 0;
  const tax = (subtotal - promoDiscount) * 0.08;
  const total = subtotal - promoDiscount + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-game-surface flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-game-muted" />
            </div>
            <h1 className="text-3xl font-bold text-game-text mb-4">Your cart is empty</h1>
            <p className="text-game-muted mb-8">Discover amazing games and add them to your cart.</p>
            <Link to="/store">
              <Button className="bg-game-cyan hover:bg-game-cyan/80 text-game-bg font-semibold px-8 py-3">
                Browse Store
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-game-text mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="glass-panel p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-16 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link to={`/game/${item.id}`} className="hover:text-game-cyan transition-colors">
                      <h3 className="font-semibold text-game-text truncate">{item.title}</h3>
                    </Link>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-game-surface text-game-muted">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2 mt-2">
                      {item.originalPrice && (
                        <span className="text-sm text-game-muted line-through">
                          ${item.originalPrice}
                        </span>
                      )}
                      <span className="text-lg font-bold text-game-cyan">
                        ${item.price}
                      </span>
                      {item.discount && (
                        <Badge className="bg-red-600 text-white text-xs">
                          -{item.discount}%
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2 glass-panel rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 text-game-muted hover:text-game-text"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-game-text w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 text-game-muted hover:text-game-text"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-game-muted hover:text-red-500"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            {/* Continue Shopping */}
            <div className="pt-4">
              <Link to="/store">
                <Button variant="outline" className="border-game-glass-border text-game-text hover:bg-game-surface">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Promo Code */}
            <Card className="glass-panel p-6">
              <h3 className="font-semibold text-game-text mb-4 flex items-center">
                <Tag className="w-5 h-5 mr-2 text-game-cyan" />
                Promo Code
              </h3>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="bg-game-surface border-game-glass-border text-game-text"
                  />
                  <Button 
                    variant="outline" 
                    className="border-game-cyan text-game-cyan hover:bg-game-cyan hover:text-game-bg"
                    onClick={applyPromoCode}
                  >
                    Apply
                  </Button>
                </div>
                {appliedPromo && (
                  <div className="flex items-center justify-between text-green-400">
                    <span>✓ {appliedPromo} Applied</span>
                    <button 
                      onClick={() => setAppliedPromo(null)}
                      className="text-game-muted hover:text-game-text"
                    >
                      Remove
                    </button>
                  </div>
                )}
                <p className="text-xs text-game-muted">Try: GAMEVAULT10 for 10% off</p>
              </div>
            </Card>

            {/* Order Summary */}
            <Card className="glass-panel p-6 sticky top-24">
              <h3 className="font-semibold text-game-text mb-4">Order Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-game-muted">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Game Discounts</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Promo Code ({appliedPromo})</span>
                    <span>-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-game-muted">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <Separator className="bg-game-glass-border" />

                <div className="flex justify-between text-lg font-bold text-game-text">
                  <span>Total</span>
                  <span className="text-game-cyan">${total.toFixed(2)}</span>
                </div>

                {originalSubtotal > total && (
                  <div className="text-center text-green-400 text-sm">
                    You save ${(originalSubtotal - total).toFixed(2)}!
                  </div>
                )}
              </div>

              <div className="space-y-3 mt-6">
                <Button className="w-full bg-game-cyan hover:bg-game-cyan/80 text-game-bg font-semibold py-3 glow-cyan">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Proceed to Checkout
                </Button>
                
                <Button variant="outline" className="w-full border-game-glass-border text-game-text hover:bg-game-surface">
                  <Gift className="w-5 h-5 mr-2" />
                  Buy as Gift
                </Button>
              </div>

              <div className="text-xs text-game-muted mt-4 space-y-1">
                <p>• Instant delivery to your library</p>
                <p>• 30-day refund policy</p>
                <p>• Secure payment processing</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
