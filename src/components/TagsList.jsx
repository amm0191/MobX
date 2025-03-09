import { Badge } from "react-bootstrap"
import { Link } from "react-router-dom"

const TagsList = ({ tags, title = "Tags" }) => {
  if (!tags || tags.length === 0) return null

  return (
    <div className="mb-4">
      <h5 className="fw-bold mb-2">{title}:</h5>
      <div className="d-flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link key={tag.id} to={`/tags/${tag.id}`} className="text-decoration-none">
            <Badge className="badge-tag">{tag.name}</Badge>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TagsList

