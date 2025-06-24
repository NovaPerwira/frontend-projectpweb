// API Types
export interface ApiProduct {
  id: number
  title: string
  description: string
  thumbnail: string | null
  slug: string
  price: string
  created_at: string
  category_id: number
}

export interface Product {
  id: number
  name: string
  description: string
  longDescription?: string
  price: number
  category: string
  image: string
  rating: number
  isNew?: boolean
  features?: string[]
  slug: string
  created_at: string
}

// Category mapping
const categoryMap: Record<number, string> = {
  1: "accessories",
  2: "nft",
  3: "wear",
}

// Transform API product to our product format
export const transformApiProduct = (apiProduct: ApiProduct): Product => {
  const isNew = new Date(apiProduct.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // New if created within 7 days

  return {
    id: apiProduct.id,
    name: apiProduct.title,
    description: apiProduct.description,
    longDescription: `${apiProduct.description} This premium ${categoryMap[apiProduct.category_id] || "product"} item is crafted with attention to detail and quality. Perfect for those who appreciate fine craftsmanship and modern design.`,
    price: Number.parseFloat(apiProduct.price),
    category: categoryMap[apiProduct.category_id] || "accessories",
    image: apiProduct.thumbnail || "/placeholder.svg?height=400&width=400",
    rating: Math.round((Math.random() * 2 + 3.5) * 10) / 10, // Random rating between 3.5-5.5
    isNew,
    features: getDefaultFeatures(categoryMap[apiProduct.category_id] || "accessories"),
    slug: apiProduct.slug,
    created_at: apiProduct.created_at,
  }
}

// Get default features based on category
const getDefaultFeatures = (category: string): string[] => {
  switch (category) {
    case "accessories":
      return [
        "Premium quality materials",
        "Fast shipping available",
        "30-day return policy",
        "Customer support included",
      ]
    case "nft":
      return ["Blockchain verified", "Unique digital asset", "Transferable ownership", "Community access"]
    case "wear":
      return ["High-quality fabric", "Comfortable fit", "Durable construction", "Modern design"]
    default:
      return ["Premium quality", "Fast shipping", "30-day return policy", "Customer support"]
  }
}

// API Functions
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    console.log("Fetching products from API...")

    const response = await fetch("https://backend-projectpweb.kesug.com/api/products.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add CORS headers if needed
        "Access-Control-Allow-Origin": "*",
      },
      // Add cache control
      cache: "no-store",
    })

    console.log("API Response status:", response.status)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log("API Response data:", data)

    // Handle different response formats
    let apiProducts: ApiProduct[] = []

    if (Array.isArray(data)) {
      apiProducts = data
    } else if (data.data && Array.isArray(data.data)) {
      apiProducts = data.data
    } else if (data.products && Array.isArray(data.products)) {
      apiProducts = data.products
    } else {
      console.warn("Unexpected API response format:", data)
      throw new Error("Invalid API response format")
    }

    console.log("Parsed products:", apiProducts.length)

    const transformedProducts = apiProducts.map(transformApiProduct)
    console.log("Transformed products:", transformedProducts.length)

    return transformedProducts
  } catch (error) {
    console.error("Error fetching products:", error)

    // Return fallback data if API fails
    console.log("Using fallback products due to API error")
    return getFallbackProducts()
  }
}

export const fetchProductById = async (id: number): Promise<Product | null> => {
  try {
    console.log(`Fetching product by ID: ${id}`)

    const response = await fetch(`http://project-revisi.test:8080/api/products.php?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log("Single product API response:", data)

    // Handle different response formats for single product
    let apiProduct: ApiProduct | null = null

    if (data.id) {
      apiProduct = data
    } else if (data.data && data.data.id) {
      apiProduct = data.data
    } else if (data.product && data.product.id) {
      apiProduct = data.product
    }

    if (!apiProduct) {
      console.warn("Product not found in API response")
      return null
    }

    return transformApiProduct(apiProduct)
  } catch (error) {
    console.error("Error fetching product by ID:", error)
    return null
  }
}

export const fetchProductBySlug = async (slug: string): Promise<Product | null> => {
  try {
    console.log(`Fetching product by slug: ${slug}`)

    const response = await fetch(`http://project-revisi.test:8080/api/products.php?slug=${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log("Product by slug API response:", data)

    // Handle different response formats for single product
    let apiProduct: ApiProduct | null = null

    if (data.id) {
      apiProduct = data
    } else if (data.data && data.data.id) {
      apiProduct = data.data
    } else if (data.product && data.product.id) {
      apiProduct = data.product
    }

    if (!apiProduct) {
      console.warn("Product not found by slug in API response")
      return null
    }

    return transformApiProduct(apiProduct)
  } catch (error) {
    console.error("Error fetching product by slug:", error)
    return null
  }
}

// Fallback products for when API is not available
const getFallbackProducts = (): Product[] => [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
    longDescription:
      "Experience audio like never before with our premium wireless headphones. Featuring advanced noise cancellation technology, crystal-clear sound quality, and comfortable over-ear design for extended listening sessions.",
    price: 299.99,
    category: "accessories",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.8,
    isNew: true,
    features: [
      "Active noise cancellation",
      "30-hour battery life",
      "Premium leather padding",
      "Bluetooth 5.0 connectivity",
    ],
    slug: "premium-wireless-headphones",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracking with heart rate monitoring and GPS functionality.",
    longDescription:
      "Stay on top of your fitness goals with our advanced smart fitness watch. Features comprehensive health monitoring, GPS tracking, and long-lasting battery life.",
    price: 249.99,
    category: "accessories",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.6,
    features: ["Heart rate monitoring", "GPS tracking", "Water resistant", "7-day battery life"],
    slug: "smart-fitness-watch",
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    name: "Digital Art Collection #001",
    description: "Exclusive digital artwork by renowned crypto artist featuring abstract geometric patterns.",
    longDescription:
      "Own a piece of digital art history with this exclusive NFT collection. Each piece is uniquely crafted and verified on the blockchain.",
    price: 0.5,
    category: "nft",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.9,
    isNew: true,
    features: ["Unique digital artwork", "Blockchain verified", "High resolution", "Artist signed"],
    slug: "digital-art-collection-001",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    name: "Premium Cotton T-Shirt",
    description: "Ultra-soft premium cotton t-shirt with modern fit and sustainable materials.",
    longDescription:
      "Experience comfort and style with our premium cotton t-shirt. Made from 100% organic cotton with a modern fit that's perfect for any occasion.",
    price: 39.99,
    category: "wear",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.7,
    isNew: true,
    features: ["100% organic cotton", "Modern fit", "Sustainable materials", "Pre-shrunk fabric"],
    slug: "premium-cotton-t-shirt",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 5,
    name: "Luxury Leather Wallet",
    description: "Handcrafted genuine leather wallet with RFID protection and premium finish.",
    longDescription:
      "Protect your cards and cash in style with our luxury leather wallet. Features RFID protection and premium craftsmanship.",
    price: 89.99,
    category: "accessories",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.9,
    features: ["Genuine leather construction", "RFID protection", "Multiple card slots", "Compact design"],
    slug: "luxury-leather-wallet",
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 6,
    name: "Designer Hoodie",
    description: "Stylish designer hoodie with premium materials and contemporary design.",
    longDescription:
      "Stay comfortable and stylish with our designer hoodie. Made from premium materials with a contemporary design that's perfect for any season.",
    price: 89.99,
    category: "wear",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.8,
    features: ["Premium materials", "Contemporary design", "Comfortable fit", "Durable construction"],
    slug: "designer-hoodie",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

// Keep the rest of the siteData as is
export const siteData = {
  // Site Information
  siteName: "NextGen Marketplace",
  tagline: "The Future of E-commerce",

  // Why Choose Us Section
  whyChooseUs: [
    {
      icon: "zap",
      title: "Lightning Fast",
      description: "Experience blazing fast loading times and seamless navigation with our optimized platform.",
    },
    {
      icon: "shield",
      title: "Secure & Safe",
      description: "Your data and transactions are protected with enterprise-grade security measures.",
    },
    {
      icon: "truck",
      title: "Free Shipping",
      description: "Enjoy free shipping on all orders with fast delivery to your doorstep.",
    },
    {
      icon: "star",
      title: "Premium Quality",
      description: "Every product is carefully curated to ensure the highest quality and authenticity.",
    },
  ],

  // NFT Information
  nftInfo: {
    description:
      "Non-Fungible Tokens (NFTs) are unique digital assets that represent ownership of digital content on the blockchain. Each NFT is one-of-a-kind and cannot be replicated, making them perfect for digital art, collectibles, and exclusive content.",
    benefits: [
      "Proof of authentic ownership",
      "Blockchain-verified authenticity",
      "Potential for value appreciation",
      "Access to exclusive communities",
      "Transferable digital ownership",
    ],
  },

  // About Us Information
  aboutUs: {
    story:
      "Founded in 2024, NextGen Marketplace emerged from a vision to revolutionize online shopping by combining cutting-edge technology with exceptional user experience. We believe in the power of innovation to transform how people discover, purchase, and interact with products in the digital age.",
    mission:
      "To create the most innovative and user-friendly e-commerce platform that bridges the gap between traditional retail and the digital future, offering premium products and NFTs with unmatched customer service.",
    vision:
      "To become the world's leading marketplace for next-generation products, where technology meets creativity, and every customer enjoys a seamless, secure, and delightful shopping experience.",
    values: [
      {
        icon: "users",
        title: "Customer First",
        description:
          "Every decision we make is centered around delivering exceptional value and experience to our customers.",
      },
      {
        icon: "award",
        title: "Quality Excellence",
        description:
          "We maintain the highest standards in product curation, platform performance, and customer service.",
      },
      {
        icon: "target",
        title: "Innovation",
        description: "We continuously push boundaries and embrace new technologies to stay ahead of the curve.",
      },
      {
        icon: "globe",
        title: "Sustainability",
        description: "We're committed to responsible business practices and supporting a sustainable future.",
      },
    ],
    team: [
      {
        name: "Alex Johnson",
        role: "CEO & Founder",
        bio: "Visionary leader with 15+ years in e-commerce and technology innovation.",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        name: "Sarah Chen",
        role: "CTO",
        bio: "Tech expert specializing in blockchain technology and scalable web platforms.",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        name: "Marcus Rodriguez",
        role: "Head of Design",
        bio: "Creative director focused on user experience and modern design principles.",
        image: "/placeholder.svg?height=300&width=300",
      },
    ],
  },
}
