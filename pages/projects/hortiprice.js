import Link from 'next/link'
import Image from 'next/image'
import Meta from '../../components/Meta'
import projectStyles from '../../styles/projects/project.module.css'

export default function hortiprice() {

    return (
        <div className={projectStyles.viewProject}>

            <Meta title='Projects - Hortiprice' favicon='../../public/favicon.ico' />

            <div className={projectStyles.projectHeader}>

                <h1>Hortiprice</h1>
                <p><Link href="/"><a>Back to home</a></Link></p>
            </div>

            <div className={projectStyles.projectContent}>

                <div className={projectStyles.description}>

                    <h2>D<span>escription</span></h2>

                    <p>This web application was made Elysium Group, a company that has been established in November 2019 to provide Consultancy services in Architectural and Engineering activities and related technical consultancy, Consultancy in Project Management and Estate Construction, Consultancy in the field of construction, Control and supervision of works and real estate appraisals Research and experimental development on natural sciences and engineering, Technical testing and analysis, Specialized design activities, ICT Consultancy, Business development and management consultancy, accounting, Auditing, book-keeping Consultancy and other scientific research.</p>

                    <p>This web application helps this company for online presense and displays their services, projects, team and various contact ways.</p>
                </div>

                <div className={projectStyles.pImages}>
                    <Image src='/images/hortiprice.JPG' alt='Hortiprice' width={400} height={194}></Image>

                    <div className={projectStyles.techNvisit}>

                        <p>Notable Technologies: <span>React.js, Redux, Node.js, Express.js, MongoDB, Reactstrap, Bootstrap, More ...</span></p>
                        <Link href="http://hortiprice.herokuapp.com/">
                            <a>Visit Hortiprice</a>
                        </Link>
                    </div>
                </div>

            </div>
        </div>)
};
