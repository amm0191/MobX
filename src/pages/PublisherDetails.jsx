"use client"

import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { useStore } from "../context/StoreContext"
import Pagination from "../components/Pagination"
import { Container, Row, Col, Card, Alert, Button, Spinner, Badge } from "react-bootstrap"

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
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando detalles del publisher...</p>
      </Container>
    )

  if (publishersStore.error)
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {publishersStore.error}
        </Alert>
      </Container>
    )

  if (!publishersStore.currentPublisher) return null

  const publisher = publishersStore.currentPublisher

  return (
    <Container className="py-5">
      {/* Botones de navegación */}
      <div className="mb-4">
        <Button as={Link} to="/publishers" variant="outline-primary" className="me-2">
          <i className="bi bi-arrow-left me-1"></i> Volver a Publishers
        </Button>
        <Button as={Link} to="/" variant="outline-secondary">
          <i className="bi bi-house me-1"></i> Ir a la Página Principal
        </Button>
      </div>

      {/* Información del publisher */}
      <Card className="shadow-lg mb-5">
        <div className="position-relative">
          {publisher.image_background && (
            <img
              src={publisher.image_background || "/placeholder.svg"}
              alt={publisher.name}
              className="w-100 publisher-card-img"
              style={{ height: "250px", objectFit: "cover" }}
            />
          )}
          <div className="position-absolute top-0 start-0 end-0 bottom-0 d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
            <h1 className="text-white fw-bold text-center">{publisher.name}</h1>
          </div>
        </div>

        <Card.Body>
          <Row>
            <Col md={6}>
              <h4 className="fw-bold mb-3">
                <i className="bi bi-info-circle me-2"></i> Información
              </h4>
              <p className="mb-3">
                <Badge bg="primary" className="me-2">
                  <i className="bi bi-controller me-1"></i> {publisher.games_count}
                </Badge>
                juegos publicados
              </p>
              {publisher.description && (
                <div>
                  <h5 className="fw-bold mb-2">Acerca de</h5>
                  <p className="text-muted">{publisher.description}</p>
                </div>
              )}
            </Col>

            <Col md={6}>
              <h4 className="fw-bold mb-3">
                <i className="bi bi-trophy me-2"></i> Juegos populares
              </h4>
              <ul className="list-group">
                {publisher.games &&
                  publisher.games.slice(0, 5).map((game) => (
                    <li key={game.id} className="list-group-item">
                      <Link to={`/games/${game.id}`} className="text-decoration-none text-primary">
                        <i className="bi bi-controller me-2"></i> {game.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Lista de juegos del publisher */}
      <h2 className="fw-bold mb-4">
        <i className="bi bi-grid me-2"></i> Todos los juegos de {publisher.name}
      </h2>

      {/* Mensaje de carga */}
      {publishersStore.loading && publishersStore.currentPage > 1 && (
        <div className="text-center mb-4">
          <Spinner animation="border" variant="primary" size="sm" />
          <span className="ms-2">Cargando más juegos...</span>
        </div>
      )}

      {/* Lista de juegos */}
      {publishersStore.publisherGames.length === 0 ? (
        <Alert variant="info" className="text-center">
          <i className="bi bi-info-circle me-2"></i>
          No se encontraron juegos para este publisher.
        </Alert>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {publishersStore.publisherGames.map((game) => (
            <Col key={game.id}>
              <Link to={`/games/${game.id}`} className="text-decoration-none">
                <Card className="h-100 shadow">
                  <Card.Img
                    variant="top"
                    src={game.background_image || "/placeholder.svg"}
                    alt={game.name}
                    className="game-card-img"
                  />
                  <Card.Body>
                    <Card.Title className="fw-bold text-dark">{game.name}</Card.Title>
                    <Card.Text className="text-accent-custom">
                      <i className="bi bi-star-fill me-1"></i> {game.rating} / 5
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}

      {/* Paginación */}
      {publishersStore.publisherGames.length > 0 && (
        <Pagination
          currentPage={publishersStore.currentPage}
          totalPages={publishersStore.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  )
})

export default PublisherDetails

