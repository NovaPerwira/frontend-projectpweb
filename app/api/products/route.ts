import { NextResponse } from "next/server"

// Mock API data with your structure
const mockProducts = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
    thumbnail: "/placeholder.svg?height=400&width=400",
    slug: "premium-wireless-headphones",
    price: "299.99",
    created_at: "2025-01-20 14:19:41",
    category_id: 1,
  },
  {
    id: 2,
    title: "Smart Fitness Watch",
    description: "Advanced fitness tracking with heart rate monitoring and GPS functionality.",
    thumbnail: "/placeholder.svg?height=400&width=400",
    slug: "smart-fitness-watch",
    price: "249.99",
    created_at: "2025-01-19 10:30:15",
    category_id: 1,
  },
  {
    id: 3,
    title: "Digital Art Collection #001",
    description: "Exclusive digital artwork by renowned crypto artist featuring abstract geometric patterns.",
    thumbnail: "/placeholder.svg?height=400&width=400",
    slug: "digital-art-collection-001",
    price: "0.5",
    created_at: "2025-01-18 16:45:22",
    category_id: 2,
  },
  {
    id: 4,
    title: "Premium Cotton T-Shirt",
    description: "Ultra-soft premium cotton t-shirt with modern fit and sustainable materials.",
    thumbnail: "/placeholder.svg?height=400&width=400",
    slug: "premium-cotton-t-shirt",
    price: "39.99",
    created_at: "2025-01-17 09:15:33",
    category_id: 3,
  },
  {
    id: 5,
    title: "Luxury Leather Wallet",
    description: "Handcrafted genuine leather wallet with RFID protection and premium finish.",
    thumbnail: "/placeholder.svg?height=400&width=400",
    slug: "luxury-leather-wallet",
    price: "89.99",
    created_at: "2025-01-16 13:22:44",
    category_id: 1,
  },
  {
    id: 6,
    title: "Cyber Punk Avatar #042",
    description: "Rare cyberpunk-themed avatar NFT with unique traits and accessories.",
    thumbnail: "/placeholder.svg?height=400&width=400",
    slug: "cyber-punk-avatar-042",
    price: "1.2",
    created_at: "2025-01-15 11:30:55",
    category_id: 2,
  },
]

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return NextResponse.json(mockProducts)
}
