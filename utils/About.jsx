import Image from 'next/image'
import Link from 'next/link'
import aboutStyles from '../styles/About.module.css'

export default function About() {

    return (

        <div className={aboutStyles.about} id="about">
            <div className={aboutStyles.bio}>
                <h2>A<span>bout Me</span></h2>
                <p>I am a skilled Full-stack Software Engineer with over 3+ years of experience, specializing in both front-end and back-end development. I excel in utilizing a diverse range of technologies, including HTML/CSS, React.js, Redux, Next.js, Bootstrap for front-end, and Node.js, Express.js, Flask, SpringBoot, MongoDB, and PostgreSQL for back-end development. Besides, I am also a Data Analyst and an IT Support Engineer, leveraging my analytical skills and IT expertise to provide valuable insights and technical assistance within organizations. My commitment to continuous learning is underscored by holding a Scrum Master™ certification and 10+ other software engineering certificates, allowing me to consistently deliver innovative and efficient solutions that meet or exceed evolving business needs while ensuring the smooth operation of IT systems.
                </p>
                <small>
                    <blockquote>
                        <Link href="/aboutdocs" className='docs'>Discover my résumé and additional details...</Link>
                    </blockquote>
                </small>
            </div>
            <div className={aboutStyles.profilePic}>
                <Image src="/images/profilepic.jpg" alt="profilepic" width={300} height={300} />
            </div>
        </div>)
};