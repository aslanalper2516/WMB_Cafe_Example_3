import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Products from './pages/Products'
import Franchise from './pages/Franchise'
import Locations from './pages/Locations'
import MenuPage from './pages/MenuPage'

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/franchise" element={<Franchise />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/menu" element={<MenuPage />} />
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </LanguageProvider>
  )
}

export default App


