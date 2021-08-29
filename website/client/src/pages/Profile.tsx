import Layout from "../components/Layout";
import { useMeQuery } from "../generated/graphql";

function Profile() {
    const { data } = useMeQuery({ fetchPolicy: "network-only" });

    const Profile = (
        <>
            Hello, {data?.me?.firstName}
        </>
    );

    return (
        <Layout content={Profile} />
    );
}

export default Profile;