import { useMeQuery } from "../generated/graphql";

function Home() {
    const { data } = useMeQuery({ fetchPolicy: "network-only" });

    return (
        <div className="page-container">
            Home. Hello, {data?.me?.firstName}
        </div>
    );
}

export default Home;