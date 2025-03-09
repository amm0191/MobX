import { Link } from "react-router-dom"
import { observer } from "mobx-react-lite"
import Carousel from "../components/Carousel"

const LandingPage = observer(() => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen w-full">
      <div className="container mx-auto px-4 py-6 max-w-full">
        <div className="text-center py-8">
          <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">Bienvenido a Videojuegos Moya</h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Explora los mejores videojuegos, descubre nuevos títulos y encuentra información sobre tus publishers
            favoritos.
          </p>
        </div>

        {/* Carrusel de juegos destacados */}
        <div className="mb-12 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-md">Juegos Destacados</h2>
          <Carousel />
        </div>

        {/* Secciones de navegación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition hover:scale-105">
            <div className="h-48 bg-green-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-2">Explorar Videojuegos</h3>
              <p className="text-gray-600 mb-4">
                Descubre miles de videojuegos, filtra por géneros y encuentra tu próxima aventura.
              </p>
              <Link
                to="/"
                className="inline-block bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Ver Juegos
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition hover:scale-105">
            <div className="h-48 bg-amber-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-2">Descubrir Publishers</h3>
              <p className="text-gray-600 mb-4">
                Conoce las compañías detrás de tus juegos favoritos y explora sus catálogos.
              </p>
              <Link
                to="/publishers"
                className="inline-block bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition"
              >
                Ver Publishers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default LandingPage

