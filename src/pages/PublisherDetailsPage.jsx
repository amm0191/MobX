"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getPublisherDetails, getGamesByPublisher } from "../services/publisherService"
import GameCard from "../components/GameCard"
import Pagination from "../components/Pagination"
import LoadingSpinner from "../components/LoadingSpinner"

const PublisherDetailsPage = () => {
  const { id } = useParams()
  const [publisher, setPublisher] = useState(null)
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const pageSize = 8

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch publisher details
        const publisherData = await getPublisherDetails(id)
        setPublisher(publisherData)

        // Fetch games by publisher
        const gamesData = await getGamesByPublisher(id, currentPage, pageSize)
        setGames(gamesData.results)
        setTotalPages(Math.ceil(gamesData.count / pageSize))

        setLoading(false)
      } catch (err) {
        setError("Error al cargar los datos del publisher. Por favor, inténtalo de nuevo más tarde.")
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

  if (!publisher) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/publishers" className="inline-flex items-center text-green-600 hover:text-green-800 mb-6">
        ← Volver a publishers
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-10">
        <div className="relative h-64 md:h-80">
          <img
            src={publisher.image_background || "/placeholder.svg?height=400&width=800"}
            alt={publisher.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{publisher.name}</h1>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="bg-gray-100 px-4 py-2 rounded-md">
              <span className="block text-sm text-gray-500">Juegos publicados</span>
              <span className="font-medium">{publisher.games_count}</span>
            </div>
          </div>

          {publisher.description && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Acerca de {publisher.name}</h2>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: publisher.description }} />
            </div>
          )}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">Juegos de {publisher.name}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {games.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-600">No se encontraron videojuegos de este publisher.</p>
        </div>
      )}

      {games.length > 0 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </div>
  )
}

export default PublisherDetailsPage

