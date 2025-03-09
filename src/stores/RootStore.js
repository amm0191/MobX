import { GamesStore } from "./GamesStore"
import { GameDetailsStore } from "./GameDetailsStore"
import { PublishersStore } from "./PublishersStore"
import { TagsStore } from "./TagsStore"
import { GenresStore } from "./GenresStore"
import { CarouselStore } from "./CarouselStore"
import { configure } from "mobx"

// Configuración de MobX para un comportamiento más estricto
configure({
  enforceActions: "always", // Forzar el uso de acciones para modificar el estado
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true,
})

// Clase principal que contiene todas las stores
class RootStore {
  constructor() {
    this.gamesStore = new GamesStore(this)
    this.gameDetailsStore = new GameDetailsStore(this)
    this.publishersStore = new PublishersStore(this)
    this.tagsStore = new TagsStore(this)
    this.genresStore = new GenresStore(this)
    this.carouselStore = new CarouselStore(this)
  }
}

// Crear una instancia de la store
const rootStore = new RootStore()

export default rootStore

