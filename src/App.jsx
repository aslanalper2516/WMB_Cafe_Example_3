import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import HashRedirect from './components/HashRedirect'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Products from './pages/Products'
import Franchise from './pages/Franchise'
import Locations from './pages/Locations'
import MenuPage from './pages/MenuPage'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'

function App() {
  return (
    <LanguageProvider>
      <HashRedirect />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/franchise" element={<Franchise />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </LanguageProvider>
  )
}

export default App


