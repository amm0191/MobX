import { makeObservable, observable, action, runInAction } from "mobx"
import { getPublishers, getPublisherDetails, getGamesByPublisher } from "../services/api"

export class PublishersStore {
  publishers = []
  currentPublisher = null
  publisherGames = []
  loading = false
  error = null
  currentPage = 1
  totalPages = 1
  searchTerm = ""
  pageSize = 20

  constructor(rootStore) {
    this.rootStore = rootStore

    makeObservable(this, {
      publishers: observable,
      currentPublisher: observable,
      publisherGames: observable,
      loading: observable,
      error: observable,
      currentPage: observable,
      totalPages: observable,
      searchTerm: observable,
      setSearchTerm: action,
      setPage: action,
      fetchPublishers: action,
      fetchPublisherDetails: action,
      fetchPublisherGames: action,
      reset: action,
    })
  }

  setSearchTerm = (term) => {
    this.searchTerm = term
    this.currentPage = 1
    this.fetchPublishers()
  }

  setPage = (page) => {
    this.currentPage = page
    if (this.currentPublisher) {
      this.fetchPublisherGames(this.currentPublisher.id)
    } else {
      this.fetchPublishers()
    }
  }

  fetchPublishers = async () => {
    this.loading = true
    this.error = null

    try {
      const data = await getPublishers(this.currentPage, this.pageSize, this.searchTerm)

      runInAction(() => {
        this.publishers = data.results
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

  fetchPublisherDetails = async (id) => {
    this.loading = true
    this.error = null
    this.currentPublisher = null
    this.publisherGames = []
    this.currentPage = 1

    try {
      const data = await getPublisherDetails(id)

      runInAction(() => {
        this.currentPublisher = data
        this.fetchPublisherGames(id)
      })
    } catch (error) {
      runInAction(() => {
        this.error = error.message
        this.loading = false
      })
    }
  }

  fetchPublisherGames = async (id) => {
    this.loading = true
    this.error = null

    try {
      const data = await getGamesByPublisher(id, this.currentPage, this.pageSize)

      runInAction(() => {
        this.publisherGames = data.results
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
    this.publishers = []
    this.currentPublisher = null
    this.publisherGames = []
    this.loading = false
    this.error = null
    this.currentPage = 1
    this.totalPages = 1
    this.searchTerm = ""
  }
}

