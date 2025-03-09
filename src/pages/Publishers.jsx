"use client"

import { useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { observer } from "mobx-react-lite"
import debounce from "lodash.debounce"
import { useStore } from "../context/StoreContext"
import Pagination from "../components/Pagination"
import { Container, Row, Col, Form, Card, Alert, Button, Spinner } from "react-bootstrap"

const Publishers = observer(() => {
  const { publishersStore } = useStore()
  const [searchParams, setSearchParams] = useSearchParams()

  // Crea una función debounced para hacer la búsqueda
  const debouncedSearch = debounce((query) => {
    publishersStore.setSearchTerm(query)
    setSearchParams({ search: query, page: "1" })
  }, 500)

  // Maneja el cambio en el campo de búsqueda
  const handleSearchChange = (e) => {
    const value = e.target.value
    // Solo actualiza el valor del input sin disparar la búsqueda
    publishersStore.searchTerm = value
  }

  // Maneja el submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault()
    debouncedSearch(publishersStore.searchTerm)
  }

  // Maneja el cambio de página
  const handlePageChange = (page) => {
    publishersStore.setPage(page)
    setSearchParams({ search: publishersStore.searchTerm, page: page.toString() })
    window.scrollTo(0, 0)
  }

  // Carga publishers cuando cambia la página o la búsqueda en la URL
  useEffect(() => {
    const page = Number.parseInt(searchParams.get("page") || "1")
    const search = searchParams.get("search") || ""

    // Solo actualiza si los valores son diferentes
    if (page !== publishersStore.currentPage) {
      publishersStore.currentPage = page
    }

    if (search !== publishersStore.searchTerm) {
      publishersStore.searchTerm = search
    }

    publishersStore.fetchPublishers()

    // Cleanup
    return () => {
      publishersStore.reset()
    }
  }, [searchParams, publishersStore])

  return (
    <div className="bg-accent-gradient py-5">
      <Container>
        <h1 className="text-center text-white fw-bold mb-4">
          <i className="bi bi-building me-2"></i>
          Explora las mejores compañías de videojuegos
        </h1>

        <div className="text-center mb-4">
          <Button as={Link} to="/" variant="light" className="shadow">
            <i className="bi bi-arrow-left me-1"></i> Volver a la página principal
          </Button>
        </div>

        {/* Campo de búsqueda */}
        <Form onSubmit={handleSubmit} className="search-container mb-5">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Busca una compañía..."
              value={publishersStore.searchTerm}
              onChange={handleSearchChange}
              className="py-2 shadow"
            />
          </Form.Group>
        </Form>

        {/* Mensaje de carga */}
        {publishersStore.loading && (
          <div className="text-center py-5">
            <Spinner animation="border" variant="light" />
            <p className="mt-2 text-white">Cargando publishers...</p>
          </div>
        )}

        {/* Mensaje de error */}
        {publishersStore.error && (
          <Alert variant="danger" className="my-4">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {publishersStore.error}
          </Alert>
        )}

        {/* Lista de publishers */}
        {!publishersStore.loading && (
          <>
            {publishersStore.publishers.length === 0 ? (
              <Alert variant="info" className="text-center">
                <i className="bi bi-info-circle me-2"></i>
                No se encontraron compañías que coincidan con tu búsqueda.
              </Alert>
            ) : (
              <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                {publishersStore.publishers.map((publisher) => (
                  <Col key={publisher.id}>
                    <Link to={`/publishers/${publisher.id}`} className="text-decoration-none">
                      <Card className="h-100 shadow">
                        <div className="publisher-card-img bg-light d-flex align-items-center justify-content-center">
                          {publisher.image_background ? (
                            <Card.Img
                              variant="top"
                              src={publisher.image_background || "/placeholder.svg"}
                              alt={publisher.name}
                              className="publisher-card-img"
                            />
                          ) : (
                            <i className="bi bi-building text-muted" style={{ fontSize: "3rem" }}></i>
                          )}
                        </div>
                        <Card.Body>
                          <Card.Title className="fw-bold text-dark">{publisher.name}</Card.Title>
                          <Card.Text className="text-muted">
                            <i className="bi bi-controller me-1"></i> {publisher.games_count} juegos publicados
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            )}

            {/* Paginación */}
            {publishersStore.publishers.length > 0 && (
              <Pagination
                currentPage={publishersStore.currentPage}
                totalPages={publishersStore.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </Container>
    </div>
  )
})

export default Publishers

