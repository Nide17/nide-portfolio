import Link from 'next/link'
import Image from 'next/image'
import Meta from '../../components/Meta'
import projectStyles from '../../styles/projects/project.module.css'

export default function paypal2() {

    return (
        <div className={projectStyles.viewProject}>

            <Meta title='Projects - Paypal2' favicon='../../public/favicon.ico' />

            <div className={projectStyles.projectHeader}>

                <h1>Paypal2</h1>
                <p><Link href="/"><a>Back to home</a></Link></p>
            </div>

            <div className={projectStyles.projectContent}>

                <div className={projectStyles.description}>

                    <h2>D<span>escription</span></h2>

                    <p>This front-end app was built with React.js to mimic PayPal&apos;s website</p>

                    <p>This web application was done to mimic the real paypal website with react.js.</p>
                </div>

                <div className={projectStyles.pImages}>
                    <Image src='/images/paypal2.JPG' alt='Paypal2' width={400} height={194}></Image>

                    <div className={projectStyles.techNvisit}>

                        <p>Notable Technologies: <span>React.js, HTML, CSS, Bootstrap, More ...</span></p>
                        <Link href="http://paypal2.herokuapp.com/">
                            <a>Visit Paypal2</a>
                        </Link>
                    </div>
                </div>

            </div>
        </div>)
};
