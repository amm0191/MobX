"use client"

import { useState } from "react"
import { Form, InputGroup, Button } from "react-bootstrap"

const SearchBar = ({ onSearch, placeholder = "Buscar..." }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <Form onSubmit={handleSubmit} className="search-container mb-4">
      <InputGroup>
        <Form.Control
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="py-2"
        />
        <Button type="submit" variant="primary" className="btn-primary-custom">
          <i className="bi bi-search me-1"></i> Buscar
        </Button>
      </InputGroup>
    </Form>
  )
}

export default SearchBar

