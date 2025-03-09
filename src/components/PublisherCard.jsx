import { Link } from "react-router-dom"

const PublisherCard = ({ publisher }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img
        src={publisher.image_background || "/placeholder.svg?height=200&width=300"}
        alt={publisher.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{publisher.name}</h3>
        <p className="text-gray-600 mb-3">{publisher.games_count} juegos publicados</p>
        <div className="flex justify-end">
          <Link
            to={`/publisher/${publisher.id}`}
            className="bg-amber-500 text-white px-3 py-1 rounded-md hover:bg-amber-600 transition-colors"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PublisherCard

