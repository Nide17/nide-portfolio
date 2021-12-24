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

                    <p>Quiz Blog is a web application that provides a multi-category space for people to quiz from. It gives people good time to fix what they studied and even prepare for exams.</p>

                    <p>This web application helps learners to view, attempt quizzes and review their answers. It contains also notes and past papers for various exams. On this app the user can attempt any quiz but answers and reviews are saved once he or she is logged in. He can also download notes and past papers when he is logged too.</p>
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