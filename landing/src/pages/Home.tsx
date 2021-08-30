function Home() {
    return (
        <div className="landing-container">
            <div className="landing-inner-container">
                <div className="site-title">The Scientific Place</div>
                <div className="landing-content-text margin-bottom-24">
                    The Scientific Place is a social network dedicated to scientists and those who love science. If you need to contact me, you can send me an <a href="mailto:vincenzo@thescientificplace.com" title="My personal email.">email</a>. <br />
                    <br />
                    If you want to see the progress of the work, you can visit the <a href="https://github.com/vincenzoingraojr/thescientificplace" target="_blank" rel="noreferrer" title="The GitHub repository of the social network.">GitHub repository</a> of the social network. <br />
                    <br />
                    You can also contact me by filling out the form below.
                </div>
                <form name="contact" data-netlify="true" action="/response">
                    <input type="hidden" name="form-name" value="contact" />
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" />
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" />
                    <label htmlFor="subject">Subject</label>
                    <input type="text" id="subject" name="subject" />
                    <label htmlFor="message">Message</label>
                    <textarea name="message" id="message" rows={3} />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
}

export default Home;