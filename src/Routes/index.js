import React, {Fragment,Suspense, lazy, useEffect,useState} from "react";
import {Route, Switch} from "react-router-dom";
import {verifyUserToken} from '../utils'

const WelcomeScreen = lazy(() => import("../Components/WelcomeScreen"));

const SignUp = lazy(() => import("../Components/SignUp"));

const StartGameScreen = lazy(() => import("../Components/GameStartScreen"));

const Routes = () => {

	const [isLoggedIn,setIsLoggedIn] = useState(false);

	useEffect(() => {
		const verifyUser = async () =>{
			const loggedInUser = await verifyUserToken();
			
			if (loggedInUser) {
				setIsLoggedIn(true);
			}
		}

		verifyUser();
		
	}, [isLoggedIn, setIsLoggedIn]);


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
					>
						{(isLoggedIn)?<StartGameScreen/>:<WelcomeScreen setIsLoggedIn={setIsLoggedIn}/>}
					</Route>

					<Route
						exact
						path="/signup"
					>
						{(isLoggedIn)?<StartGameScreen/>:<SignUp setIsLoggedIn={setIsLoggedIn}/>}
					</Route>
					
				</Switch>
                </Suspense>
		</Fragment>
	);
};


export default Routes;