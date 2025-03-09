"use client"

import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { useStore } from "../context/StoreContext"
import Pagination from "../components/Pagination"
import { Container, Row, Col, Card, Alert, Button, Spinner } from "react-bootstrap"

const GenreGames = observer(() => {
  const { id } = useParams()
  const { genresStore } = useStore()

  useEffect(() => {
    genresStore.fetchGamesByGenre(id)

    // Cleanup
    return () => {
      genresStore.reset()
    }
  }, [id, genresStore])

  const handlePageChange = (page) => {
    genresStore.setPage(page)
    window.scrollTo(0, 0)
  }

  return (
    <div className="bg-primary-gradient py-5">
      <Container>
        <h1 className="text-center text-white fw-bold mb-4">
          <i className="bi bi-joystick me-2"></i>
          Juegos del género: {genresStore.genreName || `#${id}`}
        </h1>

        <div className="text-center mb-4">
          <Button as={Link} to="/" variant="light" className="shadow">
            <i className="bi bi-arrow-left me-1"></i> Volver a la página principal
          </Button>
        </div>

        {/* Mensaje de carga */}
        {genresStore.loading && genresStore.currentPage === 1 && (
          <div className="text-center py-5">
            <Spinner animation="border" variant="light" />
            <p className="mt-2 text-white">Cargando juegos...</p>
          </div>
        )}

        {/* Mensaje de error */}
        {genresStore.error && (
          <Alert variant="danger" className="my-4">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {genresStore.error}
          </Alert>
        )}

        {/* Lista de juegos */}
        {!genresStore.loading && (
          <>
            {genresStore.games.length === 0 ? (
              <Alert variant="info" className="text-center">
                <i className="bi bi-info-circle me-2"></i>
                No se encontraron juegos de este género.
              </Alert>
            ) : (
              <>
                {genresStore.loading && genresStore.currentPage > 1 && (
                  <div className="text-center mb-4">
                    <Spinner animation="border" variant="light" size="sm" />
                    <span className="ms-2 text-white">Cargando más juegos...</span>
                  </div>
                )}

                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                  {genresStore.games.map((game) => (
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

                {/* Paginación */}
                {genresStore.games.length > 0 && (
                  <Pagination
                    currentPage={genresStore.currentPage}
                    totalPages={genresStore.totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </>
        )}
      </Container>
    </div>
  )
})

export default GenreGames

