import Image from 'next/image'
import contactStyles from '../styles/Contact.module.css'

export default function Contact() {
    return (
        <div className={contactStyles.contact} id="contact">

            <div className={contactStyles.contactDetails}>

                <h2>C<span>ontact Me</span></h2>

                <div className="contactText">

                    <p>
                        &quot;Want to discuss about a project, collaborate or something else? Do not hesitate to contact me, I am always open to hear from you!&quot;</p>
                </div>

                <div className={contactStyles.reachMe}>

                    <div className={contactStyles.reachMeImg}>
                        <Image src="/images/placeholder.png" alt='placeholder' width={30} height={30} />
                        <span className={contactStyles.imgSpan}>Kigali, Rwanda</span>
                    </div>

                    <div className={contactStyles.reachMeImg}>
                        <Image src="/images/gmail.png" alt='gmail' width={30} height={30} />
                        <span className={contactStyles.imgSpan}>nidedrogba@gmail.com</span>
                    </div>
                    <div className={contactStyles.reachMeImg}>
                        <Image src="/images/whatsapp.png" alt='whatsapp' width={30} height={30} />
                        <span className={contactStyles.imgSpan}>+250788551997</span>
                    </div>
                </div>

            </div>

            <div className={contactStyles.contactForm}>
                <form>
                    <div className="inputRow">
                        <input type="text" className="name" placeholder='Your Name ...'/>
                        <input type="email" className="email" placeholder='Your Email ...'/>
                        <textarea name="message" id="" cols="30" rows="6" className="message" placeholder='Your Message ...'></textarea>
                        <button className="send-message">Send Message</button>
                    </div>
                </form>
            </div>
        </div>
    )
};
