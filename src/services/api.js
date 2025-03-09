// API service to centralize all API calls
const API_KEY = "7be1c367171e47a6a8852ae85cb8eccd"
const BASE_URL = "https://api.rawg.io/api"

// Get games with pagination
export const getGames = async (page = 1, pageSize = 20, search = "") => {
  try {
    const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&page=${page}&page_size=${pageSize}&search=${search}`)
    if (!response.ok) throw new Error("No se pudieron obtener los juegos")
    return await response.json()
  } catch (error) {
    throw error
  }
}

// Get game details
export const getGameDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`)
    if (!response.ok) throw new Error("No se pudo obtener el juego")
    return await response.json()
  } catch (error) {
    throw error
  }
}

// Get games by tag
export const getGamesByTag = async (tag, page = 1, pageSize = 20) => {
  try {
    const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&tags=${tag}&page=${page}&page_size=${pageSize}`)
    if (!response.ok) throw new Error("No se pudieron obtener los juegos por tag")
    return await response.json()
  } catch (error) {
    throw error
  }
}

// Get games by genre
export const getGamesByGenre = async (genreId, page = 1, pageSize = 20) => {
  try {
    const response = await fetch(
      `${BASE_URL}/games?key=${API_KEY}&genres=${genreId}&page=${page}&page_size=${pageSize}`,
    )
    if (!response.ok) throw new Error("No se pudieron obtener los juegos por género")
    return await response.json()
  } catch (error) {
    throw error
  }
}

// Get publishers with pagination
export const getPublishers = async (page = 1, pageSize = 20, search = "") => {
  try {
    const response = await fetch(
      `${BASE_URL}/publishers?key=${API_KEY}&page=${page}&page_size=${pageSize}&search=${search}`,
    )
    if (!response.ok) throw new Error("No se pudieron obtener los publishers")
    return await response.json()
  } catch (error) {
    throw error
  }
}

// Get publisher details
export const getPublisherDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/publishers/${id}?key=${API_KEY}`)
    if (!response.ok) throw new Error("No se pudo obtener el publisher")
    return await response.json()
  } catch (error) {
    throw error
  }
}

// Get games by publisher
export const getGamesByPublisher = async (publisherId, page = 1, pageSize = 20) => {
  try {
    const response = await fetch(
      `${BASE_URL}/games?key=${API_KEY}&publishers=${publisherId}&page=${page}&page_size=${pageSize}`,
    )
    if (!response.ok) throw new Error("No se pudieron obtener los juegos del publisher")
    return await response.json()
  } catch (error) {
    throw error
  }
}

