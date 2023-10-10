import navbarStyles from '../styles/Navbar.module.css'
import Link from 'next/link'

export default function Navbar() {

    return (
        <nav className={navbarStyles.navbar}>
            <Link href="/" className={navbarStyles.brand}>
                    <span className='ayi'>I</span><span className='pi'>P</span><span className='ani'>N</span>
            </Link>
            <ul className={navbarStyles.links}>
                <li><Link href="/#home">H<span>ome</span></Link></li>
                <li><Link href="/#about">A<span>bout</span></Link></li>
                <li><Link href="/#projects">P<span>rojects</span></Link></li>
                <li><Link href="/#contact">C<span>ontact</span></Link></li>
            </ul>
        </nav>
    )
};
