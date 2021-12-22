import Image from 'next/image'
import welcomeStyles from '../styles/Welcome.module.css'

export default function Welcome() {
    return (
        <div className={welcomeStyles.welcome} id="home">

            <div className={welcomeStyles.myimage}>
                <Image src="/images/NIDEiMAGE.JPG" alt="nideimage" width={280} height={280} />
            </div>

            <div className={welcomeStyles.mytext}>
                <p>Hi, I am called Niyomwungeri Parmenide Ishimwe</p>

                <p className={welcomeStyles.typewriter}>
                    <div className={welcomeStyles.iam}>I am a</div>

                    <br />
                    <div className={welcomeStyles.dev}>
                        <div className="developer">- Software Developer</div></div>

                    <br />
                    <div className={welcomeStyles.des}>
                        <div className="designer">- Software Designer</div></div>

                    <br />
                    <div className={welcomeStyles.eng}>
                        <div className="engineer">- IT Support Engineer</div></div>

                    <br />
                </p>

            </div>
        </div>)
};
