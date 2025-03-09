"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getGamesByTag, getTagDetails } from "../services/gameService"
import GameCard from "../components/GameCard"
import Pagination from "../components/Pagination"
import LoadingSpinner from "../components/LoadingSpinner"

const GamesByTagPage = () => {
  const { id } = useParams()
  const [games, setGames] = useState([])
  const [tag, setTag] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const pageSize = 12

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch tag details
        const tagData = await getTagDetails(id)
        setTag(tagData)

        // Fetch games by tag
        const gamesData = await getGamesByTag(id, currentPage, pageSize)
        setGames(gamesData.results)
        setTotalPages(Math.ceil(gamesData.count / pageSize))

        setLoading(false)
      } catch (err) {
        setError("Error al cargar los videojuegos. Por favor, inténtalo de nuevo más tarde.")
        setLoading(false)
      }
    }

    fetchData()
  }, [id, currentPage])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0)
  }

  if (loading) return <LoadingSpinner />

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
      <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-800 mb-6">
        ← Volver a la lista
      </Link>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Juegos con el tag: {tag?.name || "Cargando..."}</h2>
        {tag?.description && (
          <div className="mt-4 prose max-w-none" dangerouslySetInnerHTML={{ __html: tag.description }} />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {games.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-600">No se encontraron videojuegos con este tag.</p>
        </div>
      )}

      {games.length > 0 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </div>
  )
}

export default GamesByTagPage

