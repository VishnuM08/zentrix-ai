import { useState } from "react";
import { Header } from "../components/Header";
import { MobileNav } from "../components/MobileNav";
import { MobileHeader } from "../components/MobileHeader";
import { ProductCard } from "../components/ProductCard";
import { products } from "../data/products";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Search, SlidersHorizontal, X, Link } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { motion, AnimatePresence } from "motion/react";

export function Analyze() {
  const [searchQuery, setSearchQuery] = useState("");
  const [urlQuery, setUrlQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("aiScore");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesUrl = urlQuery === "" || (product.productUrl && product.productUrl.toLowerCase().includes(urlQuery.toLowerCase()));
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesPlatform = selectedPlatform === "all" || product.platform === selectedPlatform;
      return matchesSearch && matchesUrl && matchesCategory && matchesPlatform;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "aiScore":
          return b.aiScore - a.aiScore;
        case "priceLow":
          return a.price - b.price;
        case "priceHigh":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "electronics", label: "Electronics" },
    { value: "fashion", label: "Fashion" },
    { value: "grocery", label: "Grocery" },
    { value: "beauty", label: "Beauty" },
    { value: "home", label: "Home" }
  ];

  const platformsList = [
    { value: "all", label: "All Platforms" },
    { value: "amazon", label: "Amazon" },
    { value: "flipkart", label: "Flipkart" },
    { value: "myntra", label: "Myntra" },
    { value: "ajio", label: "Ajio" },
    { value: "blinkit", label: "Blinkit" },
    { value: "zepto", label: "Zepto" },
    { value: "instamart", label: "Instamart" },
    { value: "nykaa", label: "Nykaa" }
  ];

  const activeFiltersCount = 
    (selectedCategory !== "all" ? 1 : 0) + 
    (selectedPlatform !== "all" ? 1 : 0);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden">
        <MobileHeader 
          title="Analyze Products" 
          showCart={true}
          rightAction={
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className="size-9 rounded-full relative"
            >
              <SlidersHorizontal className="size-5" />
              {activeFiltersCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 size-4 bg-primary text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          }
        />
      </div>

      <MobileNav />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Desktop Header */}
        <motion.div 
          className="hidden md:block mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-semibold mb-3 tracking-tight">Analyze Products</h1>
          <p className="text-lg text-muted-foreground">
            Search and compare products across multiple platforms
          </p>
        </motion.div>

        {/* Mobile Search Bar */}
        <motion.div 
          className="md:hidden mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-2xl border-border/40 bg-card/50"
            />
          </div>
          <div className="relative mt-3">
            <Link className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              type="url"
              placeholder="Paste product URL..."
              value={urlQuery}
              onChange={(e) => setUrlQuery(e.target.value)}
              className="pl-10 h-12 rounded-2xl border-border/40 bg-card/50"
            />
          </div>
        </motion.div>

        {/* Mobile Filters Bottom Sheet */}
        <AnimatePresence>
          {showFilters && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="md:hidden fixed inset-0 bg-black/50 z-40"
                onClick={() => setShowFilters(false)}
              />

              {/* Bottom Sheet */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-3xl shadow-2xl max-h-[80vh] overflow-y-auto pb-safe"
              >
                <div className="sticky top-0 bg-card/95 backdrop-blur-xl border-b border-border/40 px-6 py-4 flex items-center justify-between rounded-t-3xl">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowFilters(false)}
                    className="size-9 rounded-full"
                  >
                    <X className="size-5" />
                  </Button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Category Filter */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Category</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <Button
                          key={cat.value}
                          variant={selectedCategory === cat.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(cat.value)}
                          className={`rounded-full ${
                            selectedCategory === cat.value 
                              ? "gradient-primary" 
                              : "border-border/60"
                          }`}
                        >
                          {cat.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Platform Filter */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Platform</label>
                    <div className="flex flex-wrap gap-2">
                      {platformsList.map((platform) => (
                        <Button
                          key={platform.value}
                          variant={selectedPlatform === platform.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedPlatform(platform.value)}
                          className={`rounded-full capitalize ${
                            selectedPlatform === platform.value 
                              ? "gradient-primary" 
                              : "border-border/60"
                          }`}
                        >
                          {platform.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Sort By</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { value: "aiScore", label: "AI Score" },
                        { value: "priceLow", label: "Price: Low to High" },
                        { value: "priceHigh", label: "Price: High to Low" },
                        { value: "rating", label: "Rating" }
                      ].map((sort) => (
                        <Button
                          key={sort.value}
                          variant={sortBy === sort.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSortBy(sort.value)}
                          className={`rounded-full ${
                            sortBy === sort.value 
                              ? "gradient-primary" 
                              : "border-border/60"
                          }`}
                        >
                          {sort.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedCategory("all");
                        setSelectedPlatform("all");
                      }}
                      className="w-full rounded-full"
                    >
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Desktop Filters */}
        <motion.div
          className="hidden md:block mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="p-6 border-border/40 bg-card/50 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-border/40"
                />
              </div>

              <div className="relative">
                <Link className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="url"
                  placeholder="Paste product URL..."
                  value={urlQuery}
                  onChange={(e) => setUrlQuery(e.target.value)}
                  className="pl-10 border-border/40"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="border-border/40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger className="border-border/40">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  {platformsList.map((platform) => (
                    <SelectItem key={platform.value} value={platform.value} className="capitalize">
                      {platform.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="border-border/40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aiScore">AI Score</SelectItem>
                  <SelectItem value="priceLow">Price: Low to High</SelectItem>
                  <SelectItem value="priceHigh">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </motion.div>

        {/* Active Filters (Mobile) */}
        {activeFiltersCount > 0 && (
          <motion.div 
            className="md:hidden mb-4 flex items-center gap-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <span className="text-sm text-muted-foreground">Filters:</span>
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="capitalize">
                {selectedCategory}
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="ml-1.5 hover:text-foreground"
                >
                  <X className="size-3" />
                </button>
              </Badge>
            )}
            {selectedPlatform !== "all" && (
              <Badge variant="secondary" className="capitalize">
                {selectedPlatform}
                <button
                  onClick={() => setSelectedPlatform("all")}
                  className="ml-1.5 hover:text-foreground"
                >
                  <X className="size-3" />
                </button>
              </Badge>
            )}
          </motion.div>
        )}

        {/* Results Count */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <p className="text-sm text-muted-foreground">
            Found {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="p-16 text-center border-border/40 bg-card/30">
              <div className="size-20 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-6">
                <Search className="size-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filters or search query</p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setUrlQuery("");
                  setSelectedCategory("all");
                  setSelectedPlatform("all");
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
