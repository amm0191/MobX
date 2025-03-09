"use client"

import { useState } from "react"

const SearchBar = ({ onSearch, placeholder = "Buscar..." }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 focus:outline-none"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 hover:bg-green-600 transition-colors">
          Buscar
        </button>
      </div>
    </form>
  )
}

export default SearchBar

