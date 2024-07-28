import Image from 'next/image'
import Link from 'next/link'
import aboutStyles from '../styles/About.module.css'

export default function About() {

    return (

        <div className={aboutStyles.about} id="about">
            <div className={aboutStyles.bio}>
                <h2>A<span>bout Me</span></h2>
                <p>I am a skilled Full-stack Software Engineer with over 4 years of experience, specializing in languages including C, C++, JavaScript, Java, Python and more. I excel in utilizing a diverse range of technologies, including Node/Express, Flask, SpringBoot, MongoDB, and PostgreSQL for back-end and React.js, Redux, Next.js, Bootstrap and Tailwind for front-end development. I worked as an IT Engineer for several years and currently, I am immersing in Data Analysis to leverage my analytical skills and IT expertise to provide valuable insights and technical assistance within organizations. I hold a Scrum Master™ certification and 10+ other software engineering certificates that shows my commitment to continuous learning and improvement. I aim to consistently deliver innovative and efficient solutions that meet or exceed evolving business needs while ensuring also the smooth operation of IT systems.
                </p>
                <small>
                    <blockquote>
                        <Link href="/aboutdocs" className='docs'>Click here to get my résumé and additional details...</Link>
                    </blockquote>
                </small>
            </div>
            <div className={aboutStyles.profilePic}>
                <Image src="/images/profilepic.jpg" alt="profilepic" width={300} height={350} />
            </div>
        </div>)
};