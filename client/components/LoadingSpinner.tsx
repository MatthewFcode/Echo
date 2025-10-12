const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm">
      <div className="relative">
        {/* Outer ring */}
        <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>

        {/* Spinning ring */}
        <div className="absolute left-0 top-0 h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    </div>
  )
}

export default LoadingSpinner
