import { Link } from "react-router";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star, Clock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Product } from "../data/products";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    setImageUrl(`https://source.unsplash.com/400x300/?${product.image.replace(/ /g, ',')}`);
  }, [product.image]);

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const platformColors: Record<string, string> = {
    amazon: 'from-orange-500 to-orange-600',
    flipkart: 'from-blue-500 to-blue-600',
    myntra: 'from-pink-500 to-pink-600',
    ajio: 'from-purple-500 to-purple-600',
    blinkit: 'from-yellow-500 to-yellow-600',
    zepto: 'from-indigo-500 to-indigo-600',
    instamart: 'from-teal-500 to-teal-600',
    nykaa: 'from-rose-500 to-rose-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/product/${product.id}`}>
        <Card className="overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 h-full border-border/40 frosted group hover:-translate-y-1 shine">
          <div className="relative overflow-hidden">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }}>
              <ImageWithFallback 
                src={imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </motion.div>
            
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {product.tags && product.tags.length > 0 && (
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="glossy text-xs shadow-medium">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            {discount > 0 && (
              <Badge className="absolute top-3 right-3 gradient-destructive text-white shadow-glow-pink reflective">
                {discount}% OFF
              </Badge>
            )}
          </div>
          
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Badge className={`bg-gradient-to-r ${platformColors[product.platform]} text-white capitalize border-0 shadow-soft reflective`}>
                {product.platform}
              </Badge>
              {product.deliveryTime && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  <span>{product.deliveryTime}</span>
                </div>
              )}
            </div>
            
            <h3 className="font-semibold text-lg mb-1.5 line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviews.toLocaleString()})
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold">{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 p-3 glass rounded-xl group-hover:glass-strong transition-all">
              <div className={`size-11 rounded-full flex items-center justify-center shadow-inner reflective ${
                product.aiScore >= 8 
                  ? 'bg-gradient-to-br from-green-400 to-green-600' 
                  : product.aiScore >= 6 
                  ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' 
                  : 'bg-gradient-to-br from-red-400 to-red-600'
              }`}>
                <span className="text-sm font-bold text-white">
                  {product.aiScore}
                </span>
              </div>
              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-1 font-medium">AI Value Score</div>
                <p className="text-xs text-foreground/80 line-clamp-2 leading-relaxed">
                  {product.aiRecommendation}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}