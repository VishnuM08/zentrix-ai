import { useNavigate } from "react-router";
import { ArrowLeft, ShoppingCart, Search } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";

interface MobileHeaderProps {
  title: string;
  showBack?: boolean;
  showCart?: boolean;
  onCartClick?: () => void;
  rightAction?: React.ReactNode;
}

export function MobileHeader({ 
  title, 
  showBack = false, 
  showCart = false,
  onCartClick,
  rightAction 
}: MobileHeaderProps) {
  const navigate = useNavigate();

  return (
    <motion.header 
      className="md:hidden sticky top-0 z-50 glass border-b border-border/40 backdrop-blur-2xl pt-safe"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-3 flex-1">
          {showBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="size-9 rounded-full -ml-2"
            >
              <ArrowLeft className="size-5" />
            </Button>
          )}
          <h1 className="text-lg font-semibold tracking-tight truncate">{title}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          {rightAction}
          {showCart && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onCartClick || (() => navigate('/cart'))}
              className="size-9 rounded-full"
            >
              <ShoppingCart className="size-5" />
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
