import { Container, Row, Col } from "react-bootstrap"

const Footer = () => {
  return (
    <footer className="footer py-4 mt-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0">&copy; 2025 Videojuegos Moya. Todos los derechos reservados.</p>
          </Col>
          <Col md={6} className="text-center text-md-end mt-3 mt-md-0">
            <a href="#" className="text-white me-3">
              <i className="bi bi-facebook fs-5"></i>
            </a>
            <a href="#" className="text-white me-3">
              <i className="bi bi-twitter-x fs-5"></i>
            </a>
            <a href="#" className="text-white me-3">
              <i className="bi bi-instagram fs-5"></i>
            </a>
            <a href="#" className="text-white">
              <i className="bi bi-youtube fs-5"></i>
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer

