import { Card, Badge } from "react-bootstrap"
import { Link } from "react-router-dom"

const GameCard = ({ game }) => {
  return (
    <Card className="h-100 shadow">
      <Card.Img
        variant="top"
        src={game.background_image || "/placeholder.svg?height=200&width=300"}
        alt={game.name}
        className="game-card-img"
      />
      <Card.Body>
        <Card.Title className="fw-bold">{game.name}</Card.Title>
        <div className="mb-3">
          {game.genres?.slice(0, 3).map((genre) => (
            <Link key={genre.id} to={`/genres/${genre.id}`} className="text-decoration-none">
              <Badge className="me-1 badge-genre">{genre.name}</Badge>
            </Link>
          ))}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-accent-custom fw-bold">
            {game.rating ? `★ ${game.rating.toFixed(1)}` : "Sin rating"}
          </span>
          <Link to={`/games/${game.id}`} className="btn btn-sm btn-secondary-custom text-white">
            Ver detalles
          </Link>
        </div>
      </Card.Body>
    </Card>
  )
}

export default GameCard

