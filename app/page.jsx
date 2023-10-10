import Welcome from '../utils/Welcome'
import About from '../utils/About'
import Projects from './projects/Projects'
import Contact from '../utils/Contact'
import ScrollTop from '../utils/ScrollTop'
import '../styles/globals.css'

export default function Home() {
  return (
    <>
      <Welcome />
      <About />
      <Projects />
      <Contact />
      <ScrollTop />
    </>
  )
}