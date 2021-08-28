import { Icon } from '@fluentui/react/lib/Icon';
import { Link } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";

function Home() {
    const { data } = useMeQuery({ fetchPolicy: "network-only" });

    return (
        <div className="page-container">
            <div className="left-sidebar">
                <div className="site-title-sidebar">
                    <Link to="/home">
                        The Scientific Place
                    </Link>
                </div>
                <div className="site-title-sidebar-circle">
                    <Link to="/home">
                        <Icon iconName="FullCircleMask" />
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