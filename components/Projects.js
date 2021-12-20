import Image from 'next/image'
import Link from 'next/link'

export default function Projects() {

    return (<div className="projects" id="projects">
        <div className="projects-list">
            <div className="elysiumgroupltd">
                <Link href="/projects/elysiumgroupltd">
                    <a>
                        <Image src='/images/profilepic.jpeg' alt='Elysium Group Ltd' width={200} height={200}></Image>
                        <button className="tools-round">React.js</button>
                        <button className="tools-round">Node.js</button>
                        <button className="tools-round">Express.js</button>
                        <button className="tools-round">MongoDB</button>
                        <h3>Elysium Group Ltd</h3>
                    </a>
                </Link>
            </div>
            <div className="quizblog">
                <Link href="/projects/quizblog">
                    <a>
                        <Image src='/images/profilepic.jpeg' alt='Quiz Blog' width={200} height={200}></Image>
                        <button className="tools-round">React.js</button>
                        <button className="tools-round">Node.js</button>
                        <button className="tools-round">Express.js</button>
                        <button className="tools-round">MongoDB</button>
                        <h3>Quiz Blog</h3>
                    </a>
                </Link>
            </div>
            <div className="okaziyo">
                <Link href="/projects/okaziyo">
                    <a>
                        <Image src='/images/profilepic.jpeg' alt='Okaziyo' width={200} height={200}></Image>
                        <button className="tools-round">React.js</button>
                        <button className="tools-round">Node.js</button>
                        <button className="tools-round">Express.js</button>
                        <button className="tools-round">MongoDB</button>
                        <h3>Okaziyo</h3>
                    </a>
                </Link>
            </div>
        </div>
    </div>)
};
