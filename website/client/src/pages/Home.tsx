import { Icon } from '@fluentui/react/lib/Icon';
import { Link, useHistory } from "react-router-dom";
import { setAccessToken } from "../accessToken";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

function Home() {
    const [logout, { client }] = useLogoutMutation();
    const history = useHistory();
    const { data } = useMeQuery({ fetchPolicy: "network-only" });

    return (
        <div className="page-container">
            <div className="left-sidebar">
                <div className="site-title-sidebar">
                    <Link to="/home">
                        The Scientific Place
                    </Link>
                </div>
                <nav className="nav-sidebar">
                    <Link to="/home">
                        <div className="nav-entry">
                            <div className="nav-entry-icon">
                                <Icon iconName="Home" />
                            </div>
                            <div className="nav-entry-name">
                                Home
                            </div>
                        </div>
                    </Link>
                </nav>
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
            <div className="page-title">Home</div>
            <div className="fixed-searchbar">
                <Icon iconName="Search" />
                <input type="text" placeholder="Search, explore" />
            </div>
            <div className="main-container">
                <div className="main-feed">
                   Hello, {data?.me?.firstName}
                </div>
                <div className="right-sidebar">
                    Right sidebar.
                </div>
            </div>
        </div>
    );
}

export default Home;