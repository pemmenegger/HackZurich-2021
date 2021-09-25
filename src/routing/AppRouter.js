import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Questions from "../pages/Questions";
import AuthRoute from "./routes/AuthRoute";
import UnauthRoute from "./routes/UnauthRoute";
import { withSessionSettingsContext } from "../components/context/SessionSettingsContext"

class AppRouter extends React.Component {

    isAuthenticated() {
        return true
        //return this.props.SessionSettingsContext.rigiUser !== null;
    }

    render() {      
        return (
            <BrowserRouter>
                <Route render={({ location }) => {
                    let isAuth = this.isAuthenticated()
                    return (
                        <Switch location={location}>
                            <AuthRoute exact path='/questions' component={Questions} isAuth={isAuth}/>
                            <Redirect to="/questions" />
                        </Switch>
                    )
                }}/>
            </BrowserRouter>
        );
    }
}

export default withSessionSettingsContext(AppRouter);


// <UnauthRoute exact path='/login' component={Login} isAuth={isAuth}/>
//                             <Redirect to="/login" />

