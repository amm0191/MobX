import { Spinner, Container } from "react-bootstrap"

const LoadingSpinner = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center py-5">
      <Spinner animation="border" role="status" variant="primary" style={{ width: "3rem", height: "3rem" }}>
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
    </Container>
  )
}

export default LoadingSpinner

