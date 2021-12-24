import Link from 'next/link'
import Image from 'next/image'
import Meta from '../../components/Meta'
import projectStyles from '../../styles/projects/project.module.css'

export default function inyanjaui() {

    return (
        <div className={projectStyles.viewProject}>

            <Meta title='Projects - Inyanja Web Space UI' favicon='../../public/favicon.ico' />

            <div className={projectStyles.projectHeader}>

                <h1>Inyanja Web Space UI</h1>
                <p><Link href="/"><a>Back to home</a></Link></p>
            </div>

            <div className={projectStyles.projectContent}>

                <div className={projectStyles.description}>

                    <h2>D<span>escription</span></h2>

                    <p>This front-end web application was built to manage Inyanja Space Learning UI Project that was being developed but it has now stopped.</p>
                </div>

                <div className={projectStyles.pImages}>
                    <Image src='/images/inyanjaui.JPG' alt='Inyanja Web Space UI' width={400} height={194}></Image>

                    <div className={projectStyles.techNvisit}>

                        <p>Notable Technologies: <span>React.js, Redux, Bootstrap, More ...</span></p>
                        <Link href="http://inyanjaui.herokuapp.com/">
                            <a>Visit Inyanja Web Space UI</a>
                        </Link>
                    </div>
                </div>

            </div>
        </div>)
};
