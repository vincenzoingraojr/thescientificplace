import ReactDOM from 'react-dom';
import './index.css';
import './style.css';
import './global.css';
import App from './App';
import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache, Observable } from '@apollo/client';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { getAccessToken, setAccessToken } from './accessToken';
import { onError } from 'apollo-link-error';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
initializeIcons();

const cache = new InMemoryCache();

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((operation) => {
          const accessToken = getAccessToken();
          if (accessToken) {
            operation.setContext({
              headers: {
                authorization: `bearer ${accessToken}`,
              },
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: "accessToken",
      isTokenValidOrUndefined: () => {
        const token = getAccessToken();

        if (!token) {
          return true;
        }

        try {
          const { exp } = jwtDecode<JwtPayload>(token);
          if (Date.now() >= exp! * 1000) {
            return false;
          } else {
            return true;
          }
        } catch {
          return false;
        }
      },
      fetchAccessToken: () => {
        return fetch("http://localhost:4000/", {
          method: "POST",
          credentials: "include",
        });
      },
      handleFetch: (accessToken) => {
        setAccessToken(accessToken);
      },
      handleError: (err) => {
        console.warn("Your refresh token is invalid. Try to relogin");
        console.error(err);
      },
    }),
    onError(({ graphQLErrors, networkError }) => {
      console.log(graphQLErrors);
      console.log(networkError);
    }) as any,
    requestLink,
    new HttpLink({
      uri: "http://localhost:4000/graphql",
      credentials: "include",
    }),
  ]),
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);