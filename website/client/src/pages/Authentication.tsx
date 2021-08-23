import { Link } from "react-router-dom";

function Authentication() {
    return (
        <div>
            Authentication.
            <Link className="block" to="/home">Go Home</Link>
        </div>
    );
}

export default Authentication;