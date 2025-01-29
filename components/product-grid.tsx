"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface Product {
  id: number
  title: string
  description: string
  image: string
  category: string
  colors: {
    primary: string
    secondary: string
    gradient: string
    card: string
  }
  details: {
    title: string
    description: string
    features: string[]
    technologies: string[]
  }
}

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products = [] }: ProductGridProps) {
  const router = useRouter()
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  if (!products || products.length === 0) {
    return <div className="text-center text-white py-8">No products found</div>
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <AnimatePresence>
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            layout
            onHoverStart={() => setHoveredId(product.id)}
            onHoverEnd={() => setHoveredId(null)}
          >
            <Card
              className={`cursor-pointer overflow-hidden border-none shadow-lg transition-all duration-500 ${product.colors.card} ${
                hoveredId === product.id ? "shadow-2xl" : ""
              }`}
              onClick={() => router.push(`/products/${product.id}`)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  {/* Decorative patterns */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-grid-white/10" />
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-xl" />
                  </div>

                  <div
                    className={`relative aspect-[3/4] p-8 ${hoveredId === product.id ? "scale-105" : "scale-100"} transition-transform duration-500`}
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${product.colors.primary}33, ${product.colors.secondary}33)`,
                      }}
                    />
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className={`object-contain transition-all duration-300 ${
                        hoveredId === product.id ? "opacity-100 scale-105" : "opacity-90 scale-100"
                      }`}
                    />

                    {/* Floating shapes */}
                    <motion.div
                      className="absolute top-4 right-4 w-12 h-12 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${product.colors.primary}, ${product.colors.secondary})`,
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    />
                    <motion.div
                      className="absolute bottom-4 left-4 w-8 h-8"
                      style={{
                        background: product.colors.primary,
                        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                      }}
                      animate={{
                        rotate: [0, 180, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    />
                  </div>
                </div>

                <motion.div
                  className="p-6 relative"
                  initial={false}
                  animate={{
                    backgroundColor: hoveredId === product.id ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <motion.h3 className="text-xl font-bold mb-2" style={{ color: product.colors.primary }}>
                    {product.title}
                  </motion.h3>
                  <p className="text-sm text-gray-600 mb-4">{product.description}</p>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: hoveredId === product.id ? 1 : 0,
                      x: hoveredId === product.id ? 0 : -20,
                    }}
                    className="flex items-center text-sm font-medium"
                    style={{ color: product.colors.primary }}
                  >
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

