"use client"
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation';
import welcomeStyles from '../styles/Welcome.module.css'

export default function Welcome() {
    return (

        <div className={welcomeStyles.welcome} id="home">
            <div className={welcomeStyles.myimage}>
                <Image src="/images/NIDEiMAGE.JPG" alt="nideimage" width={280} height={280} />
            </div>
            <div className={welcomeStyles.mytext}>
                <p>Greetings, my name is Niyomwungeri Parmenide Ishimwe</p>
                <TypeAnimation
                    sequence={[
                        "I'm a Software Engineer",
                        1500,
                        "I'm a Data Analyst",
                        1500,
                        "I'm an IT Support Engineer",
                        1500,
                    ]}
                    speed={30}
                    repeat={Infinity}
                    className={welcomeStyles.typeAnimation}
                />
            </div>
        </div>)
}
