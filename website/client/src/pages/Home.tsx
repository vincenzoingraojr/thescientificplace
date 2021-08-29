import { Icon } from "@fluentui/react/lib/Icon";
import { Link } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";

function Home() {
    const { data } = useMeQuery({ fetchPolicy: "network-only" });

    return (
        <div className="page-container">
            <div className="sidebar">
                <div className="site-title-sidebar">
                    <Link to="/home">
                        The Scientific Place
                    </Link>
                </div>
                <nav className="sidebar-nav">
                    <Link to="/home">
                        <div className="sidebar-nav-entry">
                            <div className="nav-entry-icon">
                                <Icon iconName="Home" />
                            </div>
                            <div className="nav-entry-name">
                                Home
                            </div>
                        </div>
                    </Link>
                </nav>
            </div>
            <header className="page-header">
                <div className="page-title">
                    Home
                </div>
                <div className="search-bar">
                    <Icon iconName="Search" />
                    <input type="text" placeholder="Search, explore" />
                </div>
            </header>
            <div className="main-container">
                <div className="main-feed">
                    Home. Hello, {data?.me?.firstName}
                </div>
                <div className="right-column">
                    Right sidebar.
                </div>
            </div>
        </div>
    );
}

export default Home;