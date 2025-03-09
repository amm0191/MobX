const PlatformsList = ({ platforms }) => {
    if (!platforms || platforms.length === 0) return null
  
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Plataformas:</h3>
        <div className="flex flex-wrap gap-2">
          {platforms.map((platform) => (
            <span key={platform.platform.id} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              {platform.platform.name}
            </span>
          ))}
        </div>
      </div>
    )
  }
  
  export default PlatformsList
  
  