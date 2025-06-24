"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Target, Award, Globe, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { siteData } from "@/lib/data"
import Navbar from "@/components/navbar"
import Chatbot from "@/components/chatbot"

export default function AboutPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            About NextGen Marketplace
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Pioneering the future of e-commerce with innovative technology and exceptional customer experience
          </motion.p>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-16">
        {/* Our Story */}
        <motion.section
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Story</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{siteData.aboutUs.story}</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Our team"
                className="rounded-2xl shadow-xl w-full"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800">Founded on Innovation</h3>
              <p className="text-gray-600 leading-relaxed">
                Since our inception, we've been committed to revolutionizing the online shopping experience. Our
                platform combines cutting-edge technology with user-centric design to create a marketplace that's not
                just functional, but truly exceptional.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From premium accessories to exclusive NFTs and trendy wear, we curate products that represent the future
                of commerce. Every item in our catalog is selected with care, ensuring our customers receive only the
                highest quality products.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Mission & Vision */}
        <motion.section
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
              <Card className="h-full bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-gray-800">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{siteData.aboutUs.mission}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-gray-800">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{siteData.aboutUs.vision}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Values */}
        <motion.section
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteData.aboutUs.values.map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center h-full hover:shadow-xl transition-all duration-300 border-0 bg-white">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      {value.icon === "users" && <Users className="w-8 h-8 text-white" />}
                      {value.icon === "award" && <Award className="w-8 h-8 text-white" />}
                      {value.icon === "target" && <Target className="w-8 h-8 text-white" />}
                      {value.icon === "globe" && <Globe className="w-8 h-8 text-white" />}
                    </div>
                    <CardTitle className="text-xl text-gray-800">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team */}
        <motion.section
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The passionate individuals behind NextGen Marketplace</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteData.aboutUs.team.map((member, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden">
                  <div className="relative">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">{member.name}</CardTitle>
                    <Badge variant="secondary" className="mx-auto">
                      {member.role}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600">We'd love to hear from you</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div variants={itemVariants}>
              <Card className="text-center h-full hover:shadow-xl transition-all duration-300 border-0 bg-white">
                <CardHeader>
                  <div className="w-12 h-12 mx-auto mb-4 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-800">Email Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Send us a message anytime</p>
                  <p className="font-medium text-blue-600">hello@nextgenmarketplace.com</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="text-center h-full hover:shadow-xl transition-all duration-300 border-0 bg-white">
                <CardHeader>
                  <div className="w-12 h-12 mx-auto mb-4 bg-green-600 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-800">Call Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Mon-Fri 9AM-6PM EST</p>
                  <p className="font-medium text-green-600">+1 (555) 123-4567</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="text-center h-full hover:shadow-xl transition-all duration-300 border-0 bg-white">
                <CardHeader>
                  <div className="w-12 h-12 mx-auto mb-4 bg-purple-600 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-800">Visit Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Our headquarters</p>
                  <p className="font-medium text-purple-600">123 Innovation St, Tech City, TC 12345</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div className="text-center" variants={itemVariants}>
            <Link href="/products">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg">
                Start Shopping
              </Button>
            </Link>
          </motion.div>
        </motion.section>
      </div>

      <Chatbot />
    </div>
  )
}
