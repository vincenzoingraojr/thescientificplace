import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="landing-container">
            <div className="landing-inner-container">
                <div className="site-title">404</div>
                <div className="landing-content-text">
                    The page you're looking for doesn't exist. You can go back to the <Link to="/">homepage</Link>.
                </div>
            </div>
        </div>
    );
}

export default NotFound;