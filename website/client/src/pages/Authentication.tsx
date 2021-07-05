import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import { useLoginMutation, MeDocument, MeQuery, useMeQuery } from "../generated/graphql";
import { setAccessToken } from "../accessToken";
import { Head } from "../components/Head";

export const Authentication: React.FC<RouteComponentProps> = ({ history }) => {
  const [login] = useLoginMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { data } = useMeQuery({ fetchPolicy: "network-only" });

  if (data && data.me) {
    history.push("/home");
  }

  return (
    <div className="container">
      <Head title="The Scientific Place" />
      <div className="container-item">
        <div className="site-title">The Scientific Place</div>
        <div>
          This is a place where scientists and science lovers can share ideas, research papers and projects.
        </div>
      </div>
      <div className="container-item">
        <div className="authentication-form">
          <form
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

              history.push("/home");
            }}
          >
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
  );
};