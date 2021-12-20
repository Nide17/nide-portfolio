export default function Contact() {
    return (
        <div className="contact" id="contact">
            <div className="contact-text">
                Want to discuss about a project or something else? Do not hesitate to contact me, I am always open to hear from you!
            </div>

            <div className="contact-form">
                <form action="">
                    <div className="input-row">
                        <input type="text" className="name" />
                        <input type="email" className="email" />
                        <textarea name="message" id="" cols="30" rows="10" className="message"></textarea>
                        <button className="send-message">Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
};
