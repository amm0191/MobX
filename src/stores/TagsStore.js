import { makeObservable, observable, action, runInAction } from "mobx"
import { getGamesByTag } from "../services/api"

export class TagsStore {
  games = []
  tagName = ""
  loading = false
  error = null
  currentPage = 1
  totalPages = 1
  pageSize = 20
  currentTagId = null

  constructor(rootStore) {
    this.rootStore = rootStore

    makeObservable(this, {
      games: observable,
      tagName: observable,
      loading: observable,
      error: observable,
      currentPage: observable,
      totalPages: observable,
      currentTagId: observable,
      setPage: action,
      fetchGamesByTag: action,
      reset: action,
    })
  }

  setPage = (page) => {
    this.currentPage = page
    this.fetchGamesByTag(this.currentTagId)
  }

  fetchGamesByTag = async (tagId) => {
    this.loading = true
    this.error = null
    this.currentTagId = tagId

    try {
      const data = await getGamesByTag(tagId, this.currentPage, this.pageSize)

      runInAction(() => {
        this.games = data.results
        this.totalPages = Math.ceil(data.count / this.pageSize)

        // Intentar obtener el nombre del tag del primer juego
        if (data.results.length > 0) {
          const tag = data.results[0].tags.find((t) => t.id.toString() === tagId.toString())
          if (tag) {
            this.tagName = tag.name
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
    this.tagName = ""
    this.loading = false
    this.error = null
    this.currentPage = 1
    this.totalPages = 1
    this.currentTagId = null
  }
}

