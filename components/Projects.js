import Image from 'next/image'
import Link from 'next/link'
import projectsStyles from '../styles/Projects.module.css'

export default function Projects() {

    return (
        <div className={projectsStyles.projects} id="projects">

            <div className={projectsStyles.projectsList}>

                <div className={projectsStyles.listItem}>
                    <Link href="/projects/elysiumgroupltd">
                        <a>
                            <Image src='/images/elysiumgroupltd.JPG' alt='Elysium Group Ltd' width={200} height={200}></Image>

                            <div className={projectsStyles.toolsBtn}>
                                <button className="tools-round">React.js</button>
                                <button className="tools-round">Node.js</button>
                                <button className="tools-round">Express.js</button>
                                <button className="tools-round">MongoDB</button>
                            </div>

                            <h3>Elysium Group Ltd</h3>
                        </a>
                    </Link>
                </div>

                <div className={projectsStyles.listItem}>
                    <Link href="/projects/quizblog">
                        <a>
                            <Image src='/images/quizblog.JPG' alt='Quiz Blog' width={200} height={200}></Image>

                            <div className={projectsStyles.toolsBtn}>
                                <button className="tools-round">React.js</button>
                                <button className="tools-round">Node.js</button>
                                <button className="tools-round">Express.js</button>
                                <button className="tools-round">MongoDB</button>
                            </div>

                            <h3>Quiz Blog</h3>
                        </a>
                    </Link>
                </div>

                <div className={projectsStyles.listItem}>
                    <Link href="/projects/okaziyo">
                        <a>
                            <Image src='/images/okaziyo.JPG' alt='Okaziyo' width={200} height={200}></Image>

                            <div className={projectsStyles.toolsBtn}>
                                <button className="tools-round">React.js</button>
                                <button className="tools-round">Node.js</button>
                                <button className="tools-round">Express.js</button>
                                <button className="tools-round">MongoDB</button>
                            </div>

                            <h3>Okaziyo</h3>
                        </a>
                    </Link>
                </div>

            </div>
        </div>)
};
