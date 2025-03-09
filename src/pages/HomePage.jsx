"use client"

import { useState, useEffect } from "react"
import { getGames } from "../services/gameService"
import GameCard from "../components/GameCard"
import Pagination from "../components/Pagination"
import SearchBar from "../components/SearchBar"
import LoadingSpinner from "../components/LoadingSpinner"

const HomePage = () => {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const pageSize = 12

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true)
        const data = await getGames(currentPage, pageSize, searchTerm)
        setGames(data.results)
        setTotalPages(Math.ceil(data.count / pageSize))
        setLoading(false)
      } catch (err) {
        setError("Error al cargar los videojuegos. Por favor, inténtalo de nuevo más tarde.")
        setLoading(false)
      }
    }

    fetchGames()
  }, [currentPage, searchTerm])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0)
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
    setCurrentPage(1)
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Explora Videojuegos</h2>

      <SearchBar onSearch={handleSearch} placeholder="Buscar videojuegos..." />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>

          {games.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-600">No se encontraron videojuegos que coincidan con tu búsqueda.</p>
            </div>
          )}

          {games.length > 0 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          )}
        </>
      )}
    </div>
  )
}

export default HomePage

