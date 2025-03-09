"use client"

import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { useStore } from "../context/StoreContext"
import Pagination from "../components/Pagination"

const PublisherDetails = observer(() => {
  const { id } = useParams()
  const { publishersStore } = useStore()

  useEffect(() => {
    publishersStore.fetchPublisherDetails(id)

    // Cleanup
    return () => {
      publishersStore.reset()
    }
  }, [id, publishersStore])

  const handlePageChange = (page) => {
    publishersStore.setPage(page)
    window.scrollTo(0, 0)
  }

  if (publishersStore.loading && publishersStore.currentPage === 1)
    return <p className="text-center text-lg text-white">Cargando...</p>

  if (publishersStore.error) return <p className="text-center text-red-500">{publishersStore.error}</p>

  if (!publishersStore.currentPublisher) return null

  const publisher = publishersStore.currentPublisher

  return (
    <div className="bg-gradient-to-r from-amber-300 to-green-400 min-h-screen">
      <div className="container mx-auto p-6 md:p-12">
        {/* Header con información del publisher */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-10">
          <div className="relative">
            {publisher.image_background && (
              <img
                src={publisher.image_background || "/placeholder.svg"}
                alt={publisher.name}
                className="w-full h-64 object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h1 className="text-4xl font-extrabold text-white text-center drop-shadow-lg">{publisher.name}</h1>
            </div>
          </div>

          <div className="p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Información</h2>
                <p className="mb-2">
                  <strong>Juegos publicados:</strong> {publisher.games_count}
                </p>
                {publisher.description && (
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">Acerca de</h3>
                    <p className="text-gray-700">{publisher.description}</p>
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Juegos populares</h2>
                <ul className="list-disc pl-5">
                  {publisher.games &&
                    publisher.games.slice(0, 5).map((game) => (
                      <li key={game.id} className="mb-1">
                        <Link to={`/games/${game.id}`} className="text-green-600 hover:underline">
                          {game.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Botón de Volver */}
        <div className="mb-8 text-center">
          <Link
            to="/publishers"
            className="inline-block bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition mr-4"
          >
            ← Volver a Publishers
          </Link>
          <Link
            to="/"
            className="inline-block bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Ir a la Página Principal
          </Link>
        </div>

        {/* Lista de juegos del publisher */}
        <h2 className="text-3xl font-bold text-white mb-6">Todos los juegos de {publisher.name}</h2>

        {publishersStore.loading && publishersStore.currentPage > 1 ? (
          <p className="text-center text-lg text-white">Cargando más juegos...</p>
        ) : publishersStore.publisherGames.length === 0 ? (
          <p className="text-center text-xl text-white">No se encontraron juegos para este publisher.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {publishersStore.publisherGames.map((game) => (
              <Link
                key={game.id}
                to={`/games/${game.id}`}
                className="block bg-white overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300 rounded-lg"
              >
                <img
                  src={game.background_image || "/placeholder.svg"}
                  alt={game.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{game.name}</h2>
                  <p className="text-lg text-gray-600">⭐ {game.rating} / 5</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Paginación */}
        {publishersStore.publisherGames.length > 0 && (
          <Pagination
            currentPage={publishersStore.currentPage}
            totalPages={publishersStore.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  )
})

export default PublisherDetails

