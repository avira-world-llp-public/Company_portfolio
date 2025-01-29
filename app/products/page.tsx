"use client"

import { useState, useMemo } from "react"
import { products } from "@/data/data1"
import { categories } from "@/data/data2"
import ProductGrid from "@/components/product-grid"
import CategoryFilter from "@/components/category-filter"
import SearchFilter from "@/components/search-filter"
import FloatingShapes from "@/components/floating-shapes"

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory === "all" || product.category === activeCategory
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-purple-600">
      <FloatingShapes />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Products</h1>
          <p className="text-lg text-white/90">
            Explore our inventory of ready-to-sell mobile app products, engineered for your convenience
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <SearchFilter onSearch={setSearchQuery} />
        </div>

        <CategoryFilter categories={categories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  )
}

