"use client"

import React from "react"
import { observer } from "mobx-react-lite"
import { Pagination as BootstrapPagination } from "react-bootstrap"

const Pagination = observer(({ currentPage, totalPages, onPageChange }) => {
  // Determinar qué páginas mostrar
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // Si hay menos páginas que el máximo a mostrar, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Siempre mostrar la primera página
      pages.push(1)

      // Calcular el rango de páginas alrededor de la página actual
      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)

      // Ajustar si estamos cerca del inicio o final
      if (currentPage <= 3) {
        endPage = Math.min(totalPages - 1, 4)
      } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3)
      }

      // Añadir elipsis si es necesario
      if (startPage > 2) {
        pages.push("...")
      }

      // Añadir páginas intermedias
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      // Añadir elipsis si es necesario
      if (endPage < totalPages - 1) {
        pages.push("...")
      }

      // Siempre mostrar la última página
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <BootstrapPagination>
        <BootstrapPagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />

        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <BootstrapPagination.Ellipsis disabled />
            ) : (
              <BootstrapPagination.Item
                active={currentPage === page}
                onClick={() => typeof page === "number" && onPageChange(page)}
              >
                {page}
              </BootstrapPagination.Item>
            )}
          </React.Fragment>
        ))}

        <BootstrapPagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
      </BootstrapPagination>
    </div>
  )
})

export default Pagination

