import Image from 'next/image'
import Link from 'next/link'
import projectsStyles from '../styles/Projects.module.css'

export default function Projects() {

    return (
        <div className={projectsStyles.projects} id="projects">

            <h2>P<span>rojects</span></h2>

            <div className={projectsStyles.projectsList}>

                <div className={projectsStyles.listItem}>
                    <Link href="/projects/elysiumgroupltd">
                        <a>
                            <Image src='/images/elysiumgroupltd.JPG' alt='Elysium Group Ltd' width={350} height={170}></Image>

                            <h5>Elysium Group Ltd</h5>

                            <div className={projectsStyles.toolsBtn}>
                                <button className="tools-round">React.js</button>
                                <button className="tools-round">Node.js</button>
                                <button className="tools-round">Express.js</button>
                                <button className="tools-round">MongoDB</button>
                                <button className="tools-round">Bootstrap</button>
                            </div>
                        </a>
                    </Link>
                </div>

                <div className={projectsStyles.listItem}>
                    <Link href="/projects/quizblog">
                        <a>
                            <Image src='/images/quizblog.JPG' alt='Quiz Blog' width={350} height={170}></Image>

                            <h5>Quiz Blog</h5>

                            <div className={projectsStyles.toolsBtn}>
                                <button className="tools-round">React.js</button>
                                <button className="tools-round">Node.js</button>
                                <button className="tools-round">Express.js</button>
                                <button className="tools-round">MongoDB</button>
                                <button className="tools-round">Bootstrap</button>
                            </div>
                        </a>
                    </Link>
                </div>

                <div className={projectsStyles.listItem}>
                    <Link href="/projects/okaziyo">
                        <a>
                            <Image src='/images/okaziyo.JPG' alt='Okaziyo' width={350} height={170}></Image>

                            <h5>Okaziyo</h5>

                            <div className={projectsStyles.toolsBtn}>
                                <button className="tools-round">React.js</button>
                                <button className="tools-round">Node.js</button>
                                <button className="tools-round">Express.js</button>
                                <button className="tools-round">MongoDB</button>
                                <button className="tools-round">Bootstrap</button>
                            </div>
                        </a>
                    </Link>
                </div>

                <div className={projectsStyles.listItem}>
                    <Link href="/projects/hortiprice">
                        <a>
                            <Image src='/images/hortiprice.JPG' alt='hortiprice' width={350} height={170}></Image>

                            <h5>Hortiprice</h5>

                            <div className={projectsStyles.toolsBtn}>
                                <button className="tools-round">PHP</button>
                                <button className="tools-round">MySQL</button>
                                <button className="tools-round">Bootstrap</button>
                                <button className="tools-round">HTML</button>
                                <button className="tools-round">CSS</button>
                            </div>
                        </a>
                    </Link>
                </div>

                <div className={projectsStyles.listItem}>
                    <Link href="/projects/paypal2">
                        <a>
                            <Image src='/images/paypal2.JPG' alt='paypal2' width={350} height={170}></Image>

                            <h5>Paypal2</h5>

                            <div className={projectsStyles.toolsBtn}>
                                <button className="tools-round">React.js</button>
                                <button className="tools-round">HTML</button>
                                <button className="tools-round">CSS</button>
                                <button className="tools-round">Bootstrap</button>
                            </div>
                        </a>
                    </Link>
                </div>

                <div className={projectsStyles.listItem}>
                    <Link href="/projects/inyanjaui">
                        <a>
                            <Image src='/images/inyanjaui.JPG' alt='inyanjaui' width={350} height={170}></Image>

                            <h5>Inyanjaui</h5>

                            <div className={projectsStyles.toolsBtn}>
                                <button className="tools-round">React.js</button>
                                <button className="tools-round">Redux</button>
                                <button className="tools-round">Reactstrap</button>
                                <button className="tools-round">Bootstrap</button>
                                <button className="tools-round">HTML/CSS</button>
                            </div>
                        </a>
                    </Link>
                </div>

            </div>
        </div>)
};
