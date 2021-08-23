import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            Home.
            <Link className="block" to="/">Authenticate</Link>
        </div>
    );
}

export default Home;