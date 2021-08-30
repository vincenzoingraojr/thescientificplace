import { Link } from "react-router-dom";

function Response() {
    return (
        <div className="landing-container">
            <div className="landing-inner-container">
                <div className="site-title">The Scientific Place</div>
                <div className="landing-content-text">
                    The message has been sent. Now you can go back to the <Link to="/">homepage</Link>.
                </div>
            </div>
        </div>
    );
}

export default Response;