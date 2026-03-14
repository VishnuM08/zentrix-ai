import { useState } from "react";
import { Header } from "../components/Header";
import { MobileNav } from "../components/MobileNav";
import { MobileHeader } from "../components/MobileHeader";
import { products } from "../data/products";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { 
  Star, 
  TrendingDown, 
  Package,
  Clock,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { motion } from "motion/react";
import { Link } from "react-router";

export function Compare() {
  const [selectedCategory, setSelectedCategory] = useState<'electronics' | 'fashion' | 'grocery'>('electronics');

  // Group products by name for comparison
  const getProductComparisons = (category: string) => {
    const productGroups: { [key: string]: typeof products } = {};
    
    products
      .filter(p => p.category === category)
      .forEach(product => {
        if (!productGroups[product.name]) {
          productGroups[product.name] = [];
        }
        productGroups[product.name].push(product);
      });

    return Object.entries(productGroups)
      .filter(([_, items]) => items.length > 1)
      .map(([name, items]) => ({
        name,
        products: items.sort((a, b) => a.price - b.price)
      }));
  };

  const electronicsComparisons = getProductComparisons('electronics');
  const fashionComparisons = getProductComparisons('fashion');
  const groceryComparisons = getProductComparisons('grocery');

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

  const ComparisonCard = ({ name, products }: { name: string; products: typeof products }) => {
    const cheapest = products[0];
    const savings = products[products.length - 1].price - cheapest.price;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card className="p-6 mb-6 border-border/40 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
          <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <ImageWithFallback 
                src={`https://source.unsplash.com/200x200/?${products[0].image.replace(/ /g, ',')}`}
                alt={name}
                className="size-32 object-cover rounded-xl"
              />
            </motion.div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{name}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">{products[0].description}</p>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="outline" className="text-green-600 border-green-600/50 bg-green-50 dark:bg-green-950/30">
                  Save up to ₹{savings.toLocaleString()}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {products.length} platforms compared
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card 
                  className={`p-4 h-full ${index === 0 ? 'border-2 border-green-500 dark:border-green-600 relative bg-green-50/50 dark:bg-green-950/20' : 'border-border/40 bg-secondary/30'}`}
                >
                  {index === 0 && (
                    <Badge className="absolute -top-3 left-4 bg-gradient-to-r from-green-500 to-green-600 shadow-lg">
                      <CheckCircle2 className="size-3 mr-1" />
                      Best Price
                    </Badge>
                  )}
                  
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={`bg-gradient-to-r ${platformColors[product.platform]} text-white capitalize border-0`}>
                      {product.platform}
                    </Badge>
                    {product.deliveryTime && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3" />
                        {product.deliveryTime}
                      </div>
                    )}
                  </div>

                  <div className="text-2xl font-bold mb-2">
                    ₹{product.price.toLocaleString()}
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="size-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({product.reviews.toLocaleString()})
                    </span>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg">
                    <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      product.aiScore >= 8 ? 'bg-gradient-to-br from-green-400 to-green-600 text-white' : 
                      product.aiScore >= 6 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' : 
                      'bg-gradient-to-br from-red-400 to-red-600 text-white'
                    }`}>
                      {product.aiScore}
                    </div>
                    <span className="text-xs font-medium">AI Score</span>
                  </div>

                  {index > 0 && (
                    <div className="mt-3 pt-3 border-t border-border/40">
                      <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                        <TrendingDown className="size-4" />
                        ₹{(product.price - cheapest.price).toLocaleString()} more expensive
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    );
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
          title="Compare Prices"
          showBack={true}
          showCart={true}
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
          <h1 className="text-4xl sm:text-5xl font-semibold mb-3 tracking-tight">Price Comparison</h1>
          <p className="text-lg text-muted-foreground">
            Compare the same products across multiple platforms and find the best deals
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Tabs defaultValue="electronics" className="mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-secondary/50">
              <TabsTrigger value="electronics">Electronics</TabsTrigger>
              <TabsTrigger value="fashion">Fashion</TabsTrigger>
              <TabsTrigger value="grocery">Groceries</TabsTrigger>
            </TabsList>

            <TabsContent value="electronics" className="mt-8">
              {electronicsComparisons.length > 0 ? (
                electronicsComparisons.map((comparison) => (
                  <ComparisonCard 
                    key={comparison.name} 
                    name={comparison.name} 
                    products={comparison.products} 
                  />
                ))
              ) : (
                <Card className="p-16 text-center border-border/40 bg-card/30">
                  <div className="size-20 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-6">
                    <Package className="size-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No comparisons available</h3>
                  <p className="text-muted-foreground">No electronics found on multiple platforms</p>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="fashion" className="mt-8">
              {fashionComparisons.length > 0 ? (
                fashionComparisons.map((comparison) => (
                  <ComparisonCard 
                    key={comparison.name} 
                    name={comparison.name} 
                    products={comparison.products} 
                  />
                ))
              ) : (
                <Card className="p-16 text-center border-border/40 bg-card/30">
                  <div className="size-20 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-6">
                    <Package className="size-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No comparisons available</h3>
                  <p className="text-muted-foreground">No fashion items found on multiple platforms</p>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="grocery" className="mt-8">
              {groceryComparisons.length > 0 ? (
                groceryComparisons.map((comparison) => (
                  <ComparisonCard 
                    key={comparison.name} 
                    name={comparison.name} 
                    products={comparison.products} 
                  />
                ))
              ) : (
                <Card className="p-16 text-center border-border/40 bg-card/30">
                  <div className="size-20 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-6">
                    <Package className="size-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No comparisons available</h3>
                  <p className="text-muted-foreground">No grocery items found on multiple platforms</p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-border/40">
            <h3 className="font-semibold mb-4 text-lg">Quick Commerce Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Fastest Delivery</div>
                <div className="font-semibold text-lg">Blinkit - 10 mins</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Best Prices</div>
                <div className="font-semibold text-lg">Zepto - Usually ₹3-5 cheaper</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Most Products</div>
                <div className="font-semibold text-lg">Instamart - Wide range</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}