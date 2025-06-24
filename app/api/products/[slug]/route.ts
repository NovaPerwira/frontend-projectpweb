import { NextResponse } from "next/server"

// Mock API data (same as above)
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
  // ... rest of the products
]

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const product = mockProducts.find((p) => p.slug === params.slug)

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  return NextResponse.json(product)
}
