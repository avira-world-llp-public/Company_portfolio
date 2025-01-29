"use client"

import { useState, useEffect } from "react"
import { products } from "@/data/data1"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Check, Star } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import FeatureCard from "@/components/feature-card"
import AppCarousel from "@/components/app-carousel"
import { Card, CardContent } from "@/components/ui/card"

const dummyReviews = [
  {
    id: 1,
    name: "John Doe",
    company: "Tech Innovators",
    content: "This app revolutionized our delivery process. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Jane Smith",
    company: "FoodEx",
    content: "Great features and excellent customer support. A game-changer for our business.",
    rating: 4,
  },
  {
    id: 3,
    name: "Mike Johnson",
    company: "QuickServe",
    content: "Intuitive interface and powerful backend. Exactly what we needed.",
    rating: 5,
  },
]

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState(products.find((p) => p.id === Number.parseInt(params.id)))
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    if (!product) {
      notFound()
    }
  }, [product])

  if (!product) return null

  return (
    <div className={`min-h-screen ${product.colors.card}`}>
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-gradient-to-br opacity-20"
          style={{
            backgroundImage: `linear-gradient(135deg, ${product.colors.primary}, ${product.colors.secondary})`,
          }}
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      </div>
      {/* Hero Section */}
      <motion.div style={{ opacity, scale }} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90" />

        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 max-w-xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold"
                style={{ color: product.colors.primary }}
              >
                {product.details.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg opacity-90"
              >
                {product.details.description}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r shadow-lg hover:shadow-xl transition-shadow duration-300"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${product.colors.primary}, ${product.colors.secondary})`,
                    color: "white",
                  }}
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative h-[600px]"
            >
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-contain animate-float"
                priority
              />
              {/* Floating shapes */}
              <motion.div
                className="absolute top-4 right-4 w-16 h-16 rounded-full"
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
                className="absolute bottom-4 left-4 w-12 h-12"
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
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4" style={{ color: product.colors.primary }}>
              Key Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the powerful features that make {product.title} stand out from the competition
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.details.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div
                      className="w-12 h-12 rounded-full bg-gradient-to-br mb-4 flex items-center justify-center"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${product.colors.primary}, ${product.colors.secondary})`,
                      }}
                    >
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: product.colors.primary }}>
                      {feature}
                    </h3>
                    <p className="text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4" style={{ color: product.colors.primary }}>
              How {product.title} Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A simple and efficient process to streamline your operations
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {["Register", "Configure", "Launch"].map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <div
                    className="w-12 h-12 rounded-full bg-gradient-to-br mb-4 flex items-center justify-center text-white font-bold text-xl"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${product.colors.primary}, ${product.colors.secondary})`,
                    }}
                  >
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: product.colors.primary }}>
                    {step}
                  </h3>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Key Benefits Section */}
      <div className="py-20 bg-gradient-to-br from-white to-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4" style={{ color: product.colors.primary }}>
              Key Benefits
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover how {product.title} can transform your business operations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Increased Efficiency", description: "Streamline your processes and boost productivity" },
              { title: "Cost Savings", description: "Reduce operational costs and maximize ROI" },
              { title: "Enhanced User Experience", description: "Delight your customers with a seamless interface" },
              { title: "Real-time Analytics", description: "Make data-driven decisions with powerful insights" },
              { title: "Scalability", description: "Grow your business without worrying about infrastructure" },
              { title: "24/7 Support", description: "Get expert assistance whenever you need it" },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold mb-2" style={{ color: product.colors.primary }}>
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4" style={{ color: product.colors.primary }}>
              Cutting-Edge Tech Stack
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We use the latest technologies to ensure high performance, scalability, and security.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "React Native", icon: "/icons/react-native.svg" },
              { name: "Node.js", icon: "/icons/nodejs.svg" },
              { name: "MongoDB", icon: "/icons/mongodb.svg" },
              { name: "GraphQL", icon: "/icons/graphql.svg" },
              { name: "AWS", icon: "/icons/aws.svg" },
              { name: "Docker", icon: "/icons/docker.svg" },
              { name: "Kubernetes", icon: "/icons/kubernetes.svg" },
              { name: "Redis", icon: "/icons/redis.svg" },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 mb-4">
                  <Image src={tech.icon || "/placeholder.svg"} alt={tech.name} width={64} height={64} />
                </div>
                <p className="text-center font-semibold" style={{ color: product.colors.primary }}>
                  {tech.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4" style={{ color: product.colors.primary }}>
              What Our Clients Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from some of our satisfied customers!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {dummyReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">"{review.content}"</p>
                    <div>
                      <p className="font-semibold" style={{ color: product.colors.primary }}>
                        {review.name}
                      </p>
                      <p className="text-sm text-gray-500">{review.company}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${product.colors.primary}, ${product.colors.secondary})`,
        }}
      >
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-white opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers and take your business to the next level with {product.title}
          </p>
          <Button size="lg" variant="secondary" className="bg-white hover:bg-gray-100 text-gray-900">
            Request Demo
          </Button>
        </div>
        {/* Decorative elements */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/10"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-32 h-32"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          }}
          animate={{
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </motion.div>
      <div
        className="fixed w-64 h-64 rounded-full pointer-events-none mix-blend-multiply filter blur-xl opacity-30 bg-gradient-to-r from-pink-500 to-yellow-500"
        style={{
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
          transition: "left 0.2s ease-out, top 0.2s ease-out",
        }}
      />
    </div>
  )
}

