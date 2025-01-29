"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface FeatureCardProps {
  icon: string
  title: string
  description?: string
  delay?: number
  primaryColor: string
  secondaryColor: string
}

export default function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
  primaryColor,
  secondaryColor,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card className="h-full bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="w-12 h-12 mb-4">
            <Image src={icon || "/placeholder.svg"} alt={title} width={48} height={48} className="object-contain" />
          </div>
          <h3 className="font-semibold mb-2" style={{ color: primaryColor }}>
            {title}
          </h3>
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </CardContent>
      </Card>
    </motion.div>
  )
}

