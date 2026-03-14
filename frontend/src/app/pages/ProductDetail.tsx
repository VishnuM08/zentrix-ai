import { useParams, Link, useNavigate } from "react-router";
import { useState } from "react";
import { Header } from "../components/Header";
import { MobileNav } from "../components/MobileNav";
import { MobileHeader } from "../components/MobileHeader";
import { products } from "../data/products";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ProductCard } from "../components/ProductCard";
import {
  Star,
  TrendingDown,
  TrendingUp,
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ArrowLeft,
  ShoppingCart,
  BarChart3,
  ShoppingBag,
  Plus
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";
import { motion } from "motion/react";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <MobileNav />
        <div className="container mx-auto px-4 py-20 text-center">
          <Package className="size-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Product not found</h2>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist</p>
          <Button asChild>
            <Link to="/analyze">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Find alternative products
  const alternativeProducts = product.alternatives
    ? products.filter(p => product.alternatives?.includes(p.id))
    : products.filter(p => 
        p.category === product.category && 
        p.id !== product.id &&
        Math.abs(p.price - product.price) < product.price * 0.5
      ).slice(0, 3);

  // Find same product on other platforms
  const sameProductOtherPlatforms = products.filter(
    p => p.name === product.name && p.id !== product.id
  ).sort((a, b) => a.price - b.price);

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

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Calculate price trend
  const priceHistory = product.priceHistory;
  const oldestPrice = priceHistory[0].price;
  const currentPrice = priceHistory[priceHistory.length - 1].price;
  const priceTrend = currentPrice < oldestPrice ? 'down' : 'up';
  const priceChange = Math.abs(((currentPrice - oldestPrice) / oldestPrice) * 100).toFixed(1);

  // Generate affiliate link
  const getAffiliateLink = (platform: string, productId: string) => {
    const baseUrls: Record<string, string> = {
      amazon: 'https://amazon.in/dp/',
      flipkart: 'https://flipkart.com/product/',
      myntra: 'https://myntra.com/product/',
      ajio: 'https://ajio.com/product/',
      blinkit: 'https://blinkit.com/product/',
      zepto: 'https://zepto.com/product/',
      instamart: 'https://swiggy.com/instamart/product/',
      nykaa: 'https://nykaa.com/product/',
    };
    
    const affiliateTags: Record<string, string> = {
      amazon: '?tag=YOUR_AMAZON_AFFILIATE_ID',
      flipkart: '?affid=YOUR_FLIPKART_AFFILIATE_ID',
      myntra: '?ref=YOUR_MYNTRA_AFFILIATE_ID',
    };

    return `${baseUrls[platform]}${productId}${affiliateTags[platform] || ''}`;
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => {
      navigate('/cart');
    }, 1000);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden">
        <MobileHeader 
          title={product.name}
          showBack={true}
          showCart={true}
        />
      </div>

      <MobileNav />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button - Desktop Only */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="hidden md:block"
        >
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/analyze">
              <ArrowLeft className="size-4 mr-2" />
              Back to Products
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Product Image and Info */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 border-border/40 bg-card/50 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                      <ImageWithFallback 
                        src={`https://source.unsplash.com/600x400/?${product.image.replace(/ /g, ',')}`}
                        alt={product.name}
                        className="w-full rounded-lg"
                      />
                    </motion.div>
                    {product.tags && product.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {product.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <Badge className={`bg-gradient-to-r ${platformColors[product.platform]} text-white capitalize mb-3 border-0`}>
                      {product.platform}
                    </Badge>
                    
                    <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="size-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{product.rating}</span>
                      </div>
                      <span className="text-muted-foreground">
                        ({product.reviews.toLocaleString()} reviews)
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-4xl font-bold">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-xl text-muted-foreground line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {discount > 0 && (
                      <Badge className="bg-gradient-to-r from-red-500 to-red-600 mb-6">
                        {discount}% OFF
                      </Badge>
                    )}

                    <div className="flex items-center gap-3 mb-6">
                      {product.inStock ? (
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                          <CheckCircle2 className="size-5" />
                          <span>In Stock</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                          <AlertCircle className="size-5" />
                          <span>Out of Stock</span>
                        </div>
                      )}
                      {product.deliveryTime && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="size-5" />
                          <span>Delivery in {product.deliveryTime}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Button 
                        size="lg" 
                        onClick={handleAddToCart}
                        disabled={addedToCart}
                        className="w-full gradient-primary hover:opacity-90 transition-opacity shadow-glow-blue"
                      >
                        <ShoppingCart className="size-5 mr-2" />
                        {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                      </Button>
                      
                      <Button 
                        size="lg" 
                        variant="outline"
                        asChild
                        className="w-full border-border/60"
                      >
                        <Link to="/compare">
                          <BarChart3 className="size-4 mr-2" />
                          Compare Prices
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Price History Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-6 border-border/40 bg-card/50 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Price History</h2>
                  <div className="flex items-center gap-2">
                    {priceTrend === 'down' ? (
                      <TrendingDown className="size-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <TrendingUp className="size-5 text-red-600 dark:text-red-400" />
                    )}
                    <span className={`font-semibold ${priceTrend === 'down' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {priceChange}% {priceTrend === 'down' ? 'decrease' : 'increase'}
                    </span>
                  </div>
                </div>

                <div className="relative w-full h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={priceHistory}>
                      <defs>
                        <linearGradient id={`priceGradient-${product.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        stroke="currentColor"
                        opacity={0.5}
                      />
                      <YAxis stroke="currentColor" opacity={0.5} />
                      <Tooltip 
                        formatter={(value: number) => `₹${value.toLocaleString()}`}
                        labelFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        contentStyle={{ 
                          backgroundColor: 'var(--popover)',
                          border: '1px solid var(--border)',
                          borderRadius: '0.5rem'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#6366f1" 
                        fill={`url(#priceGradient-${product.id})`}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </motion.div>

            {/* Same Product on Other Platforms */}
            {sameProductOtherPlatforms.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="p-6 border-border/40 bg-card/50 backdrop-blur-sm">
                  <h2 className="text-xl font-bold mb-4">Available on Other Platforms</h2>
                  <div className="space-y-4">
                    {sameProductOtherPlatforms.map((otherProduct, index) => {
                      const priceDiff = otherProduct.price - product.price;
                      const isCheaper = priceDiff < 0;
                      
                      return (
                        <motion.div 
                          key={otherProduct.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          className={`flex items-center justify-between p-4 rounded-lg border ${
                            isCheaper 
                              ? 'border-green-500/50 bg-green-50/50 dark:bg-green-950/20' 
                              : 'border-border/40 bg-secondary/30'
                          }`}
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <Badge className={`bg-gradient-to-r ${platformColors[otherProduct.platform]} text-white capitalize border-0`}>
                              {otherProduct.platform}
                            </Badge>
                            <div className="flex-1">
                              <div className="font-semibold text-lg">₹{otherProduct.price.toLocaleString()}</div>
                              <div className="flex items-center gap-2 text-sm">
                                <Star className="size-3 fill-yellow-400 text-yellow-400" />
                                <span>{otherProduct.rating}</span>
                                {otherProduct.deliveryTime && (
                                  <>
                                    <span className="text-muted-foreground">•</span>
                                    <Clock className="size-3" />
                                    <span className="text-muted-foreground">{otherProduct.deliveryTime}</span>
                                  </>
                                )}
                              </div>
                            </div>
                            {isCheaper && (
                              <Badge className="bg-green-500 text-white">
                                Save ₹{Math.abs(priceDiff).toLocaleString()}
                              </Badge>
                            )}
                          </div>
                          <Button 
                            size="sm"
                            variant={isCheaper ? "default" : "outline"}
                            className={isCheaper ? "gradient-primary" : ""}
                            asChild
                          >
                            <a 
                              href={getAffiliateLink(otherProduct.platform, otherProduct.id)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Buy <ExternalLink className="size-3 ml-1" />
                            </a>
                          </Button>
                        </motion.div>
                      );
                    })}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Alternative Products */}
            {alternativeProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6">Alternative Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {alternativeProducts.map((altProduct, index) => (
                    <ProductCard key={altProduct.id} product={altProduct} index={index} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Score Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 border-border/40 bg-card/50 backdrop-blur-sm sticky top-24">
                <h3 className="text-lg font-semibold mb-4">AI Value Score</h3>
                <div className="flex items-center justify-center mb-6">
                  <div className={`size-32 rounded-full flex items-center justify-center text-4xl font-bold ${
                    product.aiScore >= 8 ? 'bg-gradient-to-br from-green-400 to-green-600 text-white' : 
                    product.aiScore >= 6 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' : 
                    'bg-gradient-to-br from-red-400 to-red-600 text-white'
                  }`}>
                    {product.aiScore}
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price Value</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`size-2 rounded-full ${i < Math.floor(product.aiScore / 2) ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rating</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`size-2 rounded-full ${i < Math.floor(product.rating) ? 'bg-yellow-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Speed</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`size-2 rounded-full ${i < 3 ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm leading-relaxed">{product.aiRecommendation}</p>
                </div>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-6 border-border/40 bg-card/30">
                <h4 className="font-semibold mb-3 text-sm">Quick Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" asChild className="w-full justify-start">
                    <Link to="/compare">
                      <BarChart3 className="size-4 mr-2" />
                      Compare with similar products
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="w-full justify-start">
                    <Link to="/cart">
                      <ShoppingCart className="size-4 mr-2" />
                      View cart intelligence
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Affiliate Disclaimer */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-4 border-border/40 bg-blue-50/50 dark:bg-blue-950/20">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Note:</strong> When you purchase through our links, we may earn a commission at no extra cost to you. This helps us maintain Zentrix AI!
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}