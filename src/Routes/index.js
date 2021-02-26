import React, {Fragment,Suspense, lazy} from "react";
import {Route, Switch} from "react-router-dom";

const Welcome = lazy(() => import("../Components/WelcomeScreen"));

const SignUp = lazy(() => import("../Components/SignUp"));

const StartGameScreen = lazy(() => import("../Components/GameStartScreen"));

const Routes = ({isLoggedIn}) => {

	return (
		<Fragment>
                <Suspense
                    fallback={
                        <div>
                            Loading...
                        </div>
                    }
                 >
				<Switch onUpdate={() => window.scrollTo(0, 0)}>
				
					<Route
						exact
						path="/"
						component={(isLoggedIn)?StartGameScreen:Welcome}
					/>

                    <Route
						exact
						path="/signup"
						component={(isLoggedIn)?StartGameScreen:SignUp}
					/>

                    <Route
                        exact
                        path="/start-game"
                        component={(isLoggedIn)?StartGameScreen:Welcome}
                    />
					
				</Switch>
                </Suspense>
		</Fragment>
	);
};


export default Routes;