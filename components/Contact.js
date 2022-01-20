import { useState } from 'react'
import Image from 'next/image'
import contactStyles from '../styles/Contact.module.css'

export default function Contact() {

    const [state, setState] = useState({
        name: '',
        email: '',
        message: ''
    })

    const onChangeHandler = e => {
        const { name, value } = e.target
        setState(state => ({ ...state, [name]: value }))
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const { name, email, message } = state;

        // Create user object
        const contactMsg = {
            name,
            email,
            message
        };

        fetch('https://nide-portfolio-server.herokuapp.com/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactMsg),
        })

        console.log(contactMsg);

        // Reset fields
        setState({
            name: '',
            email: '',
            message: ''
        })
    }

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

                <form onSubmit={onSubmitHandler}>

                    <div className="inputRow">
                        <input name="name" type="text" className="name" placeholder='Your Name ...' onChange={onChangeHandler} value={state.name || ""} required />

                        <input name="email" type="email" className="email" placeholder='Your Email ...' onChange={onChangeHandler} value={state.email || ""} required />

                        <textarea name="message" id="" cols="30" rows="6" className="message" placeholder='Your Message ...' onChange={onChangeHandler} value={state.message || ""} required></textarea>

                        <button className="send-message">Send Message</button>
                        {/* <button className="send-message" onClick={onSubmitHandler}>Send Message</button> */}
                    </div>
                </form>
            </div>
        </div>
    )
};
