import { useHistory } from "react-router-dom";
import { setAccessToken } from "../accessToken";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

function Logout() {
    const [logout, { client }] = useLogoutMutation();

    const history = useHistory();

    const { data } = useMeQuery({ fetchPolicy: "network-only" });
    
    return (
        <div className="logout-page">
            {data && data.me ? (
                <button
                    onClick={async () => {
                        await logout();
                        setAccessToken("");
                        await client!.resetStore();

                        history.go(0);
                    }}
                    className="logout"
                >
                    Log out
                </button>
            ) : null}
        </div>
    );
}

export default Logout;