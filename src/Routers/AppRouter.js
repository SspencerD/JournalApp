import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Redirect,
    Switch
} from 'react-router-dom';
import { JournalPage } from '../components/journal/JournalPage';
import { AuthRouter } from './AuthRouter';
import { firebase } from '../firebase/firebaseConfig';
import { login } from '../actions/auth';
import { useDispatch } from 'react-redux';
import { LoadingPage } from '../components/auth/LoadingPage';
import { PublicRoute } from './PublicRoute';
import { PrivateRoutes } from './PrivateRoutes';
import {  startLoadNotes } from '../actions/notes';


export const AppRouter = () => {

    const dispatch = useDispatch();


    const [checking, setChecking] = useState(true);

    const [isLoggedIn, setisLoggedIn] = useState(false);

    useEffect(() => {

        firebase.auth().onAuthStateChanged( (user) =>{

            if( user?.uid){
                dispatch( login(user.uid, user.displayName) )
                setisLoggedIn(true);

                 dispatch( startLoadNotes( user.uid) );
                
            } else{
                setisLoggedIn(false);
            }

            setChecking(false);

        });
       
    }, [dispatch, setChecking, setisLoggedIn])



    if( checking ){
        return(
            <LoadingPage/>
        )
    }


    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isAuth ={ isLoggedIn} />

                    <PrivateRoutes
                        exact
                        path="/"
                        component={JournalPage}
                        isAuth={ isLoggedIn } />

                    <Redirect to="/auth/login" />
                </Switch>
            </div>

        </Router>

    )
}
