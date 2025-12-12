import { useState } from 'react'

/**
 * Optimized Image component for Vite/React
 * - Enforces explicit width/height to prevent CLS
 * - Handles lazy loading
 * - Supports priority loading for LCP images
 * - Provides error fallback
 */
function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes,
  aspectRatio,
  fallback,
  objectFit = 'cover',
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  // Ensure we have dimensions
  if (!width || !height) {
    console.warn(`OptimizedImage: Missing width or height for ${alt || src}. This may cause CLS.`)
  }

  const handleError = () => {
    if (fallback && !hasError) {
      setHasError(true)
      setImgSrc(fallback)
    }
  }

  const containerStyle = aspectRatio
    ? { aspectRatio, width: '100%' }
    : width && height
    ? { width: '100%', aspectRatio: `${width}/${height}` }
    : {}

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit
  }

  return (
    <div className={className} style={containerStyle}>
      <img
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={imageStyle}
        sizes={sizes}
        onError={handleError}
        {...props}
      />
    </div>
  )
}

export default OptimizedImage

