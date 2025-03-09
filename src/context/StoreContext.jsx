"use client"

import { createContext, useContext } from "react"
import rootStore from "../stores/RootStore"

// Crear el contexto
const StoreContext = createContext(rootStore)

// Proveedor del contexto
export const StoreProvider = ({ children }) => {
  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
}

// Hook personalizado para usar el store
export const useStore = () => {
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error("useStore debe ser usado dentro de un StoreProvider")
  }
  return store
}

