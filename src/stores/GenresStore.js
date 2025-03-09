import { makeObservable, observable, action, runInAction } from "mobx"
import { getGamesByGenre } from "../services/api"

export class GenresStore {
  games = []
  genreName = ""
  loading = false
  error = null
  currentPage = 1
  totalPages = 1
  pageSize = 20
  currentGenreId = null

  constructor(rootStore) {
    this.rootStore = rootStore

    makeObservable(this, {
      games: observable,
      genreName: observable,
      loading: observable,
      error: observable,
      currentPage: observable,
      totalPages: observable,
      currentGenreId: observable,
      setPage: action,
      fetchGamesByGenre: action,
      reset: action,
    })
  }

  setPage = (page) => {
    this.currentPage = page
    this.fetchGamesByGenre(this.currentGenreId)
  }

  fetchGamesByGenre = async (genreId) => {
    this.loading = true
    this.error = null
    this.currentGenreId = genreId

    try {
      const data = await getGamesByGenre(genreId, this.currentPage, this.pageSize)

      runInAction(() => {
        this.games = data.results
        this.totalPages = Math.ceil(data.count / this.pageSize)

        // Intentar obtener el nombre del género del primer juego
        if (data.results.length > 0) {
          const genre = data.results[0].genres.find((g) => g.id.toString() === genreId.toString())
          if (genre) {
            this.genreName = genre.name
          }
        }

        this.loading = false
      })
    } catch (error) {
      runInAction(() => {
        this.error = error.message
        this.loading = false
      })
    }
  }

  reset = () => {
    this.games = []
    this.genreName = ""
    this.loading = false
    this.error = null
    this.currentPage = 1
    this.totalPages = 1
    this.currentGenreId = null
  }
}

