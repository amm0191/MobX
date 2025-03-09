import { Link } from "react-router-dom"

const GameCard = ({ game }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img
        src={game.background_image || "/placeholder.svg?height=200&width=300"}
        alt={game.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{game.name}</h3>
        <div className="flex flex-wrap gap-1 mb-3">
          {game.genres?.slice(0, 3).map((genre) => (
            <Link
              key={genre.id}
              to={`/games/genre/${genre.id}`}
              className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
            >
              {genre.name}
            </Link>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-amber-600 font-medium">
            {game.rating ? `★ ${game.rating.toFixed(1)}` : "Sin rating"}
          </span>
          <Link
            to={`/game/${game.id}`}
            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GameCard

