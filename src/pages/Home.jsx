import { Link } from "react-router-dom"
import { observer } from "mobx-react-lite"
import Games from "./Games"

const Home = observer(() => {
  return (
    <div className="bg-gradient-to-r from-amber-300 to-green-400 min-h-screen">
      {/* Banner con enlace a la landing page */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 py-4 text-white text-center">
        <p className="text-lg">
          ¿Primera vez aquí?
          <Link to="/landing" className="ml-2 underline font-bold hover:text-amber-200">
            Visita nuestra página de inicio
          </Link>
        </p>
      </div>

      {/* Lista de Juegos */}
      <Games />

      {/* Sección de navegación a Publishers */}
      <div className="container mx-auto p-6 text-center mb-12">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-4">¿Quieres explorar por compañías?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Descubre los mejores publishers de videojuegos y explora sus catálogos
          </p>
          <Link
            to="/publishers"
            className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
          >
            Ver Publishers
          </Link>
        </div>
      </div>
    </div>
  )
})

export default Home

