import { Link } from "react-router";
import { Header } from "../components/Header";
import { MobileNav } from "../components/MobileNav";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { platforms } from "../data/products";
import { 
  Search, 
  TrendingDown, 
  Brain,
  ShoppingCart,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function Landing() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <MobileNav />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/10 to-transparent dark:from-blue-500/10 dark:via-purple-500/10 pointer-events-none" />
        
        <motion.div 
          className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-20 md:pb-32"
          style={{ opacity, scale }}
        >
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item}>
              <motion.div 
                className="inline-flex items-center gap-2 glass border border-border/40 px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-6 md:mb-8"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Sparkles className="size-3 md:size-4 text-foreground/60 dark:text-primary" />
                <span className="text-xs md:text-sm font-medium">AI-Powered Purchase Intelligence</span>
              </motion.div>
            </motion.div>
            
            <motion.h1 
              className="text-3xl sm:text-5xl lg:text-7xl font-semibold tracking-tight mb-4 md:mb-6"
              variants={item}
            >
              Make{" "}
              <span className="bg-gradient-to-r from-foreground to-foreground/70 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                smarter purchases
              </span>
              <br />
              across every platform
            </motion.h1>
            
            <motion.p 
              className="text-base md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4"
              variants={item}
            >
              Zentrix AI analyzes prices, trends, and alternatives across e-commerce, 
              fashion, and quick-commerce platforms to help you save money.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center mb-12 md:mb-16 px-4"
              variants={item}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" asChild className="rounded-full px-8 h-12 text-base gradient-primary shadow-glow-blue reflective">
                  <Link to="/analyze">
                    <Search className="size-5 mr-2" />
                    Analyze Products
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild
                  className="rounded-full px-8 h-12 text-base border-border/60 hover:border-primary/40 glass"
                >
                  <Link to="/compare">
                    <TrendingDown className="size-5 mr-2" />
                    Compare Prices
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
              variants={container}
            >
              {[
                { number: "8+", label: "Platforms Tracked" },
                { number: "AI", label: "Smart Recommendations" },
                { number: "30%", label: "Average Savings" }
              ].map((stat, index) => (
                <motion.div key={index} variants={item}>
                  <Card className="p-8 text-center border-border/40 frosted hover:glass-strong transition-all duration-300 hover:shadow-strong hover:shadow-primary/5 group shine">
                    <div className="text-4xl font-bold text-foreground dark:bg-gradient-to-r dark:from-blue-500 dark:to-blue-600 dark:bg-clip-text dark:text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl sm:text-5xl font-semibold mb-4 tracking-tight">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to make informed purchase decisions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Brain,
                title: "AI Value Score",
                description: "Get intelligent recommendations based on price history, ratings, and market trends"
              },
              {
                icon: TrendingDown,
                title: "Price History",
                description: "Track price trends and get alerts when products reach their lowest price"
              },
              {
                icon: Search,
                title: "Cross-Platform Search",
                description: "Find the same product across multiple platforms and compare instantly"
              },
              {
                icon: ShoppingCart,
                title: "Cart Intelligence",
                description: "Optimize your entire cart across platforms to maximize savings"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="p-8 h-full border-border/40 frosted hover:glass-strong transition-all duration-500 hover:shadow-strong hover:shadow-primary/10 hover:-translate-y-1 group shine">
                  <div className="size-14 rounded-2xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 reflective shadow-medium">
                    <feature.icon className="size-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-32 relative bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl sm:text-5xl font-semibold mb-4 tracking-tight">Supported Platforms</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We track prices across leading platforms in India
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="p-6 border-border/40 frosted hover:glass-strong transition-all duration-300 hover:shadow-medium hover:shadow-primary/5 hover:-translate-y-1 group">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      {platform.logo}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{platform.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{platform.category}</p>
                      <p className="text-sm text-muted-foreground/80 leading-relaxed">
                        {platform.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl sm:text-5xl font-semibold mb-4 tracking-tight">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to smarter shopping
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Search Product",
                description: "Enter the product name or paste a link from any supported platform"
              },
              {
                step: "2",
                title: "Get AI Analysis",
                description: "Our AI analyzes prices, trends, and alternatives across all platforms"
              },
              {
                step: "3",
                title: "Buy Smart",
                description: "Make an informed decision based on value score and recommendations"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div 
                  className="size-20 gradient-primary text-white rounded-3xl flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-2xl shadow-primary/20 reflective"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {step.step}
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="relative overflow-hidden p-16 text-center gradient-primary dark:bg-gradient-to-br dark:from-blue-600 dark:via-purple-600 dark:to-blue-700 border-0 shadow-2xl reflective">
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
              <div className="absolute inset-0 shine pointer-events-none opacity-30" />
              
              <div className="relative z-10">
                <h2 className="text-4xl sm:text-5xl font-semibold text-white mb-6 tracking-tight">
                  Ready to Start Saving?
                </h2>
                <p className="text-xl text-white/80 dark:text-blue-100 mb-10 max-w-2xl mx-auto">
                  Join thousands of smart shoppers using Zentrix AI
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    asChild
                    className="rounded-full px-8 h-14 text-lg font-medium shadow-xl glossy"
                  >
                    <Link to="/analyze">
                      Get Started Now
                      <ChevronRight className="size-5 ml-2" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-full gradient-primary dark:bg-gradient-to-br dark:from-blue-500 dark:to-purple-600 flex items-center justify-center">
                <svg className="size-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[15px]">Zentrix AI</span>
                <span className="text-xs text-muted-foreground">by Aignite Technologies</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Aignite Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}