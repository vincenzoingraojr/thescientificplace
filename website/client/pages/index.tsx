import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useState } from 'react';
import { useLoginMutation } from '../generated/graphql'

export default function Index() {
  const router = useRouter();
  const [login] = useLoginMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Head>
        <title>The Scientific Place</title>
        <meta name="description" content="The social network of scientists" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <div className="container-item">
          <div className="site-title">The Scientific Place</div>
          <div>
            This is a place where scientists and science lovers can share ideas, research papers and projects.
          </div>
        </div>
        <div className="container-item">
          <div className="authentication-form">
            <form>
              <input type="text" value={username} placeholder="Username" onChange={e => {
                setUsername(e.target.value);
              }}/>
              <input type="password" value={password} placeholder="Password" onChange={e => {
                setPassword(e.target.value);
              }}/>
              <button className="login" type="submit">Log in</button>
            </form>
          </div>
        </div>
      </div>

      <footer>
        &copy; 2021 The Scientific Place
      </footer>
    </>
  )
}
