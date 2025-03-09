import { makeObservable, observable, action, runInAction } from "mobx"
import { getGameDetails } from "../services/api"

export class GameDetailsStore {
  game = null
  loading = false
  error = null

  constructor(rootStore) {
    this.rootStore = rootStore

    makeObservable(this, {
      game: observable,
      loading: observable,
      error: observable,
      fetchGameDetails: action,
      reset: action,
    })
  }

  fetchGameDetails = async (id) => {
    this.loading = true
    this.error = null
    this.game = null

    try {
      const data = await getGameDetails(id)

      runInAction(() => {
        this.game = data
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
    this.game = null
    this.loading = false
    this.error = null
  }
}

