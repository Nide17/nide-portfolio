"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import projectStyles from '../../../styles/projects/project.module.css'
import projects from '../data.js'

export default function Project() {

    const { id } = useParams();

    // FIND PROJECT BY ID
    const project = projects.find(project => project.slug === id);

    return (
        <div className={projectStyles.viewProject}>
            <div className={projectStyles.projectHeader}>

                <h1>{project.title}</h1>
                <p><Link href="/">Back to home</Link></p>
            </div>

            <div className={projectStyles.projectContent}>

                <div className={projectStyles.description}>

                    <h2>D<span>escription</span></h2>

                    <p>{project.description}</p>
                </div>

                <div className={projectStyles.pImages}>
                    <Image src={project.image} alt={project.title} width={400} height={194}></Image>

                    <div className={projectStyles.techNvisit}>

                        {/* <p>Notable Technologies: <span>React.js, Redux, Reactstrap, Bootstrap, Node.js, Express.js, MongoDB, AWS, More ...</span></p> */}
                        <p>Notable Technologies: <span>
                            {
                                project.tools.map((tool, index) => {
                                    return <span key={index}>{tool}, </span>
                                })
                            } More ...</span></p>

                        <div className={projectStyles.visitProject}>

                            <Link href={project.githubFrontEnd}>
                                <Image src="/images/github1.png" alt='GitHub Repo' width={24} height={24} />
                            </Link>

                            {project.githubBackEnd &&
                                <Link href={project.githubBackEnd}>
                                    <Image src="/images/github1.png" alt='GitHub Repo' width={24} height={24} />
                                </Link>
                            }
                            {project.link &&
                                <Link href={project.link}>
                                    <Image src="/images/website.png" alt='Website' width={24} height={24} />
                                </Link>
                            }

                        </div>

                    </div>
                </div>

            </div>
        </div>)
};
