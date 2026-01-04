import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Bell } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { products } from "@/data/mockData";

interface FeaturedProductsProps {
  onProductClick: (productId: string) => void;
}

export const FeaturedProducts = ({ onProductClick }: FeaturedProductsProps) => {
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="py-16">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Best Deals Right Now
            </h2>
            <p className="text-muted-foreground">
              Prices drop. We track. You save.
            </p>
          </div>
          <motion.button
            className="hidden md:flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
            whileHover={{ x: 5 }}
          >
            View all <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onClick={() => onProductClick(product.id)}
              isLowest={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Trusted Prices",
      description: "Verified prices from 50+ Indian marketplaces",
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Prices update every hour for accuracy",
    },
    {
      icon: Bell,
      title: "Price Alerts",
      description: "Get notified when prices drop",
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="text-center"
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <feature.icon className="w-8 h-8 text-primary" />
              </motion.div>
              <h3 className="font-display font-semibold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
