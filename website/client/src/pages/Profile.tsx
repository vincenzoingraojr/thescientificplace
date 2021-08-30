import Layout from "../components/Layout";
import { useFindUserQuery } from "../generated/graphql";

function Profile(props: any) {
    const { username } = props.match.params;

    const { data, loading } = useFindUserQuery({ variables: { username: username }, fetchPolicy: "network-only" });

    const Loading = (
        <>
            Loading...
        </>
    );

    if (loading) {
        return (
            <Layout title="Profile" content={Loading} />
        );
    }
    
    let userFound = false;

    if (data && data.findUser?.username) {
        userFound = true;
    } else {
        userFound = false;
    }

    const Profile = (
        <>
            Name: {data?.findUser?.firstName}
        </>
    );

    const UserNotFound = (
        <>
            This user does not exist.
        </>
    );

    return (
        <Layout title="Profile" content={userFound ? Profile : UserNotFound} />
    );
}

export default Profile;