import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ExternalLink, 
  Bell, 
  Heart, 
  Share2, 
  Star,
  TrendingDown,
  TrendingUp,
  ShieldCheck
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { products, formatPrice, calculateSavings, marketplaces } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { PriceHistoryChart } from "@/components/products/PriceHistoryChart";
import { SellerCard } from "@/components/products/SellerCard";
import { toast } from "sonner";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  const savings = calculateSavings(product.highestPrice, product.lowestPrice);
  const lowestPriceStore = product.currentPrices.reduce((prev, curr) => 
    curr.price < prev.price ? curr : prev
  );

  const handleSetAlert = () => {
    toast.success("Price alert set!", {
      description: `We'll notify you when ${product.name} drops below ₹${product.lowestPrice.toLocaleString("en-IN")}`,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container px-4 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to results
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden glass-card">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Savings Badge */}
            {savings > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute top-4 left-4 px-4 py-2 bg-success text-success-foreground rounded-xl font-semibold flex items-center gap-2"
              >
                <TrendingDown className="w-4 h-4" />
                Save {savings}%
              </motion.div>
            )}
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Title & Rating */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 fill-warning text-warning" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground text-sm">
                  ({product.reviewCount.toLocaleString("en-IN")} reviews)
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {product.name}
              </h1>
              <p className="text-muted-foreground mt-2">{product.description}</p>
            </div>

            {/* Price Section */}
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-muted-foreground block mb-1">Lowest Price</span>
                  <span className="price-tag text-4xl font-bold text-primary">
                    {formatPrice(product.lowestPrice)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm text-muted-foreground block mb-1">on</span>
                  <span className="font-medium">{lowestPriceStore.marketplace}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-success">
                  <TrendingDown className="w-4 h-4" />
                  <span>{formatPrice(product.highestPrice - product.lowestPrice)} cheaper than highest</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  className="w-full gap-2"
                  onClick={() => window.open(lowestPriceStore.url, "_blank")}
                >
                  <ExternalLink className="w-4 h-4" />
                  Buy at Lowest Price
                </Button>
                <Button variant="outline" className="w-full gap-2" onClick={handleSetAlert}>
                  <Bell className="w-4 h-4" />
                  Set Alert
                </Button>
              </div>

              <div className="flex items-center justify-center gap-4 pt-2">
                <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm">
                  <Heart className="w-4 h-4" />
                  Save
                </button>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="w-5 h-5 text-success" />
              Prices verified and updated hourly
            </div>
          </motion.div>
        </div>

        {/* Price History Chart */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="font-display text-2xl font-bold mb-6">Price History</h2>
          <PriceHistoryChart priceHistory={product.priceHistory} />
        </motion.section>

        {/* All Sellers */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="font-display text-2xl font-bold mb-6">
            Compare Prices ({product.currentPrices.length} stores)
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {product.currentPrices
              .sort((a, b) => a.price - b.price)
              .map((seller, index) => (
                <SellerCard
                  key={seller.marketplace}
                  seller={seller}
                  index={index}
                  isLowest={index === 0}
                  lowestPrice={product.lowestPrice}
                />
              ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ProductDetailPage;
