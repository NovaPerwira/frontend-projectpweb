"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ShoppingCart, Heart, Share2, Minus, Plus, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { fetchProducts, fetchProductById, fetchProductBySlug, type Product } from "@/lib/data"
import Navbar from "@/components/navbar"
import Chatbot from "@/components/chatbot"
import { useCart } from "@/hooks/use-cart"
import { toast } from "@/hooks/use-toast"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        setError(null)

        let foundProduct: Product | null = null

        if (typeof params.id === "string") {
          console.log("Loading product with ID/slug:", params.id)

          // Try to fetch by ID first (if it's a number)
          if (!isNaN(Number(params.id))) {
            console.log("Fetching by ID:", Number(params.id))
            foundProduct = await fetchProductById(Number(params.id))
          }

          // If not found by ID or it's not a number, try by slug
          if (!foundProduct) {
            console.log("Fetching by slug:", params.id)
            foundProduct = await fetchProductBySlug(params.id)
          }
        }

        if (foundProduct) {
          console.log("Product found:", foundProduct)
          setProduct(foundProduct)

          // Get related products from same category
          try {
            const allProducts = await fetchProducts()
            const related = allProducts
              .filter((p) => p.category === foundProduct.category && p.id !== foundProduct.id)
              .slice(0, 4)
            setRelatedProducts(related)
            console.log("Related products loaded:", related.length)
          } catch (relatedError) {
            console.error("Error loading related products:", relatedError)
            // Continue without related products
          }
        } else {
          console.log("Product not found")
          setError("Product not found")
        }
      } catch (err) {
        console.error("Error loading product:", err)
        setError("Failed to load product. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      loadProduct()
    }
  }, [params.id])

  // Add loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Loading Product...</h2>
            <p className="text-gray-600">Please wait while we fetch the product details.</p>
          </div>
        </div>
        <Chatbot />
      </div>
    )
  }

  // Add error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{error || "Product not found"}</h1>
          <p className="text-gray-600 mb-8">The product you're looking for might have been removed or doesn't exist.</p>
          <div className="space-x-4">
            <Link href="/products">
              <Button className="bg-blue-600 hover:bg-blue-700">Browse All Products</Button>
            </Link>
            <Button variant="outline" onClick={() => router.back()}>
              Go Back
            </Button>
          </div>
        </div>
        <Chatbot />
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    toast({
      title: "Added to cart",
      description: `${quantity} ${product.name} added to your cart`,
    })
  }

  const images = [product.image, product.image, product.image] // Simulate multiple images

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
                <img
                  src={images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-blue-600">{product.category}</Badge>
                {product.isNew && <Badge className="absolute top-4 right-4 bg-green-500">New</Badge>}
              </div>

              <div className="flex space-x-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? "border-blue-500" : "border-gray-200"
                    }`}
                  >
                    <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">({product.rating})</span>
                </div>
                <Badge variant="secondary">{product.category}</Badge>
                {product.isNew && <Badge className="bg-green-500 text-white">New</Badge>}
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </div>

            <div className="border-t border-b py-6">
              <div className="text-4xl font-bold text-green-600 mb-4">${product.price}</div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-gray-700 font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)} className="h-10 w-10">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button onClick={handleAddToCart} className="flex-1 bg-orange-500 hover:bg-orange-600 h-12 text-lg">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg" className="h-12">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="h-12">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Product Features */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">Key Features:</h3>
              <ul className="space-y-2">
                {product.features?.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                )) ||
                  [
                    "Premium quality materials",
                    "Fast shipping available",
                    "30-day return policy",
                    "Customer support included",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Product Meta */}
            <div className="text-sm text-gray-500 space-y-1">
              <p>Product ID: {product.id}</p>
              <p>SKU: {product.slug}</p>
              <p>Added: {new Date(product.created_at).toLocaleDateString()}</p>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {product.longDescription ||
                      `${product.description} This premium ${product.category} item is crafted with attention to detail and quality. Perfect for those who appreciate fine craftsmanship and modern design. Whether you're looking for functionality or style, this product delivers on both fronts.`}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Category:</span>
                        <span className="text-gray-600">{product.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Brand:</span>
                        <span className="text-gray-600">NextGen</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Rating:</span>
                        <span className="text-gray-600">{product.rating}/5</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Availability:</span>
                        <span className="text-green-600">In Stock</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Shipping:</span>
                        <span className="text-gray-600">Free</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Warranty:</span>
                        <span className="text-gray-600">1 Year</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="ml-2 font-medium">Customer {review}</span>
                          </div>
                          <span className="text-sm text-gray-500">2 days ago</span>
                        </div>
                        <p className="text-gray-600">
                          Great product! Exactly as described and fast shipping. Would definitely recommend to others.
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Related Products</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                        {relatedProduct.name}
                      </CardTitle>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-green-600">${relatedProduct.price}</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm text-gray-600">{relatedProduct.rating}</span>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <Chatbot />
    </div>
  )
}
