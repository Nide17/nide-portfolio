import Meta from '../components/Meta'
import Image from 'next/image'
import aboutdocsStyles from '../styles/aboutdocs/aboutdocs.module.css'
import CategoryTabs from '../components/aboutDocs/CategoryTabs'

import { server } from '../config'

export default function aboutdocs({ aboutdocs }) {

    return (
        <div className={aboutdocsStyles.aboutdocs}>
            <Meta title='About - Documents' favicon='../../public/favicon.ico' />

            <div className={aboutdocsStyles.description}>
                <div className={aboutdocsStyles.myimage}>
                    <Image src="/images/NIDEiMAGE.JPG" alt="nideimage" width={280} height={280} />
                </div>

                <p>I am a full-stack web developer with 3+ years of experience in the industry of software development. I am an honest software developer having eager to learn and use new skills and the latest technologies.

                    I am comfortable working on small and big projects personally and with teams and usually striving for customer satisfaction.

                    I design and develop quality and highly responsive webpages with attractive user experience. I also develop highly scalable and secure backends for systems.</p>
                <p>
                    <h5>I like:</h5>

                    <ul>
                        <li>Providing customer satisfaction and memorable user experience(UX)</li>
                        <li>Developing responsive HTML/CSS and JavaScript web applications.</li>
                        <li>Developing optimal, high performance, and secure backend apps.</li>
                    </ul>
                </p>

                <p>Briefly, I approach projects strategically by tracking changes with Git, testing interfaces on a variety of devices to confirm as responsive, documenting, and maintaining the project before and after shipping or deployment.
                    <br />

                    <blockquote>Hope to work with you for your next project!</blockquote>
                </p>
            </div>
            <CategoryTabs aboutdocs={aboutdocs} />
        </div>)
};

// Fetch data
export const getStaticProps = async () => {
    const res = await fetch(`${server}/aboutdocs`)

    const aboutdocs = await res.json()

    return {
        props: {
            aboutdocs
        }
    }
}