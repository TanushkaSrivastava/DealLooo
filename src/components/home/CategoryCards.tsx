import { motion } from "framer-motion";
import { categories } from "@/data/mockData";

interface CategoryCardsProps {
  onCategoryClick: (categoryId: string) => void;
}

export const CategoryCards = ({ onCategoryClick }: CategoryCardsProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
    >
      {categories.map((category) => (
        <motion.button
          key={category.id}
          variants={cardVariants}
          onClick={() => onCategoryClick(category.id)}
          className="group glass-card p-6 text-center hover:shadow-lg transition-all duration-300"
          whileHover={{ y: -5, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.span
            className="text-4xl block mb-3"
            whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.4 }}
          >
            {category.icon}
          </motion.span>
          <h3 className="font-display font-semibold text-foreground text-sm mb-1">
            {category.name}
          </h3>
          <span className="text-xs text-muted-foreground">
            {category.count.toLocaleString("en-IN")} products
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
};
