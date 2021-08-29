import { Icon } from "@fluentui/react/lib/Icon";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

export interface LayoutProps {
    content: JSX.Element
}

const Layout: FunctionComponent<LayoutProps> = ({ content }) => {
    return (
        <div className="page-container">
            <div className="sidebar">
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
                    {content}
                </div>
                <div className="right-column">
                    Right sidebar.
                </div>
            </div>
        </div>
    );
};

export default Layout;