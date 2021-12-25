import Link from 'next/link'
import Image from 'next/image'
import Meta from '../../components/Meta'
import projectStyles from '../../styles/projects/project.module.css'

export default function okaziyo() {

    return (
        <div className={projectStyles.viewProject}>

            <Meta title='Projects - Okaziyo' favicon='../../public/favicon.ico' />

            <div className={projectStyles.projectHeader}>

                <h1>Okaziyo</h1>
                <p><Link href="/"><a>Back to home</a></Link></p>
            </div>

            <div className={projectStyles.projectContent}>

                <div className={projectStyles.description}>

                    <h2>D<span>escription</span></h2>

                    <p>Okaziyo is a web application that helps people to buy, sell or rent anything. It gives people good time to search, plan and decide what to buy, sell or rent. It also gives information about jobs and scholarships and tenders and more. Okaziyo is a part of Elysium Group Ltd.</p>

                    <p>This web application helps people to view and take actions against jobs, scholarships, products to be sold. On this app, the administrator can post jobs, scholarships, products and more via the dashboard once he is logged in. Users can also contact the admin via the contact form and the admin recieves the message as the email</p>
                </div>

                <div className={projectStyles.pImages}>
                    <Image src='/images/okaziyo.JPG' alt='Okaziyo' width={400} height={194}></Image>

                    <div className={projectStyles.techNvisit}>

                        <p>Notable Technologies: <span>React.js, Redux, Reactstrap, Bootstrap, Node.js, Express.js, MongoDB, AWS, More ...</span></p>

                        <div className={projectStyles.visitProject}>
                            <Link href="https://github.com/Nide17/okaziyo-client"><a>
                                <Image src="/images/github1.png" alt='GitHub Repo' width={24} height={24} />
                            </a></Link>

                            <Link href="https://github.com/Nide17/okaziyo-server"><a>
                                <Image src="/images/github1.png" alt='GitHub Repo' width={24} height={24} />
                            </a></Link>

                            <Link href="https://www.okaziyo.com/"><a>
                                <Image src="/images/website.png" alt='Website' width={24} height={24} />
                            </a></Link>

                        </div>

                    </div>
                </div>

            </div>
        </div>)
};
