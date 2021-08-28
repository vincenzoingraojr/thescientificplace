import { useHistory } from "react-router-dom";
import { setAccessToken } from "../accessToken";
import { useLogoutMutation } from "../generated/graphql";


function Home() {
    const [logout, { client }] = useLogoutMutation();
    const history = useHistory();

    return (
        <div>
            Home.
            <button
                onClick={async () => {
                    await logout();
                    setAccessToken("");
                    await client!.resetStore();
                    history.go(0);
                }}
                className="logout margin-top-6"
            >
                Log out
            </button>
        </div>
    );
}

export default Home;