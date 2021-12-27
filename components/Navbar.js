import navbarStyles from '../styles/Navbar.module.css'
import Link from 'next/link'

export default function Navbar() {

    return (
        <nav className={navbarStyles.navbar}>

            <Link href="/">
                <a className={navbarStyles.brand}>
                    <span className='ayi'>I</span><span className='pi'>P</span><span className='ani'>N</span>
                </a>
            </Link>

            <ul className={navbarStyles.links}>
                <li><Link href="/#home"><a>H<span>ome</span></a></Link></li>
                <li><Link href="/#about"><a>A<span>bout</span></a></Link></li>
                <li><Link href="/#projects"><a>P<span>rojects</span></a></Link></li>
                <li><Link href="/#contact"><a>C<span>ontact</span></a></Link></li>
            </ul>
        </nav>
    )
};
