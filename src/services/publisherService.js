const API_KEY = "7be1c367171e47a6a8852ae85cb8eccd"
const BASE_URL = "https://api.rawg.io/api"

// Get publishers list with pagination
export const getPublishers = async (page = 1, pageSize = 12, search = "") => {
  try {
    const searchParam = search ? `&search=${search}` : ""
    const response = await fetch(
      `${BASE_URL}/publishers?key=${API_KEY}&page=${page}&page_size=${pageSize}${searchParam}`,
    )

    if (!response.ok) {
      throw new Error("Error fetching publishers")
    }

    return await response.json()
  } catch (error) {
    console.error("Error in getPublishers:", error)
    throw error
  }
}

// Get publisher details
export const getPublisherDetails = async (publisherId) => {
  try {
    const response = await fetch(`${BASE_URL}/publishers/${publisherId}?key=${API_KEY}`)

    if (!response.ok) {
      throw new Error("Error fetching publisher details")
    }

    return await response.json()
  } catch (error) {
    console.error("Error in getPublisherDetails:", error)
    throw error
  }
}

// Get games by publisher
export const getGamesByPublisher = async (publisherId, page = 1, pageSize = 12) => {
  try {
    const response = await fetch(
      `${BASE_URL}/games?key=${API_KEY}&publishers=${publisherId}&page=${page}&page_size=${pageSize}`,
    )

    if (!response.ok) {
      throw new Error("Error fetching games by publisher")
    }

    return await response.json()
  } catch (error) {
    console.error("Error in getGamesByPublisher:", error)
    throw error
  }
}

