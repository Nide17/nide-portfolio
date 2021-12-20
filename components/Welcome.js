import Image from 'next/image'
import welcomeStyles from '../styles/Welcome.module.css'

export default function Welcome() {
    return (
        <div className={welcomeStyles.welcome} id="home">

            <div className="myimage">
                <Image src="/images/NIDEiMAGE.JPG" alt="nideimage" width={280} height={280} />
            </div>

            <div className="my-text">
                <p>Hi, I am Niyomwungeri Parmenide Ishimwe</p>

                <p className={welcomeStyles.typewriter}>
                    I am a

                    <br />
                    <div className={welcomeStyles.dev}>
                        <div className="developer">Web Developer</div></div>

                    <br />
                    <div className={welcomeStyles.des}>
                        <div className="designer">Software Designer</div></div>

                    <br />
                    <div className={welcomeStyles.eng}>
                        <div className="engineer">IT Support Engineer</div></div>

                    <br />
                </p>

            </div>
        </div>)
};
