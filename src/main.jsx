import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { StoreProvider } from "./context/StoreContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
)

