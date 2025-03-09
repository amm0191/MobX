"use client"

import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { useStore } from "../context/StoreContext"

const GameDetails = observer(() => {
  const { id } = useParams()
  const { gameDetailsStore } = useStore()

  useEffect(() => {
    gameDetailsStore.fetchGameDetails(id)

    // Cleanup
    return () => {
      gameDetailsStore.reset()
    }
  }, [id, gameDetailsStore])

  if (gameDetailsStore.loading) return <p className="text-center text-lg text-white">Cargando...</p>
  if (gameDetailsStore.error) return <p className="text-center text-red-500">{gameDetailsStore.error}</p>
  if (!gameDetailsStore.game) return null

  const game = gameDetailsStore.game

  return (
    <div className="bg-gradient-to-r from-amber-300 to-green-400 min-h-screen">
      <div className="container mx-auto p-6 md:p-12">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Título */}
          <div className="bg-gray-900 text-white p-6 text-center">
            <h1 className="text-4xl font-extrabold">{game.name}</h1>
            <p className="text-lg mt-2">
              {game.genres.map((g, index) => (
                <Link key={g.id} to={`/genres/${g.id}`} className="inline-block mx-1 hover:underline">
                  {g.name}
                  {index < game.genres.length - 1 ? "," : ""}
                </Link>
              ))}
            </p>
          </div>

          {/* Imagen del juego */}
          <div className="relative">
            <img
              src={game.background_image || "/placeholder.svg"}
              alt={game.name}
              className="w-full h-96 object-cover shadow-lg transition-transform"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h3 className="text-2xl font-semibold text-white">{game.name}</h3>
              <p className="text-sm text-white">⭐ {game.rating} / 5</p>
            </div>
          </div>

          {/* Descripción */}
          <div className="p-6 bg-gray-100 text-gray-700">
            <p className="text-lg">{game.description_raw}</p>
          </div>

          {/* Detalles del juego */}
          <div className="p-6 mt-4 bg-gray-50 rounded-lg shadow-inner">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
              <div>
                <p className="mb-2">
                  <strong>📅 Fecha de lanzamiento:</strong> {game.released}
                </p>
                <p className="mb-2">
                  <strong>🕹️ Plataformas:</strong> {game.platforms.map((p) => p.platform.name).join(", ")}
                </p>
                <p className="mb-2">
                  <strong>⭐ Puntuación:</strong> {game.rating} / 5
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <strong>🎮 Géneros:</strong> {game.genres.map((g) => g.name).join(", ")}
                </p>

                {/* Publisher con enlace */}
                <p className="mb-2">
                  <strong>🏢 Publisher:</strong>{" "}
                  {game.publishers && game.publishers.length > 0
                    ? game.publishers.map((publisher, index) => (
                        <span key={publisher.id}>
                          <Link to={`/publishers/${publisher.id}`} className="text-green-600 hover:underline">
                            {publisher.name}
                          </Link>
                          {index < game.publishers.length - 1 ? ", " : ""}
                        </span>
                      ))
                    : "No disponible"}
                </p>

                {/* Tags con enlaces */}
                <p className="mb-2">
                  <strong>🏷️ Tags:</strong>{" "}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {game.tags && game.tags.length > 0
                      ? game.tags.map((tag) => (
                          <Link
                            key={tag.id}
                            to={`/tags/${tag.id}`}
                            className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm hover:bg-green-200"
                          >
                            {tag.name}
                          </Link>
                        ))
                      : "No disponible"}
                  </div>
                </p>
              </div>
            </div>
          </div>

          {/* Botón de Volver */}
          <div className="text-center my-6">
            <Link to="/" className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition">
              Volver a la Página Principal
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
})

export default GameDetails

