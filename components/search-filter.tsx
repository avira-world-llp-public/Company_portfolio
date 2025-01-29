"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchFilterProps {
  onSearch: (query: string) => void
}

export default function SearchFilter({ onSearch }: SearchFilterProps) {
  return (
    <div className="relative mb-8">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
      <Input
        type="search"
        placeholder="Search products..."
        className="pl-10 bg-white/90 backdrop-blur-sm"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
}

