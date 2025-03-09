"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getGameDetails } from "../services/gameService"
import TagsList from "../components/TagsList"
import PlatformsList from "../components/PlatformsList"
import LoadingSpinner from "../components/LoadingSpinner"

const GameDetailsPage = () => {
  const { id } = useParams()
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        setLoading(true)
        const data = await getGameDetails(id)
        setGame(data)
        setLoading(false)
      } catch (err) {
        setError("Error al cargar los detalles del videojuego. Por favor, inténtalo de nuevo más tarde.")
        setLoading(false)
      }
    }

    fetchGameDetails()
  }, [id])

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

  if (!game) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-800 mb-6">
        ← Volver a la lista
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-80 md:h-96">
          <img
            src={game.background_image || "/placeholder.svg?height=400&width=800"}
            alt={game.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{game.name}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              {game.genres?.map((genre) => (
                <Link
                  key={genre.id}
                  to={`/games/genre/${genre.id}`}
                  className="text-sm bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition-colors"
                >
                  {genre.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="bg-gray-100 px-4 py-2 rounded-md">
              <span className="block text-sm text-gray-500">Fecha de lanzamiento</span>
              <span className="font-medium">{game.released || "Desconocida"}</span>
            </div>

            <div className="bg-gray-100 px-4 py-2 rounded-md">
              <span className="block text-sm text-gray-500">Rating</span>
              <span className="font-medium">{game.rating ? `★ ${game.rating.toFixed(1)}` : "Sin rating"}</span>
            </div>

            {game.metacritic && (
              <div className="bg-gray-100 px-4 py-2 rounded-md">
                <span className="block text-sm text-gray-500">Metacritic</span>
                <span className="font-medium">{game.metacritic}</span>
              </div>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Descripción</h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: game.description || "No hay descripción disponible." }}
            />
          </div>

          {/* Publisher section */}
          {game.publishers && game.publishers.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Publisher:</h3>
              <div className="flex flex-wrap gap-2">
                {game.publishers.map((publisher) => (
                  <Link
                    key={publisher.id}
                    to={`/publisher/${publisher.id}`}
                    className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm hover:bg-amber-200 transition-colors"
                  >
                    {publisher.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Tags section */}
          <TagsList tags={game.tags} />

          {/* Platforms section */}
          <PlatformsList platforms={game.platforms} />

          {/* Website link if available */}
          {game.website && (
            <div className="mt-8">
              <a
                href={game.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                Visitar sitio web oficial
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GameDetailsPage

