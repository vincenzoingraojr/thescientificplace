import { useState } from "react";

function Authentication() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
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
                    <form 
                        className="login-form"
                    >
                        <input type="text" placeholder="Username" value={username} onChange={e => {
                            setUsername(e.target.value);
                        }} />
                        <input type="password" placeholder="Password" value={password} onChange={e => {
                            setPassword(e.target.value);
                        }} />
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