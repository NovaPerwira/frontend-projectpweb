"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react"

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your NextGen shopping assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("product") || lowerMessage.includes("item")) {
      return "I can help you find products! We have accessories, NFTs, and wear. What are you looking for specifically?"
    }

    if (lowerMessage.includes("shipping") || lowerMessage.includes("delivery")) {
      return "We offer free shipping on all orders! Standard delivery takes 3-5 business days, and express delivery is available for faster shipping."
    }

    if (lowerMessage.includes("return") || lowerMessage.includes("refund")) {
      return "We have a 30-day return policy. You can return any item in its original condition for a full refund. Would you like help with a return?"
    }

    if (lowerMessage.includes("nft")) {
      return "Our NFT collection features unique digital art, gaming assets, and collectibles. Each NFT comes with proof of ownership and authenticity. Would you like to browse our NFT category?"
    }

    if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
      return "Our products range from affordable accessories to premium NFTs. You can filter by price range on our products page. What's your budget?"
    }

    if (lowerMessage.includes("help") || lowerMessage.includes("support")) {
      return "I'm here to help! You can ask me about products, shipping, returns, or anything else. What do you need assistance with?"
    }

    return "Thanks for your message! I'm here to help with any questions about our products, shipping, returns, or account issues. What would you like to know?"
  }

  return (
    <>
      {/* Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-xl glow-effect"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 h-96"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Card className="h-full flex flex-col border-0 shadow-2xl bg-white/95 backdrop-blur-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    Shopping Assistant
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          message.isBot
                            ? "bg-gradient-to-r from-purple-50 to-blue-50 text-gray-800 border border-purple-100"
                            : "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.isBot && <Bot className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-600" />}
                          {!message.isBot && <User className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="border-t p-4 bg-gray-50/50">
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 border-0 bg-white shadow-sm"
                    />
                    <Button
                      type="submit"
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
