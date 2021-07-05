import React from 'react';
import { RouteComponentProps } from "react-router";
import { setAccessToken } from '../accessToken';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

export const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const [logout, { client }] = useLogoutMutation();
  const { data } = useMeQuery({ fetchPolicy: "network-only" });

  if (data && !data.me) {
    history.push("/");
  }

  return (
    <div className="page-container">
      Welcome, {data?.me?.firstName}
      {data && data.me ? (
        <button
          onClick={async () => {
            await logout();
            setAccessToken("");
            await client!.resetStore();
          }}
          className="logout"
        >
          Log out
        </button>
      ) : null}
    </div>
  );
};