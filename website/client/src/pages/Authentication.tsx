import { useState } from "react";
import { setAccessToken } from "../accessToken";
import { Modal } from "../components/modal/Modal";
import { useModal } from "../components/modal/useModal";
import { MeDocument, MeQuery, useLoginMutation, useSignupMutation } from "../generated/graphql";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
import Head from "../components/Head";

function Authentication() {
    const [login] = useLoginMutation();
    const [signup] = useSignupMutation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState(new Date());

    const history = useHistory();

    const { isShown, toggle } = useModal();

    const SignUp = (
        <form 
            className="signup-form"
            onSubmit={async e => {
                e.preventDefault();
                const response = await signup({
                    variables: {
                        birthDate,
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

                history.go(0);
            }}
        >
            <div className="margin-bottom-24">
                Join <b>The Scientific Place</b> by filling out the form below.
            </div>
            <label htmlFor="birthdate-picker">
                Please enter your date of birth:
            </label>
            <DatePicker 
                id="birthdate-picker"
                className="margin-top-6 margin-bottom-24"
                selected={birthDate}
                onChange={(date) => setBirthDate(date as Date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
            />
            <div className="input-grid margin-bottom-24">
                <div className="input-grid-item">
                    <select
                        value={title}
                        onChange={(e)=> {
                            setTitle(e.target.value)
                        }}
                    >
                        <option value="Title">Title</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Dr.">Dr.</option>
                    </select>
                </div>
                <div className="input-grid-item">
                    <select
                        value={gender}
                        onChange={(e)=> {
                            setGender(e.target.value)
                        }}
                    >
                        <option value="Gender">Gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>
            <div className="input-grid margin-bottom-24">
                <div className="input-grid-item">
                    <input type="text" placeholder="First name" value={firstName} onChange={e => {
                        setFirstName(e.target.value);
                    }} />
                </div>
                <div className="input-grid-item">
                    <input type="text" placeholder="Last name" value={lastName} onChange={e => {
                        setLastName(e.target.value);
                    }} />
                </div>
            </div>
            <input type="email" placeholder="Email" className="margin-bottom-24" value={email} onChange={e => {
                setEmail(e.target.value);
            }} />
            <input type="text" placeholder="Username" className="margin-bottom-24" value={username} onChange={e => {
                setUsername(e.target.value);
            }} />
            <input type="password" placeholder="Password" className="margin-bottom-24" value={password} onChange={e => {
                setPassword(e.target.value);
            }} />
            <button className="signup" type="submit">Sign up</button>
        </form>
    );

    return (
        <>
            <Head title="The Scientific Place" />
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

                            history.go(0);
                        }}
                    >
                        <input type="text" placeholder="Username" className="margin-bottom-24" value={username} onChange={e => {
                            setUsername(e.target.value);
                        }} />
                        <input type="password" placeholder="Password" className="margin-bottom-24" value={password} onChange={e => {
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