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
                        <li><Link href="#home"><a>Home</a></Link></li>
                        <li><Link href="#about"><a>About</a></Link></li>
                        <li><Link href="#projects"><a>Projects</a></Link></li>
                        <li><Link href="#contact"><a>Contact</a></Link></li>
                    </ul>
                </div>

            </div>

            <hr />

            <div className={footerStyles.rightPart}>
                <small>
                    <blockquote>~Hard Work pays off~</blockquote>
                </small>

                <div className={footerStyles.socialIcons}>

                    <Link href="https://github.com/Nide17"><a>
                        <Image src="/images/github.png" alt='github' width={18} height={18} />
                    </a></Link>

                    <Link href="https://www.upwork.com/freelancers/~013f5da808a8367c20/"><a>
                        <Image src="/images/upwork.png" alt='upwork' width={18} height={18} />
                    </a></Link>

                    <Link href="https://www.linkedin.com/in/niyomwungeri-parmenide-ishimwe-1a5394123/"><a>
                        <Image src="/images/linkedin.png" alt='linkedin' width={18} height={18} />
                    </a></Link>

                    <Link href="https://www.instagram.com/ishimwe_parmenide"><a>
                        <Image src="/images/instagram.png" alt='instagram' width={18} height={18} />
                    </a></Link>

                    <Link href="https://www.twitter.com/@ishimweparmenid"><a>
                        <Image src="/images/twitter.png" alt='twitter' width={18} height={18} />
                    </a></Link>

                    <Link href="https://web.facebook.com/nide.drogba.7"><a>
                        <Image src="/images/facebook.png" alt='facebook' width={18} height={18} />
                    </a></Link>

                </div>

                <div className={footerStyles.copyright}>
                    &copy; Niyomwungeri Parmenide Ishimwe 2022 - All Rights Reserved
                </div>

            </div>
        </div>)
};
