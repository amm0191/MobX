import { makeObservable, observable, action, runInAction } from "mobx"
import { getGames } from "../services/api"

export class CarouselStore {
  games = []
  loading = false
  error = null
  currentIndex = 0

  constructor(rootStore) {
    this.rootStore = rootStore

    makeObservable(this, {
      games: observable,
      loading: observable,
      error: observable,
      currentIndex: observable,
      setCurrentIndex: action,
      nextSlide: action,
      prevSlide: action,
      fetchFeaturedGames: action,
      reset: action,
    })
  }

  setCurrentIndex = (index) => {
    this.currentIndex = index
  }

  nextSlide = () => {
    this.currentIndex = (this.currentIndex + 1) % this.games.length
  }

  prevSlide = () => {
    this.currentIndex = (this.currentIndex - 1 + this.games.length) % this.games.length
  }

  fetchFeaturedGames = async () => {
    this.loading = true
    this.error = null

    try {
      const data = await getGames(1, 5, "")

      runInAction(() => {
        this.games = data.results.filter((game) => game.background_image)
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
    this.currentIndex = 0
  }
}

