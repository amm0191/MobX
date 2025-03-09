"use client"

import { useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { observer } from "mobx-react-lite"
import debounce from "lodash.debounce"
import { useStore } from "../context/StoreContext"
import Pagination from "../components/Pagination"

const Publishers = observer(() => {
  const { publishersStore } = useStore()
  const [searchParams, setSearchParams] = useSearchParams()

  // Crea una función debounced para hacer la búsqueda
  const debouncedSearch = debounce((query) => {
    publishersStore.setSearchTerm(query)
    setSearchParams({ search: query, page: "1" })
  }, 500)

  // Maneja el cambio en el campo de búsqueda
  const handleSearchChange = (e) => {
    const value = e.target.value
    // Solo actualiza el valor del input sin disparar la búsqueda
    publishersStore.searchTerm = value
  }

  // Maneja el submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault()
    debouncedSearch(publishersStore.searchTerm)
  }

  // Maneja el cambio de página
  const handlePageChange = (page) => {
    publishersStore.setPage(page)
    setSearchParams({ search: publishersStore.searchTerm, page: page.toString() })
    window.scrollTo(0, 0)
  }

  // Carga publishers cuando cambia la página o la búsqueda en la URL
  useEffect(() => {
    const page = Number.parseInt(searchParams.get("page") || "1")
    const search = searchParams.get("search") || ""

    // Solo actualiza si los valores son diferentes
    if (page !== publishersStore.currentPage) {
      publishersStore.currentPage = page
    }

    if (search !== publishersStore.searchTerm) {
      publishersStore.searchTerm = search
    }

    publishersStore.fetchPublishers()

    // Cleanup
    return () => {
      publishersStore.reset()
    }
  }, [searchParams, publishersStore])

  // Mensaje de error o de carga
  if (publishersStore.loading) return <p className="text-center text-lg text-white">Cargando...</p>

  if (publishersStore.error) return <p className="text-center text-red-500">{publishersStore.error}</p>

  return (
    <div className="bg-gradient-to-r from-amber-300 to-green-400 min-h-screen text-white">
      <div className="container mx-auto p-6">
        <h1 className="text-5xl font-extrabold text-center mb-10 drop-shadow-lg">
          Explora las mejores compañías de videojuegos
        </h1>

        <div className="mb-8 text-center">
          <Link
            to="/"
            className="inline-block bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            ← Volver a la página principal
          </Link>
        </div>

        {/* Campo de búsqueda */}
        <form onSubmit={handleSubmit} className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Busca una compañía..."
            value={publishersStore.searchTerm}
            onChange={handleSearchChange}
            className="w-full sm:w-80 p-4 text-lg rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-gray-800 placeholder-gray-500 shadow-xl"
          />
        </form>

        {/* Lista de publishers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {publishersStore.publishers.length === 0 ? (
            <p className="text-center text-xl text-gray-300 col-span-full">No se encontraron compañías.</p>
          ) : (
            publishersStore.publishers.map((publisher) => (
              <Link
                key={publisher.id}
                to={`/publishers/${publisher.id}`}
                className="block bg-white overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300 border-solid border-3 border-black rounded-lg"
              >
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {publisher.image_background ? (
                    <img
                      src={publisher.image_background || "/placeholder.svg"}
                      alt={publisher.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-4xl text-gray-400">🏢</div>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{publisher.name}</h2>
                  <p className="text-sm text-gray-600">{publisher.games_count} juegos publicados</p>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Paginación */}
        {publishersStore.publishers.length > 0 && (
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

export default Publishers

