import { LanguageProvider } from './context/LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import SignatureProduct from './components/SignatureProduct'
import WhyChooseUs from './components/WhyChooseUs'
import Franchise from './components/Franchise'
import Separator from './components/Separator'
import News from './components/News'
import Footer from './components/Footer'
import FloatingActions from './components/FloatingActions'

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Header />
        <Hero />
        <About />
        <Menu />
        <SignatureProduct />
        <WhyChooseUs />
        <Franchise />
        <Separator />
        <News />
        <Footer />
        <FloatingActions />
      </div>
    </LanguageProvider>
  )
}

export default App


