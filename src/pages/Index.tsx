import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { AnimatedSearchBar } from "@/components/search/AnimatedSearchBar";
import { CategoryCards } from "@/components/home/CategoryCards";
import { TrendingSearches } from "@/components/home/TrendingSearches";
import { FeaturedProducts, FeaturesSection } from "@/components/home/FeaturedProducts";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/search?category=${categoryId}`);
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container relative px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-primary/10 text-primary rounded-full"
            >
              🇮🇳 Trusted by 1 Lakh+ Indian Shoppers
            </motion.span>
            
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
              Find the{" "}
              <span className="gradient-text">Lowest Price</span>
              <br />
              Across India
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Compare prices from Amazon, Flipkart, Myntra & 50+ stores.
              Never overpay again.
            </p>
          </motion.div>

          <AnimatedSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
          />

          <TrendingSearches 
            onSearchClick={(query) => {
              setSearchQuery(query);
              navigate(`/search?q=${encodeURIComponent(query)}`);
            }} 
          />
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-muted/30">
        <div className="container px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl font-bold text-foreground mb-8 text-center"
          >
            Shop by Category
          </motion.h2>
          <CategoryCards onCategoryClick={handleCategoryClick} />
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts onProductClick={handleProductClick} />

      {/* Features */}
      <FeaturesSection />

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg">
                Price<span className="text-primary">Pulse</span>
              </span>
              <span className="text-sm text-muted-foreground">
                © 2025 All rights reserved
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
