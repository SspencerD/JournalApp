import Swal from 'sweetalert2';
import { types } from "../types/types";
import { facebookAuthProvider, firebase, googleAuthProvider } from "../firebase/firebaseConfig";
import { removeLoading, setLoading } from "./ui";
import { noteLogout } from './notes';


export const startLogin = (email, password) => {

    return (dispatch) => {

        dispatch(setLoading())

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {

                dispatch(
                    login(user.uid, user.displayName)
                )
                dispatch( removeLoading() );

            })
            .catch(e => {
                dispatch( removeLoading() );
                if(e.code ==='auth/user-not-found'){
        
                    Swal.fire('UPS! Algo a pasado!','Hubo un problema en la autentificación , puede que el usuario no exista o esté mal la contraseña','error');
                }
                if(e.code ==='auth/wrong-password'){

                    Swal.fire('UPS! Algo a pasado! ','La contraseña ingresada no es correcta','error')
                }         
            });



    }


}



export const registerUser = (name, lastname, email, password) => {

    return (dispatch) => {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {

                await user.updateProfile({ displayName: name });

                dispatch(
                    login(user.uid, user.displayName)
                )

            })
            .catch(e => {
                Swal.fire('Upa..','El usuario ya se encuentra registrado','warning')
            })

    }

}

export const startGoogleLogin = () => {

    return (dispatch) => {

        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(

                    login(user.uid, user.displayName)
                )

            })
            .catch(e =>{
                Swal.fire('Upa..','El usuario ya se encuentra registrado','warning')

            });
    }

}

export const startFacebookLogin = () => {

    return (dispatch) => {

        firebase.auth().signInWithPopup(facebookAuthProvider)
            .then(({ user }) => {
                dispatch(

                    login(user.uid, user.displayName)
                )
            })
            .catch(e =>{
                Swal.fire('Upa..','El usuario ya se encuentra registrado','warning')

            });
    }
}



export const login = (uid, displayName) => ({


    type: types.login,
    payload: {
        uid,
        displayName
    }
})

export const startLogout = ()=>{

    return async( dispatch) => {

        await firebase.auth().signOut();

        dispatch( logout() );

        dispatch( noteLogout() );

        Swal.fire('Hurray!','Te has desconectado correctamente','success');


    }
}

export const logout = () =>({
    
    type: types.logout
})
