
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface GameCardProps {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  image: string;
  tags: string[];
  isNew?: boolean;
}

export const GameCard = ({ 
  id, 
  title, 
  price, 
  originalPrice, 
  discount, 
  rating, 
  image, 
  tags, 
  isNew 
}: GameCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, visible } = useScrollAnimation<HTMLDivElement>();

  return (
    <Card 
      ref={ref}
      className={`glass-panel overflow-hidden transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover-glow cursor-pointer group fade-in-up${visible ? ' visible' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/game/${id}`}>
        <div className="relative aspect-[16/9] overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`} />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {isNew && (
              <Badge className="bg-game-cyan text-game-bg font-medium">NEW</Badge>
            )}
            {discount && (
              <Badge className="bg-red-600 text-white font-medium">-{discount}%</Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className={`absolute bottom-2 right-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <Button 
              size="icon" 
              className="bg-game-cyan hover:bg-game-cyan/80 text-game-bg"
              onClick={(e) => {
                e.preventDefault();
                console.log('Added to cart:', title);
              }}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-game-text group-hover:text-game-cyan transition-colors line-clamp-1">
            {title}
          </h3>
          
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-game-muted">{rating}/5</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 2).map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="text-xs bg-game-surface text-game-muted border-game-glass-border"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {originalPrice && (
              <span className="text-sm text-game-muted line-through">
                ${originalPrice}
              </span>
            )}
            <span className="text-lg font-bold text-game-cyan">
              ${price}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
