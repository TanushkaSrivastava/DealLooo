import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { AnimatedSearchBar } from "@/components/search/AnimatedSearchBar";
import { ProductCard } from "@/components/products/ProductCard";
import { products, categories } from "@/data/mockData";
import { SlidersHorizontal, Grid3X3, List, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const categoryFilter = searchParams.get("category") || "";
  
  const [searchQuery, setSearchQuery] = useState(query);
  const [sortBy, setSortBy] = useState("lowest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    
    if (query) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (categoryFilter) {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    switch (sortBy) {
      case "lowest":
        filtered.sort((a, b) => a.lowestPrice - b.lowestPrice);
        break;
      case "highest":
        filtered.sort((a, b) => b.lowestPrice - a.lowestPrice);
        break;
      case "savings":
        filtered.sort(
          (a, b) =>
            (b.highestPrice - b.lowestPrice) - (a.highestPrice - a.lowestPrice)
        );
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    return filtered;
  }, [query, categoryFilter, sortBy]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <AnimatedSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
          />
        </div>

        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6"
        >
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {query ? `Results for "${query}"` : categoryFilter ? categories.find(c => c.id === categoryFilter)?.name : "All Products"}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {filteredProducts.length} products found
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Sort by
                <ChevronDown className="w-4 h-4" />
              </Button>
              
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-48 glass-card p-2 z-10"
                  >
                    {[
                      { value: "lowest", label: "Lowest Price" },
                      { value: "highest", label: "Highest Price" },
                      { value: "savings", label: "Best Savings" },
                      { value: "rating", label: "Top Rated" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setShowFilters(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          sortBy === option.value
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${
                  viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors ${
                  viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          <Button
            variant={!categoryFilter ? "default" : "outline"}
            size="sm"
            onClick={() => navigate(`/search${query ? `?q=${query}` : ""}`)}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={categoryFilter === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => navigate(`/search?category=${category.id}${query ? `&q=${query}` : ""}`)}
            >
              {category.icon} {category.name}
            </Button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={sortBy + categoryFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onClick={() => handleProductClick(product.id)}
                isLowest={index === 0 && sortBy === "lowest"}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground text-lg">
              No products found. Try a different search.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
