import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { startFacebookLogin, startGoogleLogin, startLogin } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/UseForm';

export const Loginpage = () => {

    const { msgError } = useSelector(state => state.ui);

    const { loading } = useSelector(state => state.ui);

    const dispatch = useDispatch();


    const [formValues, handleInputChange] = useForm({
        email: 'sspencerd@gmail.com',
        password: '123123'
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {

        e.preventDefault();

        if (isFormValid()) {

            dispatch(startLogin(email, password));


        }


    }
    const handleGoogleLogin = () => {


        dispatch(startGoogleLogin());
    }


    const handleFacebookLogin = () => {
        dispatch(startFacebookLogin());
    }


    const isFormValid = () => {

        if (email.trim().length === 0) {
            dispatch(
                setError('Nombre es requerido')
            )
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(
                setError('El email no es valido')
            )
            return false;
        } else if (password.length < 5) {
            dispatch(
                setError('La contraseña no es correcta')
            )
            return false;
        }


        dispatch(
            removeError()
        );
        return true;
    }



    return (
        <>

            <h3 className="auth__title">Login</h3>
            {
                msgError &&
                <div className="auth__alert-error">
                    {msgError}
                </div>
            }
            <form onSubmit={handleLogin} className="animate__animated animate__fadeIn">
                <input
                    className="auth__input"
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    autoComplete="off"
                />
                <input
                    className="auth__input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                />


                <button
                    className="btn btn-primary btn-block"
                    type="submit"
                    disabled={loading}>
                    Ingresar
                        </button>

                <div className="auth__social-networks animate__animated animate__fadeInRight animate__delay-1s">

                    <p>Ingresar con redes sociales</p>

                    <div className="google-btn" onClick={handleGoogleLogin}>
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>

                    {/* btn facebook */}
                    <div className="fb-btn" onClick={handleFacebookLogin}>
                        <div className="fb-icon-wrapper">
                            <img className="fb-icon" src="https://static.xx.fbcdn.net/rsrc.php/yz/r/KFyVIAWzntM.ico" alt="facebook button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with facebook</b>
                        </p>
                    </div>
                </div>
                <p className="mb-5" />
                <Link className="link"
                    to="/auth/register">

                    Crear una nueva cuenta

                </Link>



            </form>


        </>
    )
}
