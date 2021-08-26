import { useState } from "react";
import { setAccessToken } from "../accessToken";
import { Modal } from "../components/modal/Modal";
import { useModal } from "../components/modal/useModal";
import { MeDocument, MeQuery, useLoginMutation, useSignupMutation } from "../generated/graphql";

function Authentication() {
    const [login] = useLoginMutation();
    const [signup] = useSignupMutation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { isShown, toggle } = useModal();

    const SignUp = (
        <form 
            className="signup-form"
            onSubmit={async e => {
                e.preventDefault();
                const response = await signup({
                    variables: {
                        birthYear,
                        birthMonth,
                        birthDay,
                        gender,
                        title,
                        password,
                        lastName,
                        firstName,
                        username,
                        email,
                    },
                    update: (store, { data }) => {
                        if (!data) {
                            return null;
                        }
            
                        store.writeQuery<MeQuery>({
                            query: MeDocument,
                            data: {
                                me: data.signup.user as any
                            }
                        });
                    }
                });
                
                if (response && response.data) {
                    setAccessToken(response.data.signup.accessToken!);
                }
            }}
        >
            <input type="text" placeholder="Username" value={username} onChange={e => {
                setUsername(e.target.value);
            }} />
            <input type="password" placeholder="Password" value={password} onChange={e => {
                setPassword(e.target.value);
            }} />
            <button className="signup" type="submit">Sign up</button>
        </form>
    );

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
                    <button className="signup" onClick={toggle}>Sign up</button>
                    <Modal isShown={isShown} hide={toggle} headerText="Sign up" modalContent={SignUp} />
                </div>
            </div>
            <footer>
                &copy; 2021 The Scientific Place
            </footer>
        </>
    );
}

export default Authentication;