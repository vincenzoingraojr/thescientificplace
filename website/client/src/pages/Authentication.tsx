function Authentication() {
    return (
        <>
            <div className="auth-container">
                <div className="container-item">
                    <div className="site-title">
                        The Scientific Place
                    </div>
                    <div>
                        This is a place where scientists and science lovers can share ideas, research papers and projects.
                    </div>
                </div>
                <div className="container-item">
                    <form className="login-form">
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                        <button className="login" type="submit">Log in</button>
                    </form>
                    <div className="line"></div>
                    <button className="signup">Sign up</button>
                </div>
            </div>
            <footer>
                &copy; 2021 The Scientific Place
            </footer>
        </>
    );
}

export default Authentication;