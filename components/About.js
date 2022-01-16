import Image from 'next/image'
import Link from 'next/link'
import aboutStyles from '../styles/About.module.css'

export default function About() {

    return (

        <div className={aboutStyles.about} id="about">

            <div className={aboutStyles.bio}>

                <h2>A<span>bout Me</span></h2>

                <p>I am a Full-stack Software Developer from Kigali-Rwanda, specializing mostly with the front-end and the back-end development. Experienced with all stages of the development cycle for dynamic software projects. I love to solve problems through software using HTML/CSS, React.js, Redux, Next.js, Bootstrap on the front-end to create nice UI for the web; and Node.js, Express.js, Python/Flask, MongoDB and PostgreSQL for back-end development</p>

                <small>
                    <blockquote>
                        <Link href="/aboutdocs"><a className='docs'>Find my resume and more ...</a></Link>
                    </blockquote>
                </small>
            </div>

            <div className={aboutStyles.profilePic}>
                <Image src="/images/profilepic.jpg" alt="profilepic" width={300} height={300} />
            </div>
        </div>)
};