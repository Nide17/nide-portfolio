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
                    <Image src="/images/github.png" alt='github' width={18} height={18} />
                    <Image src="/images/upwork.png" alt='upwork' width={18} height={18} />
                    <Image src="/images/linkedin.png" alt='linkedin' width={18} height={18} />
                    <Image src="/images/instagram.png" alt='instagram' width={18} height={18} />
                    <Image src="/images/twitter.png" alt='twitter' width={18} height={18} />
                    <Image src="/images/facebook.png" alt='facebook' width={18} height={18} />
                </div>

                <div className={footerStyles.copyright}>
                    &copy; Niyomwungeri Parmenide Ishimwe 2021 - All Rights Reserved
                </div>

            </div>
        </div>)
};
