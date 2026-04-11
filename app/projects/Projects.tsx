import Image from 'next/image'
import Link from 'next/link'
import projects from './data'

export default function Projects() {

    return (
        <div id="projects">
            <h2>P<span>rojects</span></h2>
            <div>
                {projects.map((project, index) => (
                    <div key={index}>
                        <Link href={`/projects/${project.slug}`}>
                            <Image src={project.image} alt={project.title} width={350} height={170}></Image>
                            <h5>{project.title}</h5>
                            <div>
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
