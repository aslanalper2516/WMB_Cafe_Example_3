# About Us Page Integration Guide

The About Us page has been created at `src/pages/AboutUs.jsx`.

## Current Setup

The project uses React + Vite without a router. Here are options to integrate the About Us page:

## Option 1: Simple Routing with React Router (Recommended)

1. Install React Router:
```bash
npm install react-router-dom
```

2. Update `src/main.jsx`:
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
```

3. Update `src/App.jsx`:
```jsx
import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import HomePage from './pages/HomePage'
import AboutUs from './pages/AboutUs'

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </LanguageProvider>
  )
}

export default App
```

4. Create `src/pages/HomePage.jsx` (move current App.jsx content there)

5. Update Header navigation links to use `/about` instead of `#about`

## Option 2: Conditional Rendering (Quick Solution)

Update `src/App.jsx` to conditionally render based on URL:

```jsx
import { useState, useEffect } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import AboutUs from './pages/AboutUs'
// ... other imports

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    const path = window.location.pathname
    setCurrentPage(path === '/about' ? 'about' : 'home')
  }, [])

  if (currentPage === 'about') {
    return (
      <LanguageProvider>
        <AboutUs />
      </LanguageProvider>
    )
  }

  // ... existing home page content
}
```

## SEO Considerations

The About Us page includes:
- ✅ Proper H1-H3 heading hierarchy
- ✅ Semantic HTML structure
- ✅ Alt text for images
- ✅ Accessible navigation
- ✅ TR/EN language support

For better SEO, consider adding:
- Meta tags (title, description)
- Open Graph tags
- Structured data (JSON-LD)

## Accessibility

The page includes:
- ✅ WCAG AA contrast ratios
- ✅ Keyboard navigation support
- ✅ ARIA labels where needed
- ✅ Focus-visible outlines
- ✅ Semantic HTML

