import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Star } from "lucide-react";
import { Product, formatPrice, calculateSavings } from "@/data/mockData";

interface ProductCardProps {
  product: Product;
  index: number;
  onClick: () => void;
  isLowest?: boolean;
}

export const ProductCard = ({ product, index, onClick, isLowest }: ProductCardProps) => {
  const savings = calculateSavings(product.highestPrice, product.lowestPrice);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className={`
        group glass-card overflow-hidden cursor-pointer
        transition-all duration-300 hover:shadow-lg
        ${isLowest ? "ring-2 ring-primary/50 pulse-glow" : ""}
      `}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Savings Badge */}
        {savings > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="absolute top-3 left-3 px-3 py-1 bg-success text-success-foreground rounded-full text-xs font-semibold flex items-center gap-1"
          >
            <TrendingDown className="w-3 h-3" />
            {savings}% off
          </motion.div>
        )}

        {/* Lowest Price Indicator */}
        {isLowest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-3 right-3 px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-semibold"
          >
            Lowest Price
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-warning text-warning" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount.toLocaleString("en-IN")})
          </span>
        </div>

        <h3 className="font-display font-semibold text-foreground line-clamp-2 mb-3 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="price-tag text-xl font-bold text-primary">
              {formatPrice(product.lowestPrice)}
            </span>
            {product.lowestPrice < product.highestPrice && (
              <span className="price-tag text-sm text-muted-foreground line-through">
                {formatPrice(product.highestPrice)}
              </span>
            )}
          </div>
          
          <p className="text-xs text-muted-foreground">
            Across {product.currentPrices.length} stores
          </p>
        </div>

        {/* Price Trend Indicator */}
        <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-2">
          {product.lowestPrice < product.averagePrice ? (
            <>
              <TrendingDown className="w-4 h-4 text-success" />
              <span className="text-xs text-success font-medium">Below average</span>
            </>
          ) : (
            <>
              <TrendingUp className="w-4 h-4 text-warning" />
              <span className="text-xs text-warning font-medium">Above average</span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};
