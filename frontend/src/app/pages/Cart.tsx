import { useState } from "react";
import { Header } from "../components/Header";
import { MobileNav } from "../components/MobileNav";
import { MobileHeader } from "../components/MobileHeader";
import { products } from "../data/products";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  ShoppingCart, 
  Trash2, 
  Plus,
  TrendingDown,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShoppingBag
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { motion } from "motion/react";

interface CartItem {
  productId: string;
  quantity: number;
}

export function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { productId: "1", quantity: 1 }, // MacBook Air M2 - Amazon
    { productId: "5", quantity: 1 }, // Nike Air Max 270 - Myntra
    { productId: "8", quantity: 2 }, // Milk - Blinkit
  ]);

  const removeItem = (productId: string) => {
    setCartItems(cartItems.filter(item => item.productId !== productId));
  };

  const getCartProducts = () => {
    return cartItems.map(item => ({
      ...products.find(p => p.id === item.productId)!,
      quantity: item.quantity
    }));
  };

  const cartProducts = getCartProducts();

  // Calculate platform totals
  const platformTotals: { [key: string]: number } = {};
  cartProducts.forEach(item => {
    if (!platformTotals[item.platform]) {
      platformTotals[item.platform] = 0;
    }
    platformTotals[item.platform] += item.price * item.quantity;
  });

  // Find alternatives for each product
  const getAlternatives = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return [];
    
    return products
      .filter(p => 
        p.name === product.name && 
        p.id !== product.id &&
        p.price < product.price
      )
      .sort((a, b) => a.price - b.price);
  };

  const totalSavings = cartProducts.reduce((sum, item) => {
    const alternatives = getAlternatives(item.id);
    if (alternatives.length > 0) {
      return sum + (item.price - alternatives[0].price) * item.quantity;
    }
    return sum;
  }, 0);

  const total = cartProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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

  // Generate affiliate link (placeholder - replace with actual affiliate links)
  const getAffiliateLink = (platform: string, productId: string) => {
    // In production, these would be your actual affiliate links
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
    
    // Add your affiliate tag here
    const affiliateTags: Record<string, string> = {
      amazon: '?tag=YOUR_AMAZON_AFFILIATE_ID',
      flipkart: '?affid=YOUR_FLIPKART_AFFILIATE_ID',
      myntra: '?ref=YOUR_MYNTRA_AFFILIATE_ID',
      // Add other platform affiliate tags
    };

    return `${baseUrls[platform]}${productId}${affiliateTags[platform] || ''}`;
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
          title="Shopping Cart"
          showBack={true}
        />
      </div>

      <MobileNav />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-4xl sm:text-5xl font-semibold mb-3 tracking-tight">Cart Intelligence</h1>
          <p className="text-lg text-muted-foreground">
            Optimize your cart across platforms to save the most money
          </p>
        </motion.div>

        {cartProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="p-16 text-center border-border/40 bg-card/30">
              <div className="size-20 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="size-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">Add some products to get started with cart optimization</p>
              <Button asChild>
                <a href="/analyze">Browse Products</a>
              </Button>
            </Card>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartProducts.map((item, index) => {
                const alternatives = getAlternatives(item.id);
                const cheapestAlternative = alternatives[0];
                const savings = cheapestAlternative ? (item.price - cheapestAlternative.price) * item.quantity : 0;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="p-6 border-border/40 bg-card/50 backdrop-blur-sm">
                      <div className="flex flex-col sm:flex-row gap-6">
                        {/* Product Image */}
                        <motion.div 
                          className="shrink-0"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ImageWithFallback 
                            src={`https://source.unsplash.com/200x200/?${item.image.replace(/ /g, ',')}`}
                            alt={item.name}
                            className="size-32 object-cover rounded-xl"
                          />
                        </motion.div>

                        {/* Product Info */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                              <Badge className={`bg-gradient-to-r ${platformColors[item.platform]} text-white capitalize border-0`}>
                                {item.platform}
                              </Badge>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="text-destructive hover:bg-destructive/10 shrink-0"
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-2xl font-bold">
                                ₹{(item.price * item.quantity).toLocaleString()}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                ₹{item.price.toLocaleString()} × {item.quantity}
                              </div>
                            </div>
                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${
                              item.aiScore >= 8 ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400' : 
                              item.aiScore >= 6 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400' : 
                              'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
                            }`}>
                              AI Score: {item.aiScore}
                            </div>
                          </div>

                          {/* Alternative Suggestion */}
                          {cheapestAlternative && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800"
                            >
                              <div className="flex items-start gap-3">
                                <div className="size-8 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                                  <TrendingDown className="size-4 text-white" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-green-700 dark:text-green-400 text-sm mb-1">
                                    Save ₹{savings.toLocaleString()} by switching to {cheapestAlternative.platform}!
                                  </div>
                                  <div className="text-xs text-green-600 dark:text-green-500">
                                    Same product available at ₹{cheapestAlternative.price.toLocaleString()}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Summary & Checkout */}
            <div className="space-y-6">
              {/* Price Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Card className="p-6 border-border/40 bg-card/50 backdrop-blur-sm sticky top-24">
                  <h3 className="text-lg font-semibold mb-4">Cart Summary</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal ({cartProducts.length} items)</span>
                      <span className="font-medium">₹{total.toLocaleString()}</span>
                    </div>
                    {totalSavings > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600 dark:text-green-400">Potential Savings</span>
                        <span className="font-medium text-green-600 dark:text-green-400">-₹{totalSavings.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="pt-3 border-t border-border">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Optimized Total</span>
                        <span>₹{(total - totalSavings).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {totalSavings > 0 && (
                    <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg mb-4 border border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-400">
                        <CheckCircle2 className="size-4" />
                        You could save ₹{totalSavings.toLocaleString()}!
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold mb-2">Purchase from Platforms:</h4>
                    {Object.entries(platformTotals).map(([platform, amount]) => {
                      const product = cartProducts.find(p => p.platform === platform);
                      if (!product) return null;
                      
                      return (
                        <Button 
                          key={platform}
                          className={`w-full bg-gradient-to-r ${platformColors[platform]} hover:opacity-90 transition-opacity shadow-glow-blue`}
                          size="lg"
                          asChild
                        >
                          <a 
                            href={getAffiliateLink(platform, product.id)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between"
                          >
                            <span className="capitalize font-semibold">{platform}</span>
                            <div className="flex items-center gap-2">
                              <span>₹{amount.toLocaleString()}</span>
                              <ExternalLink className="size-4" />
                            </div>
                          </a>
                        </Button>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="text-xs text-muted-foreground text-center">
                      <ShoppingBag className="size-4 inline-block mr-1" />
                      Clicking the buttons above takes you to the platform to complete your purchase
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* AI Recommendation */}
              {totalSavings > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <Card className="p-6 border-border/40 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                    <div className="flex items-start gap-3">
                      <div className="size-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                        <AlertCircle className="size-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">AI Recommendation</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          We found cheaper alternatives for some items in your cart. Consider switching platforms to save ₹{totalSavings.toLocaleString()}!
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Platform Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <Card className="p-6 border-border/40 bg-card/30">
                  <h4 className="font-semibold mb-3 text-sm">How Affiliate Links Work</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    When you purchase through our links, we may earn a small commission at no extra cost to you. This helps us maintain and improve Zentrix AI while you get the best deals!
                  </p>
                </Card>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}