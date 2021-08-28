import { Link, useHistory } from "react-router-dom";
import { setAccessToken } from "../accessToken";
import { useLogoutMutation } from "../generated/graphql";


function Home() {
    const [logout, { client }] = useLogoutMutation();
    const history = useHistory();

    return (
        <div className="page-container">
            <div className="left-sidebar">
                <div className="site-title-sidebar">
                    <Link to="/home">
                        The Scientific Place
                    </Link>
                </div>
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
            </div>
            <div className="main-container">
                <div className="main-feed">
                    <div className="main-header">
                        Home
                    </div>
                    <div className="main-feed-content-container">
                        This place will be populated soon. <br />
                        This place will be populated soon. <br />
                        This place will be populated soon. <br />
                        This place will be populated soon. <br />
                        This place will be populated soon. <br />
                        This place will be populated soon. <br />
                        This place will be populated soon. <br />
                        This place will be populated soon. <br />
                        This place will be populated soon. <br />
                        This place will be populated soon. <br />
                        This place will be populated soon. <br />
                        This place will be populated soon. <br />
                        This place will be populated soon. <br />
                        This place will be populated soon. <br />
                        This place will be populated soon. <br />
                    </div>
                </div>
                <div className="right-column">
                    Search.
                </div>
            </div>
        </div>
    );
}

export default Home;