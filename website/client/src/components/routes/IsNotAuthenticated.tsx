import {
    Route,
    Redirect,
    RouteProps,
} from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
    component: any;
    isAuth: boolean;
}

const IsNotAuthenticated = (props: PrivateRouteProps) => {
    const { component: Component, isAuth, ...rest } = props;

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                isAuth ? (
                    <Redirect
                        to={{
                            pathname: '/home',
                            state: { from: routeProps.location }
                        }}
                    />
                ) : (
                        <Component {...routeProps} />
                    )
            }
        />
    );
};

export default IsNotAuthenticated;