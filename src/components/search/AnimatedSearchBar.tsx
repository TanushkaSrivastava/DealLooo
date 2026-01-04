import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchPlaceholders } from "@/data/mockData";

interface AnimatedSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export const AnimatedSearchBar = ({ value, onChange, onSearch }: AnimatedSearchBarProps) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (isFocused || value) return;
    
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isFocused, value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full max-w-2xl mx-auto"
    >
      <motion.div
        className={`
          relative flex items-center gap-3 px-6 py-4 
          glass-card transition-all duration-300
          ${isFocused ? "shadow-glow ring-2 ring-primary/20" : ""}
        `}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Search className="w-5 h-5 text-muted-foreground shrink-0" />
        
        <div className="relative flex-1">
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            className="border-0 bg-transparent p-0 text-lg font-medium placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder=""
          />
          
          <AnimatePresence mode="wait">
            {!value && !isFocused && (
              <motion.span
                key={placeholderIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.5, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-lg text-muted-foreground pointer-events-none"
              >
                Search for "{searchPlaceholders[placeholderIndex]}"
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          onClick={onSearch}
          className="px-5 py-2 bg-primary text-primary-foreground rounded-xl font-medium text-sm shrink-0"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          Search
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
