import Image from 'next/image'

export default function Welcome() {
    return (
        <div className="welcome">

            <Image src="/images/NIDEiMAGE.JPG" alt="nideimage" width={200} height={200} />
            <p>Hi, I am Niyomwungeri Parmenide Ishimwe
                <br />
                I am a Software Developer, Software Designer, IT Support Engineer from Kigali, Rwanda.</p>
        </div>)
};
