"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Star, Zap, Shield, Truck, ArrowRight, Sparkles, TrendingUp, Award } from "lucide-react"
import Link from "next/link"
import { siteData, fetchProducts } from "@/lib/data"
import Navbar from "@/components/navbar"
import Chatbot from "@/components/chatbot"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const products = await fetchProducts()
        // Get featured products (first 6 products, prioritizing new ones)
        const featured = products
          .sort((a, b) => {
            // Prioritize new products
            if (a.isNew && !b.isNew) return -1
            if (!a.isNew && b.isNew) return 1
            // Then sort by rating
            return b.rating - a.rating
          })
          .slice(0, 6)
        setFeaturedProducts(featured)
      } catch (error) {
        console.error("Error loading featured products:", error)
        // Set empty array if API fails
        setFeaturedProducts([])
      }
    }

    loadFeaturedProducts()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Navbar />

      {/* Hero Section with Spline 3D Model */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-indigo-600/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          style={{ animationDelay: "4s" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              className="text-center lg:text-left space-y-8"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="space-y-4">
                <motion.div
                  className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-purple-200 shadow-lg"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Sparkles className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="text-sm font-medium text-purple-600">Welcome to the Future</span>
                </motion.div>

                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="gradient-text">NextGen</span>
                  <br />
                  <span className="text-gray-800">Marketplace</span>
                </h1>

                <p className="text-xl lg:text-2xl text-gray-600 max-w-2xl">
                  Discover the future of shopping with premium accessories, exclusive NFTs, and cutting-edge technology
                </p>
              </div>

              {/* Search Bar */}
              <motion.div
                className="flex max-w-2xl mx-auto lg:mx-0"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search for products, NFTs, accessories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-14 pl-12 pr-4 text-lg rounded-l-2xl border-0 bg-white/90 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <Button className="h-14 px-8 rounded-r-2xl btn-modern">
                  <Search className="w-6 h-6" />
                </Button>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Link href="/products">
                  <Button size="lg" className="btn-modern px-8 py-4 text-lg rounded-2xl">
                    Start Shopping <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-4 text-lg rounded-2xl border-2 hover:bg-purple-50"
                  >
                    Learn More
                  </Button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-3 gap-6 pt-8"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">10K+</div>
                  <div className="text-sm text-gray-600">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">50K+</div>
                  <div className="text-sm text-gray-600">Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">99%</div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Spline 3D Model */}
            <motion.div
              className="relative h-[600px] lg:h-[700px]"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="spline-container h-full w-full">
                <iframe
                  src="https://my.spline.design/genkubgreetingrobot-xPZ1T9fh3EomgQmjeB1nEhaq/"
                  frameBorder="0"
                  width="100%"
                  height="100%"
                  title="3D Robot Model"
                  loading="lazy"
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute top-10 right-10 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-float">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <div
                className="absolute bottom-20 left-10 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-float"
                style={{ animationDelay: "1s" }}
              >
                <Award className="w-6 h-6 text-blue-600" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section
        className="py-20 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-purple-600">Why Choose Us</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Experience the <span className="gradient-text">Future</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover why thousands of customers trust NextGen Marketplace for their premium shopping needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {siteData.whyChooseUs.map((reason, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full card-hover border-0 bg-gradient-to-br from-white to-gray-50 shadow-lg">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                      {reason.icon === "zap" && <Zap className="w-8 h-8 text-white" />}
                      {reason.icon === "shield" && <Shield className="w-8 h-8 text-white" />}
                      {reason.icon === "truck" && <Truck className="w-8 h-8 text-white" />}
                      {reason.icon === "star" && <Star className="w-8 h-8 text-white" />}
                    </div>
                    <CardTitle className="text-xl text-gray-800">{reason.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600 leading-relaxed">
                      {reason.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* About NFTs Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-purple-50 to-blue-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-16" variants={itemVariants}>
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-4 border border-purple-200">
                <Sparkles className="w-4 h-4 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-purple-600">Digital Innovation</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                Discover <span className="gradient-text">NFTs</span>
              </h2>
              <p className="text-xl text-gray-600">Enter the revolutionary world of Non-Fungible Tokens</p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={itemVariants}>
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-800">What are NFTs?</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{siteData.nftInfo.description}</p>

                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-gray-800">Key Benefits:</h4>
                    <ul className="space-y-3">
                      {siteData.nftInfo.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                  <h4 className="text-xl font-semibold text-gray-800 mb-6">Popular NFT Categories</h4>
                  <div className="space-y-4">
                    {["Digital Art", "Gaming Assets", "Music & Audio", "Virtual Real Estate", "Collectibles"].map(
                      (category, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100"
                        >
                          <span className="font-medium text-gray-700">{category}</span>
                          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
                            Popular
                          </Badge>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section
        className="py-20 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full mb-4">
              <Star className="w-4 h-4 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-purple-600">Featured Collection</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              <span className="gradient-text">Premium</span> Products
            </h2>
            <p className="text-xl text-gray-600">Discover our most popular items across all categories</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div key={product.id} variants={itemVariants}>
                <Link href={`/products/${product.id}`}>
                  <Card className="group card-hover border-0 bg-white shadow-lg overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
                        {product.category}
                      </Badge>
                      {product.isNew && (
                        <Badge className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
                          New
                        </Badge>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="group-hover:text-purple-600 transition-colors line-clamp-2">
                        {product.name}
                      </CardTitle>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold gradient-text">${product.price}</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div className="text-center mt-12" variants={itemVariants}>
            <Link href="/products">
              <Button size="lg" className="btn-modern px-8 py-4 text-lg rounded-2xl">
                View All Products <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section
        className="py-20 bg-gradient-to-r from-purple-600 to-blue-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="max-w-2xl mx-auto space-y-6"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Stay Updated with <span className="text-purple-200">NextGen</span>
            </h2>
            <p className="text-xl text-purple-100">
              Get the latest updates on new products, exclusive offers, and NFT drops
            </p>
            <div className="flex max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 rounded-l-xl border-0 bg-white/90"
              />
              <Button className="h-12 px-6 rounded-r-xl bg-white text-purple-600 hover:bg-gray-100">Subscribe</Button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <Chatbot />
    </div>
  )
}
