"use client"

import { Button } from "@/components/ui/button"
import * as Icons from "lucide-react"
import { cn } from "@/lib/utils"

interface Category {
  id: string
  name: string
  icon: string
}

interface CategoryFilterProps {
  categories: Category[]
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
}

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
      {categories.map((category) => {
        const Icon = Icons[category.icon as keyof typeof Icons]
        return (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className={cn("whitespace-nowrap", activeCategory === category.id && "bg-white text-purple-600")}
            onClick={() => onCategoryChange(category.id)}
          >
            {Icon && <Icon className="w-4 h-4 mr-2" />}
            {category.name}
          </Button>
        )
      })}
    </div>
  )
}

