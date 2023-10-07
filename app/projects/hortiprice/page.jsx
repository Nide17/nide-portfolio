import Link from 'next/link'
import Image from 'next/image'
import projectStyles from '../../../styles/projects/project.module.css'

export default function hortiprice() {

    return (
        <div className={projectStyles.viewProject}>
            <div className={projectStyles.projectHeader}>
                <h1>Hortiprice</h1>
                <p><Link href="/">Back to home</Link></p>
            </div>

            <div className={projectStyles.projectContent}>

                <div className={projectStyles.description}>

                    <h2>D<span>escription</span></h2>

                    <p>Hortiprice is a web applicaion was built with Python/Flask to help NAEB/PRICE to store, retrieve info about horticulture farmers and their business plans</p>

                    <p>This web application helps the PRICE manager and the horticulture value chain specialist to view, add, update and delete farmers as well as their data. On this app the user can view only these details of farmers.</p>
                </div>

                <div className={projectStyles.pImages}>
                    <Image src='/images/hortiprice.JPG' alt='Hortiprice' width={400} height={194}></Image>

                    <div className={projectStyles.techNvisit}>

                        <p>Notable Technologies: <span>Python, Flask, PostgreSQL, Jinja2, HTML, CSS, Bootstrap, More ...</span></p>

                        <div className={projectStyles.visitProject}>

                            <Link href="https://github.com/Nide17/hortiprice">
                                <Image src="/images/github1.png" alt='GitHub Repo' width={24} height={24} />
                            </Link>

                            <Link href="http://hortiprice.herokuapp.com/">
                                <Image src="/images/website.png" alt='Website' width={24} height={24} />
                            </Link>

                        </div>

                    </div>
                </div>

            </div>
        </div>)
};
