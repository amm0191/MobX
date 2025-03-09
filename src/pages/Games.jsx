"use client"

import { useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { observer } from "mobx-react-lite"
import debounce from "lodash.debounce"
import { useStore } from "../context/StoreContext"
import Pagination from "../components/Pagination"
import { Container, Row, Col, Form, Alert, Spinner } from "react-bootstrap"

const Games = observer(() => {
  const { gamesStore } = useStore()
  const [searchParams, setSearchParams] = useSearchParams()

  // Crea una función debounced para hacer la búsqueda
  const debouncedSearch = debounce((query) => {
    gamesStore.setSearchTerm(query)
    setSearchParams({ search: query, page: "1" })
  }, 500)

  // Maneja el cambio en el campo de búsqueda
  const handleSearchChange = (e) => {
    const value = e.target.value
    // Solo actualiza el valor del input sin disparar la búsqueda
    gamesStore.searchTerm = value
  }

  // Maneja el submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault()
    debouncedSearch(gamesStore.searchTerm)
  }

  // Maneja el cambio de página
  const handlePageChange = (page) => {
    gamesStore.setPage(page)
    setSearchParams({ search: gamesStore.searchTerm, page: page.toString() })
    window.scrollTo(0, 0)
  }

  // Carga juegos cuando cambia la página o la búsqueda en la URL
  useEffect(() => {
    const page = Number.parseInt(searchParams.get("page") || "1")
    const search = searchParams.get("search") || ""

    // Solo actualiza si los valores son diferentes
    if (page !== gamesStore.currentPage) {
      gamesStore.currentPage = page
    }

    if (search !== gamesStore.searchTerm) {
      gamesStore.searchTerm = search
    }

    gamesStore.fetchGames()
  }, [searchParams, gamesStore])

  return (
    <div className="bg-secondary-gradient py-5">
      <Container>
        <h1 className="text-center text-white fw-bold mb-4">
          <i className="bi bi-controller me-2"></i>
          Explora los mejores videojuegos
        </h1>

        {/* Campo de búsqueda */}
        <Form onSubmit={handleSubmit} className="search-container mb-5">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Busca tu juego favorito..."
              value={gamesStore.searchTerm}
              onChange={handleSearchChange}
              className="py-2 shadow"
            />
          </Form.Group>
        </Form>

        {/* Mensaje de carga */}
        {gamesStore.loading && (
          <div className="text-center py-5">
            <Spinner animation="border" variant="light" />
            <p className="mt-2 text-white">Cargando juegos...</p>
          </div>
        )}

        {/* Mensaje de error */}
        {gamesStore.error && (
          <Alert variant="danger" className="my-4">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {gamesStore.error}
          </Alert>
        )}

        {/* Lista de juegos */}
        {!gamesStore.loading && (
          <>
            {gamesStore.games.length === 0 ? (
              <Alert variant="info" className="text-center">
                <i className="bi bi-info-circle me-2"></i>
                No se encontraron juegos que coincidan con tu búsqueda.
              </Alert>
            ) : (
              <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                {gamesStore.games.map((game) => (
                  <Col key={game.id}>
                    <Link to={`/games/${game.id}`} className="text-decoration-none">
                      <div className="card h-100 shadow">
                        <img
                          src={game.background_image || "/placeholder.svg"}
                          alt={game.name}
                          className="card-img-top game-card-img"
                        />
                        <div className="card-body">
                          <h5 className="card-title fw-bold text-dark">{game.name}</h5>
                          <p className="card-text text-accent-custom">
                            <i className="bi bi-star-fill me-1"></i>
                            {game.rating} / 5
                          </p>
                        </div>
                      </div>
                    </Link>
                  </Col>
                ))}
              </Row>
            )}

            {/* Paginación */}
            {gamesStore.games.length > 0 && (
              <Pagination
                currentPage={gamesStore.currentPage}
                totalPages={gamesStore.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </Container>
    </div>
  )
})

export default Games

