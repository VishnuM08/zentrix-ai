import { Link, useLocation } from "react-router";
import { Home, Search, BarChart3, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";

export function MobileNav() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/analyze', label: 'Analyze', icon: Search },
    { path: '/compare', label: 'Compare', icon: BarChart3 },
    { path: '/cart', label: 'Cart', icon: ShoppingCart },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav 
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/40 backdrop-blur-2xl pb-safe"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex-1 flex flex-col items-center justify-center gap-1 py-2"
            >
              <motion.div
                className="relative"
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.1 }}
              >
                <Icon 
                  className={`size-5 transition-colors ${
                    active 
                      ? 'text-primary' 
                      : 'text-muted-foreground'
                  }`}
                />
                {active && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full gradient-primary"
                    layoutId="mobileActiveIndicator"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </motion.div>
              <span 
                className={`text-[10px] font-medium transition-colors ${
                  active 
                    ? 'text-foreground' 
                    : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
