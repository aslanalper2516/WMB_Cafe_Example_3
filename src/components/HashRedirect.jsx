import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

// Redirect component for old hash URLs
function HashRedirect() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Only handle hash redirects on home page
    if (location.pathname === '/' && location.hash) {
      const hash = location.hash.substring(1) // Remove #
      const hashMap = {
        'about': '/about',
        'products': '/products',
        'menu': '/menu',
        'franchise': '/franchise',
        'locations': '/locations'
      }

      if (hashMap[hash]) {
        navigate(hashMap[hash], { replace: true })
      }
    }
  }, [location, navigate])

  return null
}

export default HashRedirect

