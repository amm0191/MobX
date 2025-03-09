import { makeObservable, observable, action, runInAction } from "mobx"
import { getGames } from "../services/api"

export class GamesStore {
  games = []
  loading = false
  error = null
  currentPage = 1
  totalPages = 1
  searchTerm = ""
  pageSize = 20

  constructor(rootStore) {
    this.rootStore = rootStore

    makeObservable(this, {
      games: observable,
      loading: observable,
      error: observable,
      currentPage: observable,
      totalPages: observable,
      searchTerm: observable,
      setSearchTerm: action,
      setPage: action,
      fetchGames: action,
      reset: action,
    })
  }

  setSearchTerm = (term) => {
    this.searchTerm = term
    this.currentPage = 1
    this.fetchGames()
  }

  setPage = (page) => {
    this.currentPage = page
    this.fetchGames()
  }

  fetchGames = async () => {
    this.loading = true
    this.error = null

    try {
      const data = await getGames(this.currentPage, this.pageSize, this.searchTerm)

      runInAction(() => {
        this.games = data.results
        this.totalPages = Math.ceil(data.count / this.pageSize)
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
    this.loading = false
    this.error = null
    this.currentPage = 1
    this.totalPages = 1
    this.searchTerm = ""
  }
}

