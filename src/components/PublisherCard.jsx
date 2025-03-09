import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

const PublisherCard = ({ publisher }) => {
  return (
    <Card className="h-100 shadow">
      <Card.Img
        variant="top"
        src={publisher.image_background || "/placeholder.svg?height=200&width=300"}
        alt={publisher.name}
        className="publisher-card-img"
      />
      <Card.Body>
        <Card.Title className="fw-bold">{publisher.name}</Card.Title>
        <Card.Text className="text-muted mb-3">
          <i className="bi bi-controller me-1"></i> {publisher.games_count} juegos publicados
        </Card.Text>
        <div className="text-end">
          <Link to={`/publishers/${publisher.id}`} className="btn btn-accent-custom text-white">
            Ver detalles
          </Link>
        </div>
      </Card.Body>
    </Card>
  )
}

export default PublisherCard

