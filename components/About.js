import Image from 'next/image'

export default function About() {
    return (<div className="about">
        <div className="bio">
            <p>Hello, this is Niyomwungeri Parmenide Ishimwe!
                I am a full-stack web developer from Kigali, Rwanda.

                With HTML/CSS, React.js, Next.js, Bootstrap on the front-end, I create nice UI for the web. and NodeJS, Express, MongoDB, PHP/MySQL and PostgreSQL on the Back-end</p>

            <small>
                <blockquote>
                    ~Work Hard, Play Hard~
                </blockquote>
            </small>
        </div>

        <div className="profile-pic">
            <Image src="/images/profilepic.jpeg" alt="profilepic" width={200} height={200} />
        </div>
    </div>)
};
