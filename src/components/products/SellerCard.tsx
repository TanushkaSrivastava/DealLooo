import { motion } from "framer-motion";
import { ExternalLink, Check, TrendingUp } from "lucide-react";
import { formatPrice } from "@/data/mockData";
import { Button } from "@/components/ui/button";

interface SellerCardProps {
  seller: { marketplace: string; price: number; url: string };
  index: number;
  isLowest: boolean;
  lowestPrice: number;
}

export const SellerCard = ({ seller, index, isLowest, lowestPrice }: SellerCardProps) => {
  const priceDiff = seller.price - lowestPrice;

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      className={`
        glass-card p-5 flex items-center justify-between
        ${isLowest ? "ring-2 ring-primary/50 pulse-glow" : ""}
      `}
    >
      <div className="flex items-center gap-4">
        <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center text-2xl
          ${isLowest ? "bg-primary/10" : "bg-muted"}
        `}>
          {getMarketplaceLogo(seller.marketplace)}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{seller.marketplace}</span>
            {isLowest && (
              <span className="px-2 py-0.5 bg-success/10 text-success text-xs font-medium rounded-full flex items-center gap-1">
                <Check className="w-3 h-3" />
                Lowest
              </span>
            )}
          </div>
          {!isLowest && (
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {formatPrice(priceDiff)} more
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className={`price-tag text-2xl font-bold ${isLowest ? "text-primary" : "text-foreground"}`}>
          {formatPrice(seller.price)}
        </span>
        <Button
          variant={isLowest ? "default" : "outline"}
          size="sm"
          onClick={() => window.open(seller.url, "_blank")}
          className="gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          Buy
        </Button>
      </div>
    </motion.div>
  );
};

const getMarketplaceLogo = (name: string): string => {
  const logos: Record<string, string> = {
    "Amazon India": "🛒",
    "Flipkart": "🛍️",
    "Myntra": "👗",
    "Croma": "📱",
    "Reliance Digital": "💻",
    "Tata CLiQ": "🏪",
  };
  return logos[name] || "🏬";
};
