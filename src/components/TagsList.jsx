import { Link } from "react-router-dom"

const TagsList = ({ tags, title = "Tags" }) => {
  if (!tags || tags.length === 0) return null

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">{title}:</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag.id}
            to={`/games/tag/${tag.id}`}
            className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TagsList

