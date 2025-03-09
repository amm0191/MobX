"use client"

import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { useStore } from "../context/StoreContext"
import { Container, Row, Col, Card, Badge, Button, Alert, Spinner } from "react-bootstrap"
import TagsList from "../components/TagsList"
import PlatformsList from "../components/PlatformsList"

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

  if (gameDetailsStore.loading)
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando detalles del juego...</p>
      </Container>
    )

  if (gameDetailsStore.error)
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {gameDetailsStore.error}
        </Alert>
      </Container>
    )

  if (!gameDetailsStore.game) return null

  const game = gameDetailsStore.game

  return (
    <Container className="py-5">
      <Link to="/" className="btn btn-outline-primary mb-4">
        <i className="bi bi-arrow-left me-1"></i> Volver a la lista
      </Link>

      <Card className="shadow-lg overflow-hidden">
        {/* Header con título y géneros */}
        <div className="bg-primary-gradient text-white p-4 text-center">
          <h1 className="fw-bold">{game.name}</h1>
          <div className="mt-2">
            {game.genres.map((g, index) => (
              <Link key={g.id} to={`/genres/${g.id}`} className="text-decoration-none">
                <Badge className="mx-1 badge-genre">{g.name}</Badge>
              </Link>
            ))}
          </div>
        </div>

        {/* Imagen del juego */}
        <div className="position-relative">
          <img src={game.background_image || "/placeholder.svg"} alt={game.name} className="w-100 game-detail-img" />
          <div className="position-absolute bottom-0 start-0 end-0 p-3 bg-dark bg-opacity-75 text-white">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0">{game.name}</h3>
              <span className="badge bg-warning text-dark fs-6">
                <i className="bi bi-star-fill me-1"></i> {game.rating} / 5
              </span>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <Card.Body>
          <Row>
            <Col md={8}>
              <h4 className="fw-bold mb-3">Descripción</h4>
              <p className="text-muted">{game.description_raw}</p>
            </Col>
            <Col md={4}>
              <Card className="bg-light">
                <Card.Body>
                  <h4 className="fw-bold mb-3">Detalles</h4>

                  <p className="mb-2">
                    <i className="bi bi-calendar me-2"></i>
                    <strong>Fecha de lanzamiento:</strong> {game.released || "Desconocida"}
                  </p>

                  <p className="mb-2">
                    <i className="bi bi-star me-2"></i>
                    <strong>Rating:</strong> {game.rating ? `${game.rating.toFixed(1)} / 5` : "Sin rating"}
                  </p>

                  {game.metacritic && (
                    <p className="mb-2">
                      <i className="bi bi-award me-2"></i>
                      <strong>Metacritic:</strong> {game.metacritic}
                    </p>
                  )}

                  {/* Publisher con enlace */}
                  {game.publishers && game.publishers.length > 0 && (
                    <p className="mb-2">
                      <i className="bi bi-building me-2"></i>
                      <strong>Publisher:</strong>{" "}
                      {game.publishers.map((publisher, index) => (
                        <span key={publisher.id}>
                          <Link
                            to={`/publishers/${publisher.id}`}
                            className="text-decoration-none badge badge-publisher me-1"
                          >
                            {publisher.name}
                          </Link>
                          {index < game.publishers.length - 1 ? " " : ""}
                        </span>
                      ))}
                    </p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Tags y Plataformas */}
          <Row className="mt-4">
            <Col md={6}>
              <TagsList tags={game.tags} />
            </Col>
            <Col md={6}>
              <PlatformsList platforms={game.platforms} />
            </Col>
          </Row>

          {/* Botones de acción */}
          <div className="text-center mt-4">
            {game.website && (
              <Button
                href={game.website}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="btn-primary-custom me-2"
              >
                <i className="bi bi-globe me-1"></i> Visitar sitio web oficial
              </Button>
            )}
            <Button as={Link} to="/" variant="secondary" className="btn-secondary-custom">
              <i className="bi bi-arrow-left me-1"></i> Volver a la Página Principal
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
})

export default GameDetails

