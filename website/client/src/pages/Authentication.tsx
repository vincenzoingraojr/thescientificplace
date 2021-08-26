import { useState } from "react";
import { setAccessToken } from "../accessToken";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";

function Authentication() {
    const [login] = useLoginMutation();
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
                        onSubmit={async e => {
                            e.preventDefault();
                            const response = await login({
                                variables: {
                                    username,
                                    password
                                },
                                update: (store, { data }) => {
                                    if (!data) {
                                      return null;
                                    }
                        
                                    store.writeQuery<MeQuery>({
                                        query: MeDocument,
                                        data: {
                                            me: data.login.user as any
                                        }
                                    });
                                }
                            });
                            
                            if (response && response.data) {
                                setAccessToken(response.data.login.accessToken!);
                            }
                        }}
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