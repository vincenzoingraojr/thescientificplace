import { Link, useHistory } from "react-router-dom";
import { setAccessToken } from "../accessToken";
import { useLogoutMutation } from "../generated/graphql";
import { Icon } from '@fluentui/react/lib/Icon';


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
                <nav className="nav-sidebar">
                    <div className="nav-entry">
                        <Link to="/home">
                            <div className="nav-entry-icon">
                                <Icon iconName="Home" />
                            </div>
                            <div className="nav-entry-name">
                                Home
                            </div>
                        </Link>
                    </div>
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
                   Home.
                </div>
                <div className="right-sidebar">
                    Right sidebar.
                </div>
            </div>
        </div>
    );
}

export default Home;