export interface Product {
  id: string;
  name: string;
  category: 'electronics' | 'fashion' | 'grocery' | 'beauty' | 'home';
  platform: 'amazon' | 'flipkart' | 'myntra' | 'blinkit' | 'zepto' | 'instamart' | 'ajio' | 'nykaa';
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  inStock: boolean;
  deliveryTime?: string;
  priceHistory: { date: string; price: number }[];
  aiScore: number;
  aiRecommendation: string;
  alternatives?: string[];
  tags?: string[];
  affiliateLink?: string; // Added for affiliate marketing
  productUrl?: string; // Direct product URL
}

export const products: Product[] = [
  // Electronics
  {
    id: "1",
    name: "MacBook Air M2",
    category: "electronics",
    platform: "amazon",
    price: 99900,
    originalPrice: 119900,
    rating: 4.7,
    reviews: 2453,
    image: "laptop computer workspace",
    description: "13.6-inch Liquid Retina display, 8GB RAM, 256GB SSD",
    inStock: true,
    deliveryTime: "2 days",
    priceHistory: [
      { date: "2026-01-14", price: 119900 },
      { date: "2026-01-28", price: 114900 },
      { date: "2026-02-11", price: 109900 },
      { date: "2026-02-25", price: 104900 },
      { date: "2026-03-11", price: 99900 },
    ],
    aiScore: 8.2,
    aiRecommendation: "Excellent deal - price is near historical low. Good time to buy!",
    alternatives: ["2", "3"],
    tags: ["Trending", "Best Price"]
  },
  {
    id: "2",
    name: "MacBook Air M2",
    category: "electronics",
    platform: "flipkart",
    price: 102900,
    originalPrice: 119900,
    rating: 4.6,
    reviews: 1823,
    image: "laptop computer workspace",
    description: "13.6-inch Liquid Retina display, 8GB RAM, 256GB SSD",
    inStock: true,
    deliveryTime: "3 days",
    priceHistory: [
      { date: "2026-01-14", price: 119900 },
      { date: "2026-01-28", price: 115900 },
      { date: "2026-02-11", price: 110900 },
      { date: "2026-02-25", price: 106900 },
      { date: "2026-03-11", price: 102900 },
    ],
    aiScore: 7.5,
    aiRecommendation: "₹3,000 more expensive than Amazon. Consider buying from Amazon instead.",
    tags: ["Available"]
  },
  {
    id: "3",
    name: "Dell XPS 13",
    category: "electronics",
    platform: "amazon",
    price: 89900,
    originalPrice: 109900,
    rating: 4.5,
    reviews: 1567,
    image: "modern laptop computer",
    description: "13.4-inch FHD+ display, Intel i7, 16GB RAM, 512GB SSD",
    inStock: true,
    deliveryTime: "1 day",
    priceHistory: [
      { date: "2026-01-14", price: 109900 },
      { date: "2026-01-28", price: 104900 },
      { date: "2026-02-11", price: 99900 },
      { date: "2026-02-25", price: 94900 },
      { date: "2026-03-11", price: 89900 },
    ],
    aiScore: 8.5,
    aiRecommendation: "Great alternative to MacBook. Better specs for lower price!",
    tags: ["Best Value", "Fast Delivery"]
  },
  {
    id: "4",
    name: "Sony WH-1000XM5",
    category: "electronics",
    platform: "amazon",
    price: 26990,
    originalPrice: 34990,
    rating: 4.8,
    reviews: 5432,
    image: "headphones black premium",
    description: "Premium noise cancelling headphones with 30hr battery",
    inStock: true,
    deliveryTime: "1 day",
    priceHistory: [
      { date: "2026-01-14", price: 34990 },
      { date: "2026-01-28", price: 32990 },
      { date: "2026-02-11", price: 30990 },
      { date: "2026-02-25", price: 28990 },
      { date: "2026-03-11", price: 26990 },
    ],
    aiScore: 9.1,
    aiRecommendation: "Excellent deal! Price dropped 23% from launch. Highly recommended.",
    tags: ["Trending", "Best Price", "Top Rated"]
  },

  // Fashion
  {
    id: "5",
    name: "Nike Air Max 270",
    category: "fashion",
    platform: "myntra",
    price: 5999,
    originalPrice: 7995,
    rating: 4.4,
    reviews: 3421,
    image: "nike sneakers running shoes",
    description: "Men's running shoes with Max Air cushioning",
    inStock: true,
    deliveryTime: "3 days",
    priceHistory: [
      { date: "2026-01-14", price: 7995 },
      { date: "2026-01-28", price: 7495 },
      { date: "2026-02-11", price: 6995 },
      { date: "2026-02-25", price: 6495 },
      { date: "2026-03-11", price: 5999 },
    ],
    aiScore: 7.3,
    aiRecommendation: "Current price is 20% above average. Wait for seasonal sale expected in April.",
    tags: ["Sale", "Fashion"]
  },
  {
    id: "6",
    name: "Levi's 511 Slim Fit Jeans",
    category: "fashion",
    platform: "myntra",
    price: 2499,
    originalPrice: 3999,
    rating: 4.6,
    reviews: 8765,
    image: "blue denim jeans",
    description: "Classic slim fit jeans in dark wash",
    inStock: true,
    deliveryTime: "2 days",
    priceHistory: [
      { date: "2026-01-14", price: 3999 },
      { date: "2026-01-28", price: 3499 },
      { date: "2026-02-11", price: 2999 },
      { date: "2026-02-25", price: 2749 },
      { date: "2026-03-11", price: 2499 },
    ],
    aiScore: 8.7,
    aiRecommendation: "Great price! 38% off - Best deal in 6 months.",
    tags: ["Best Price", "Popular"]
  },
  {
    id: "7",
    name: "Nike Air Max 270",
    category: "fashion",
    platform: "ajio",
    price: 6499,
    originalPrice: 7995,
    rating: 4.3,
    reviews: 2156,
    image: "nike sneakers running shoes",
    description: "Men's running shoes with Max Air cushioning",
    inStock: true,
    deliveryTime: "4 days",
    priceHistory: [
      { date: "2026-01-14", price: 7995 },
      { date: "2026-01-28", price: 7495 },
      { date: "2026-02-11", price: 6995 },
      { date: "2026-02-25", price: 6745 },
      { date: "2026-03-11", price: 6499 },
    ],
    aiScore: 6.8,
    aiRecommendation: "₹500 more expensive than Myntra. Buy from Myntra for better value.",
    tags: ["Available"]
  },

  // Groceries
  {
    id: "8",
    name: "Amul Taaza Milk 1L",
    category: "grocery",
    platform: "blinkit",
    price: 68,
    rating: 4.7,
    reviews: 12453,
    image: "milk carton fresh",
    description: "Fresh toned milk, homogenised",
    inStock: true,
    deliveryTime: "10 mins",
    priceHistory: [
      { date: "2026-02-25", price: 66 },
      { date: "2026-03-04", price: 67 },
      { date: "2026-03-11", price: 68 },
    ],
    aiScore: 7.5,
    aiRecommendation: "Standard price. Zepto offers ₹3 cheaper with similar delivery time.",
    tags: ["Quick Delivery"]
  },
  {
    id: "9",
    name: "Amul Taaza Milk 1L",
    category: "grocery",
    platform: "zepto",
    price: 65,
    rating: 4.6,
    reviews: 9876,
    image: "milk carton fresh",
    description: "Fresh toned milk, homogenised",
    inStock: true,
    deliveryTime: "12 mins",
    priceHistory: [
      { date: "2026-02-25", price: 64 },
      { date: "2026-03-04", price: 64 },
      { date: "2026-03-11", price: 65 },
    ],
    aiScore: 9.2,
    aiRecommendation: "Best price! ₹3-7 cheaper than competitors. Recommended.",
    tags: ["Best Price", "Quick Delivery"]
  },
  {
    id: "10",
    name: "Amul Taaza Milk 1L",
    category: "grocery",
    platform: "instamart",
    price: 72,
    rating: 4.5,
    reviews: 7654,
    image: "milk carton fresh",
    description: "Fresh toned milk, homogenised",
    inStock: true,
    deliveryTime: "15 mins",
    priceHistory: [
      { date: "2026-02-25", price: 70 },
      { date: "2026-03-04", price: 71 },
      { date: "2026-03-11", price: 72 },
    ],
    aiScore: 6.3,
    aiRecommendation: "₹7 more expensive than Zepto. Not recommended unless urgent.",
    tags: ["Available"]
  },
  {
    id: "11",
    name: "Fortune Sunflower Oil 1L",
    category: "grocery",
    platform: "blinkit",
    price: 185,
    rating: 4.6,
    reviews: 5432,
    image: "cooking oil bottle",
    description: "Refined sunflower oil",
    inStock: true,
    deliveryTime: "10 mins",
    priceHistory: [
      { date: "2026-02-25", price: 189 },
      { date: "2026-03-04", price: 187 },
      { date: "2026-03-11", price: 185 },
    ],
    aiScore: 8.4,
    aiRecommendation: "Good price. Similar across all platforms.",
    tags: ["Quick Delivery"]
  },
  {
    id: "12",
    name: "Britannia Bread 400g",
    category: "grocery",
    platform: "zepto",
    price: 35,
    rating: 4.5,
    reviews: 8765,
    image: "bread loaf fresh",
    description: "Fresh white bread",
    inStock: true,
    deliveryTime: "12 mins",
    priceHistory: [
      { date: "2026-02-25", price: 35 },
      { date: "2026-03-04", price: 35 },
      { date: "2026-03-11", price: 35 },
    ],
    aiScore: 8.0,
    aiRecommendation: "Standard price across all quick commerce platforms.",
    tags: ["Quick Delivery"]
  },

  // Beauty
  {
    id: "13",
    name: "Maybelline Fit Me Foundation",
    category: "beauty",
    platform: "nykaa",
    price: 399,
    originalPrice: 599,
    rating: 4.4,
    reviews: 6543,
    image: "makeup foundation bottle",
    description: "Matte + Poreless foundation, shade 220",
    inStock: true,
    deliveryTime: "3 days",
    priceHistory: [
      { date: "2026-01-14", price: 599 },
      { date: "2026-01-28", price: 549 },
      { date: "2026-02-11", price: 499 },
      { date: "2026-02-25", price: 449 },
      { date: "2026-03-11", price: 399 },
    ],
    aiScore: 8.9,
    aiRecommendation: "Great deal! 33% off - lowest price in 3 months.",
    tags: ["Sale", "Beauty", "Best Price"]
  },
  {
    id: "14",
    name: "Lakme Eyeconic Kajal",
    category: "beauty",
    platform: "nykaa",
    price: 195,
    originalPrice: 225,
    rating: 4.6,
    reviews: 9876,
    image: "kajal eyeliner black",
    description: "Smudge-proof kajal, deep black",
    inStock: true,
    deliveryTime: "2 days",
    priceHistory: [
      { date: "2026-01-14", price: 225 },
      { date: "2026-01-28", price: 215 },
      { date: "2026-02-11", price: 205 },
      { date: "2026-02-25", price: 200 },
      { date: "2026-03-11", price: 195 },
    ],
    aiScore: 8.5,
    aiRecommendation: "Good price. Popular product with consistent quality.",
    tags: ["Popular", "Beauty"]
  },

];

export const platforms = [
  {
    id: 'amazon',
    name: 'Amazon',
    category: 'E-commerce',
    logo: '📦',
    color: 'bg-orange-500',
    description: 'Wide range of electronics, books, and household items',
  },
  {
    id: 'flipkart',
    name: 'Flipkart',
    category: 'E-commerce',
    logo: '🛒',
    color: 'bg-blue-500',
    description: 'Indian e-commerce marketplace for all categories',
  },
  {
    id: 'myntra',
    name: 'Myntra',
    category: 'Fashion',
    logo: '👗',
    color: 'bg-pink-500',
    description: 'Fashion and lifestyle products',
  },
  {
    id: 'ajio',
    name: 'Ajio',
    category: 'Fashion',
    logo: '👔',
    color: 'bg-purple-500',
    description: 'Fashion and lifestyle from Reliance',
  },
  {
    id: 'blinkit',
    name: 'Blinkit',
    category: 'Quick Commerce',
    logo: '⚡',
    color: 'bg-yellow-500',
    description: 'Groceries delivered in 10 minutes',
  },
  {
    id: 'zepto',
    name: 'Zepto',
    category: 'Quick Commerce',
    logo: '🚀',
    color: 'bg-indigo-500',
    description: 'Ultra-fast grocery delivery',
  },
  {
    id: 'instamart',
    name: 'Instamart',
    category: 'Quick Commerce',
    logo: '🏪',
    color: 'bg-teal-500',
    description: 'Swiggy\'s instant grocery service',
  },
  {
    id: 'nykaa',
    name: 'Nykaa',
    category: 'Beauty',
    logo: '💄',
    color: 'bg-rose-500',
    description: 'Beauty and cosmetics specialist',
  },
];