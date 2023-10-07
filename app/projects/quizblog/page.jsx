import Link from 'next/link'
import Image from 'next/image'
import projectStyles from '../../../styles/projects/project.module.css'

export default function quizblog() {

    return (
        <div className={projectStyles.viewProject}>
            <div className={projectStyles.projectHeader}>

                <h1>Quiz Blog Rwanda</h1>
                <p><Link href="/">Back to home</Link></p>
            </div>

            <div className={projectStyles.projectContent}>

                <div className={projectStyles.description}>

                    <h2>D<span>escription</span></h2>

                    <p>Quiz Blog is a web application that provides a multi-category space for people to quiz from. It gives people good time to fix what they studied and even prepare for exams.</p>

                    <p>This web application helps learners to view, attempt quizzes and review their answers. It contains also notes and past papers for various exams. On this app the user can attempt any quiz but answers and reviews are saved once he or she is logged in. He can also download notes and past papers when he is logged too. Users can also contact the admin via the contact form and the admin recieves the message as the email.</p>
                </div>

                <div className={projectStyles.pImages}>
                    <Image src='/images/quizblog.JPG' alt='Quiz Blog Rwanda' width={400} height={194}></Image>

                    <div className={projectStyles.techNvisit}>

                        <p>Notable Technologies: <span>React.js, Redux, Reactstrap, Bootstrap, Node.js, Express.js, MongoDB, AWS, More ...</span></p>
                        
                        <div className={projectStyles.visitProject}>

                            <Link href="https://github.com/Nide17/quiz-blog-rw">
                                <Image src="/images/github1.png" alt='GitHub Repo' width={24} height={24} />
                            </Link>

                            <Link href="http://quizblog.rw/">
                                <Image src="/images/website.png" alt='Website' width={24} height={24} />
                            </Link>

                        </div>

                    </div>
                </div>

            </div>
        </div>)
};
