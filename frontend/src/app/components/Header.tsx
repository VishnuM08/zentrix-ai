import { Link, useLocation } from "react-router";
import { Search, Moon, Sun, Home } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "./ThemeProvider";
import { motion } from "motion/react";

export function Header() {
  const location = useLocation();
  const { resolvedTheme, toggleTheme } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header 
      className="border-b border-border/40 glass sticky top-0 z-50 pt-safe"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              className="size-9 rounded-full gradient-primary flex items-center justify-center shadow-glow-blue reflective"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="size-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </motion.div>
            <div className="flex flex-col">
              <span className="font-semibold text-[17px] tracking-tight">Zentrix AI</span>
              <span className="text-[11px] text-muted-foreground tracking-wide hidden sm:block">by Aignite Technologies</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {[
              { path: '/', label: 'Home', icon: Home },
              { path: '/analyze', label: 'Analyze' },
              { path: '/compare', label: 'Compare' },
              { path: '/cart', label: 'Cart Intelligence' }
            ].map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className="relative px-4 py-2 rounded-lg"
              >
                <span className={`text-[15px] transition-colors flex items-center gap-2 ${
                  isActive(item.path) 
                    ? 'text-foreground font-medium' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}>
                  {item.icon && <item.icon className="size-4" />}
                  {item.label}
                </span>
                {isActive(item.path) && (
                  <motion.div
                    className="absolute inset-0 glossy rounded-lg -z-10"
                    layoutId="activeTab"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleTheme}
                className="rounded-full size-9 glossy"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="size-[18px]" />
                ) : (
                  <Moon className="size-[18px]" />
                )}
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="default" 
                size="sm" 
                asChild
                className="rounded-full px-4 gradient-primary hover:opacity-90 transition-all duration-200 shadow-glow-blue reflective"
              >
                <Link to="/analyze">
                  <Search className="size-4 mr-2" />
                  Search
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}