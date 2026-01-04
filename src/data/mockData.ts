// Indian product mock data for PricePulse

export interface Marketplace {
  id: string;
  name: string;
  logo: string;
  color: string;
}

export interface PricePoint {
  date: string;
  price: number;
  marketplace: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  description: string;
  currentPrices: { marketplace: string; price: number; url: string }[];
  lowestPrice: number;
  highestPrice: number;
  averagePrice: number;
  priceHistory: PricePoint[];
  rating: number;
  reviewCount: number;
}

export const marketplaces: Marketplace[] = [
  { id: "amazon", name: "Amazon India", logo: "🛒", color: "#FF9900" },
  { id: "flipkart", name: "Flipkart", logo: "🛍️", color: "#2874F0" },
  { id: "myntra", name: "Myntra", logo: "👗", color: "#FF3F6C" },
  { id: "croma", name: "Croma", logo: "📱", color: "#0DB14B" },
  { id: "reliance", name: "Reliance Digital", logo: "💻", color: "#E42529" },
  { id: "tatacliq", name: "Tata CLiQ", logo: "🏪", color: "#D81F56" },
];

export const categories = [
  { id: "electronics", name: "Electronics", icon: "📱", count: 2340 },
  { id: "fashion", name: "Fashion", icon: "👔", count: 5620 },
  { id: "home", name: "Home & Kitchen", icon: "🏠", count: 1890 },
  { id: "beauty", name: "Beauty & Health", icon: "💄", count: 980 },
  { id: "sports", name: "Sports & Fitness", icon: "🏏", count: 720 },
  { id: "books", name: "Books", icon: "📚", count: 3450 },
];

export const searchPlaceholders = [
  "Samsung Galaxy S24 Ultra",
  "iPhone 15 Pro Max",
  "Sony WH-1000XM5",
  "Nike Air Jordan",
  "Boat Airdopes 441",
  "OnePlus Nord CE 4",
  "Prestige Induction Cooktop",
  "Himalaya Face Wash",
];

export const products: Product[] = [
  {
    id: "1",
    name: "Samsung Galaxy S24 Ultra 256GB",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
    category: "electronics",
    description: "Flagship smartphone with S Pen, 200MP camera, and Snapdragon 8 Gen 3",
    currentPrices: [
      { marketplace: "Amazon India", price: 129999, url: "#" },
      { marketplace: "Flipkart", price: 127999, url: "#" },
      { marketplace: "Croma", price: 131999, url: "#" },
      { marketplace: "Reliance Digital", price: 129499, url: "#" },
    ],
    lowestPrice: 127999,
    highestPrice: 131999,
    averagePrice: 129874,
    priceHistory: generatePriceHistory(130000, 127999),
    rating: 4.6,
    reviewCount: 15420,
  },
  {
    id: "2",
    name: "Sony WH-1000XM5 Wireless Headphones",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
    category: "electronics",
    description: "Industry-leading noise cancellation with 30-hour battery life",
    currentPrices: [
      { marketplace: "Amazon India", price: 26990, url: "#" },
      { marketplace: "Flipkart", price: 27499, url: "#" },
      { marketplace: "Croma", price: 28990, url: "#" },
      { marketplace: "Tata CLiQ", price: 27990, url: "#" },
    ],
    lowestPrice: 26990,
    highestPrice: 28990,
    averagePrice: 27867,
    priceHistory: generatePriceHistory(29990, 26990),
    rating: 4.8,
    reviewCount: 8932,
  },
  {
    id: "3",
    name: "Apple MacBook Air M3 13-inch",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    category: "electronics",
    description: "Supercharged by M3 chip with 8GB RAM and 256GB SSD",
    currentPrices: [
      { marketplace: "Amazon India", price: 114900, url: "#" },
      { marketplace: "Flipkart", price: 113990, url: "#" },
      { marketplace: "Croma", price: 116990, url: "#" },
      { marketplace: "Reliance Digital", price: 114500, url: "#" },
    ],
    lowestPrice: 113990,
    highestPrice: 116990,
    averagePrice: 115095,
    priceHistory: generatePriceHistory(119900, 113990),
    rating: 4.7,
    reviewCount: 5621,
  },
  {
    id: "4",
    name: "Boat Airdopes 441 TWS Earbuds",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    category: "electronics",
    description: "Wireless earbuds with 30H playtime and IPX7 water resistance",
    currentPrices: [
      { marketplace: "Amazon India", price: 1299, url: "#" },
      { marketplace: "Flipkart", price: 1199, url: "#" },
      { marketplace: "Myntra", price: 1399, url: "#" },
    ],
    lowestPrice: 1199,
    highestPrice: 1399,
    averagePrice: 1299,
    priceHistory: generatePriceHistory(1999, 1199),
    rating: 4.2,
    reviewCount: 45230,
  },
  {
    id: "5",
    name: "Prestige Iris 750W Mixer Grinder",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop",
    category: "home",
    description: "750W motor with 3 stainless steel jars and 2 year warranty",
    currentPrices: [
      { marketplace: "Amazon India", price: 3499, url: "#" },
      { marketplace: "Flipkart", price: 3299, url: "#" },
      { marketplace: "Croma", price: 3599, url: "#" },
      { marketplace: "Tata CLiQ", price: 3449, url: "#" },
    ],
    lowestPrice: 3299,
    highestPrice: 3599,
    averagePrice: 3461,
    priceHistory: generatePriceHistory(4499, 3299),
    rating: 4.4,
    reviewCount: 12890,
  },
  {
    id: "6",
    name: "Nike Air Jordan 1 Retro High OG",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop",
    category: "fashion",
    description: "Iconic basketball sneakers with premium leather upper",
    currentPrices: [
      { marketplace: "Amazon India", price: 16995, url: "#" },
      { marketplace: "Flipkart", price: 17499, url: "#" },
      { marketplace: "Myntra", price: 15995, url: "#" },
    ],
    lowestPrice: 15995,
    highestPrice: 17499,
    averagePrice: 16830,
    priceHistory: generatePriceHistory(18995, 15995),
    rating: 4.5,
    reviewCount: 3421,
  },
  {
    id: "7",
    name: "Himalaya Neem Face Wash 200ml",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
    category: "beauty",
    description: "Purifying face wash with neem and turmeric for clear skin",
    currentPrices: [
      { marketplace: "Amazon India", price: 199, url: "#" },
      { marketplace: "Flipkart", price: 185, url: "#" },
      { marketplace: "Myntra", price: 210, url: "#" },
    ],
    lowestPrice: 185,
    highestPrice: 210,
    averagePrice: 198,
    priceHistory: generatePriceHistory(249, 185),
    rating: 4.3,
    reviewCount: 89432,
  },
  {
    id: "8",
    name: "Yonex Nanoray 10F Badminton Racket",
    image: "https://images.unsplash.com/photo-1617883861744-13b534e3b928?w=400&h=400&fit=crop",
    category: "sports",
    description: "Lightweight racket for beginners with isometric head shape",
    currentPrices: [
      { marketplace: "Amazon India", price: 2290, url: "#" },
      { marketplace: "Flipkart", price: 2150, url: "#" },
    ],
    lowestPrice: 2150,
    highestPrice: 2290,
    averagePrice: 2220,
    priceHistory: generatePriceHistory(2990, 2150),
    rating: 4.4,
    reviewCount: 5621,
  },
];

function generatePriceHistory(startPrice: number, endPrice: number): PricePoint[] {
  const history: PricePoint[] = [];
  const days = 30;
  const priceRange = startPrice - endPrice;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const randomFactor = Math.random() * 0.15 - 0.075;
    const trend = (i / days) * priceRange;
    const price = Math.round(endPrice + trend + (startPrice * randomFactor));
    
    history.push({
      date: date.toISOString().split("T")[0],
      price,
      marketplace: marketplaces[Math.floor(Math.random() * 4)].name,
    });
  }
  
  return history;
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

export const calculateSavings = (highest: number, lowest: number): number => {
  return Math.round(((highest - lowest) / highest) * 100);
};

export const trendingSearches = [
  "iPhone 15",
  "Redmi Note 13",
  "Air Fryer",
  "Running Shoes",
  "Smart Watch",
  "Wireless Earbuds",
];

export const indianNames = [
  "Rahul Sharma",
  "Priya Patel",
  "Amit Kumar",
  "Sneha Gupta",
  "Vikram Singh",
  "Ananya Reddy",
  "Rohan Mehta",
  "Kavita Nair",
];
