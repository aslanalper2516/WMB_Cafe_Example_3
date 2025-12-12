import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import Menu from '../components/Menu'
import SignatureProductsSlider from '../components/SignatureProductsSlider'
import WhyChooseUs from '../components/WhyChooseUs'
import Franchise from '../components/Franchise'
import FranchiseApplication from '../components/FranchiseApplication'
import Separator from '../components/Separator'
import News from '../components/News'
import Footer from '../components/Footer'
import FloatingActions from '../components/FloatingActions'

function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Menu />
      <SignatureProductsSlider />
      <WhyChooseUs />
      <Franchise />
      <FranchiseApplication />
      <Separator />
      <News />
      <Footer />
      <FloatingActions />
    </div>
  )
}

export default Home

