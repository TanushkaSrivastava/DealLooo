import { motion } from "framer-motion";
import { trendingSearches } from "@/data/mockData";

interface TrendingSearchesProps {
  onSearchClick: (query: string) => void;
}

export const TrendingSearches = ({ onSearchClick }: TrendingSearchesProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="flex flex-wrap items-center justify-center gap-2 mt-6"
    >
      <span className="text-sm text-muted-foreground mr-2">Trending:</span>
      {trendingSearches.map((search, index) => (
        <motion.button
          key={search}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 + index * 0.1 }}
          onClick={() => onSearchClick(search)}
          className="px-3 py-1.5 text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {search}
        </motion.button>
      ))}
    </motion.div>
  );
};
