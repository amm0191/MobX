import { Badge } from "react-bootstrap"

const PlatformsList = ({ platforms }) => {
  if (!platforms || platforms.length === 0) return null

  return (
    <div className="mb-4">
      <h5 className="fw-bold mb-2">Plataformas:</h5>
      <div className="d-flex flex-wrap gap-2">
        {platforms.map((platform) => (
          <Badge key={platform.platform.id} className="badge-platform">
            {platform.platform.name}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default PlatformsList

