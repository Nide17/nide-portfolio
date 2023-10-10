import Image from 'next/image'
import Link from 'next/link'
import projectsStyles from '../../styles/Projects.module.css'
import projects from './data.js'

export default function Projects() {

    return (
        <div className={projectsStyles.projects} id="projects">
            <h2>P<span>rojects</span></h2>
            <div className={projectsStyles.projectsList}>
                {projects.map((project, index) => (
                    <div className={projectsStyles.listItem} key={index}>
                        <Link href={`/projects/${project.slug}`}>
                            <Image src={project.image} alt={project.title} width={350} height={170}></Image>
                            <h5>{project.title}</h5>
                            <div className={projectsStyles.toolsBtn}>
                                {project.tools.map((tool, index) => (
                                    <button className="tools-round" key={index}>{tool}</button>
                                ))}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>)
};
