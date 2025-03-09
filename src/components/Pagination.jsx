"use client"

import React from "react"
import { observer } from "mobx-react-lite"

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
    <div className="flex justify-center mt-10">
      <div className="flex items-center space-x-2">
        {/* Botón Anterior */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
        >
          Anterior
        </button>

        {/* Números de página */}
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="px-3 py-1">...</span>
            ) : (
              <button
                onClick={() => typeof page === "number" && onPageChange(page)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page ? "bg-green-500 text-white" : "bg-white text-gray-800 hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        {/* Botón Siguiente */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
        >
          Siguiente
        </button>
      </div>
    </div>
  )
})

export default Pagination

