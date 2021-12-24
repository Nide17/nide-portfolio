import Welcome from '../components/Welcome'
import About from '../components/About'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ScrollTop from '../components/ScrollTop'

export default function Home() {
  return (
    <>
      <Welcome />
      <About />
      <Projects />
      <Contact />
      <Footer />
      <ScrollTop />
    </>
  )
}