const API_KEY = "7be1c367171e47a6a8852ae85cb8eccd"
const BASE_URL = "https://api.rawg.io/api"

// Get games list with pagination
export const getGames = async (page = 1, pageSize = 12, search = "") => {
  try {
    const searchParam = search ? `&search=${search}` : ""
    const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&page=${page}&page_size=${pageSize}${searchParam}`)

    if (!response.ok) {
      throw new Error("Error fetching games")
    }

    return await response.json()
  } catch (error) {
    console.error("Error in getGames:", error)
    throw error
  }
}

// Get game details
export const getGameDetails = async (gameId) => {
  try {
    const response = await fetch(`${BASE_URL}/games/${gameId}?key=${API_KEY}`)

    if (!response.ok) {
      throw new Error("Error fetching game details")
    }

    return await response.json()
  } catch (error) {
    console.error("Error in getGameDetails:", error)
    throw error
  }
}

// Get games by tag
export const getGamesByTag = async (tagId, page = 1, pageSize = 12) => {
  try {
    const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&tags=${tagId}&page=${page}&page_size=${pageSize}`)

    if (!response.ok) {
      throw new Error("Error fetching games by tag")
    }

    return await response.json()
  } catch (error) {
    console.error("Error in getGamesByTag:", error)
    throw error
  }
}

// Get games by genre
export const getGamesByGenre = async (genreId, page = 1, pageSize = 12) => {
  try {
    const response = await fetch(
      `${BASE_URL}/games?key=${API_KEY}&genres=${genreId}&page=${page}&page_size=${pageSize}`,
    )

    if (!response.ok) {
      throw new Error("Error fetching games by genre")
    }

    return await response.json()
  } catch (error) {
    console.error("Error in getGamesByGenre:", error)
    throw error
  }
}

// Get tag details
export const getTagDetails = async (tagId) => {
  try {
    const response = await fetch(`${BASE_URL}/tags/${tagId}?key=${API_KEY}`)

    if (!response.ok) {
      throw new Error("Error fetching tag details")
    }

    return await response.json()
  } catch (error) {
    console.error("Error in getTagDetails:", error)
    throw error
  }
}

// Get genre details
export const getGenreDetails = async (genreId) => {
  try {
    const response = await fetch(`${BASE_URL}/genres/${genreId}?key=${API_KEY}`)

    if (!response.ok) {
      throw new Error("Error fetching genre details")
    }

    return await response.json()
  } catch (error) {
    console.error("Error in getGenreDetails:", error)
    throw error
  }
}

