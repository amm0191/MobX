import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-green-400 to-amber-300 py-6 shadow-lg border-b-4 border-green-400">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-extrabold text-white drop-shadow-lg">
          Videojuegos Moya
        </Link>
        <nav className="flex space-x-8">
          <Link to="/" className="text-white text-lg font-semibold hover:text-gray-800 transition-colors">
            Videojuegos
          </Link>
          <Link to="/publishers" className="text-white text-lg font-semibold hover:text-gray-800 transition-colors">
            Publishers
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header

