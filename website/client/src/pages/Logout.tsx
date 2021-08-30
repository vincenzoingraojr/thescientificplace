import { Icon } from "@fluentui/react/lib/Icon";
import { useHistory } from "react-router-dom";
import { setAccessToken } from "../accessToken";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

function Logout() {
    const [logout, { client }] = useLogoutMutation();

    const { data } = useMeQuery({ fetchPolicy: "network-only" });

    const history = useHistory();
    
    return (
        <div className="logout-page">
            <div className="logout-content-container">
                <div className="logout-content-header">
                    The Scientific Place
                </div>
                <div className="logout-content">
                    <div className="logout-content-text">
                        Do you want to disconnect from <b>@{data?.me?.username}</b>?
                    </div>
                    <button
                        onClick={async () => {
                            await logout();
                            setAccessToken("");
                            await client!.resetStore();

                            history.go(0);
                        }}
                        className="logout margin-bottom-24"
                    >
                        Log out
                    </button>
                    <div className="go-back" onClick={() => history.goBack()}>
                        <Icon iconName="ChromeBack" />
                        Go back
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Logout;