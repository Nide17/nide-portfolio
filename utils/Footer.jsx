import Image from 'next/image'
import Link from 'next/link'
import footerStyles from '../styles/footer.module.css'

export default function Footer() {
    return (

        <div className={footerStyles.footer}>
            <div className={footerStyles.sitemap}>

                <div className={footerStyles.sitemapBorder}>
                    <h2>E<span>xplore</span></h2>
                    <ul>
                        <li><Link href="#home">Home</Link></li>
                        <li><Link href="#about">About</Link></li>
                        <li><Link href="#projects">Projects</Link></li>
                        <li><Link href="#contact">Contact</Link></li>
                    </ul>
                </div>

            </div>

            <hr />

            <div className={footerStyles.rightPart}>
                <small>
                    <blockquote>~Hard Work pays off~</blockquote>
                </small>

                <div className={footerStyles.socialIcons}>
                    <Link href="https://github.com/Nide17">
                        <Image src="/images/github.png" alt='github' width={32} height={32} />
                    </Link>

                    <Link href="https://www.upwork.com/freelancers/~013f5da808a8367c20/">
                        <Image src="/images/upwork.png" alt='upwork' width={32} height={32} />
                    </Link>

                    <Link href="https://www.linkedin.com/in/niyomwungeri-parmenide-ishimwe-1a5394123/">
                        <Image src="/images/linkedin.png" alt='linkedin' width={32} height={32} />
                    </Link>
                </div>

                <div className={footerStyles.copyright}>
                    &copy; Niyomwungeri Parmenide Ishimwe {new Date().getFullYear()} - All Rights Reserved
                </div>

            </div>
        </div>)
};
