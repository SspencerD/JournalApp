import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/UseForm';
import validator from 'validator';
import { removeError, setError } from '../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../actions/auth';


export const RegisterPage = () => {


    const dispatch = useDispatch();

    const { msgError } = useSelector(state => state.ui);


    const [formvalues, handleInputChange] = useForm({

        name: 'Santiago',
        lastname: 'Spencer',
        email: 'sspencerd@gmail.com',
        password: '123123',
        confirmpass: '123123'

    });
    const { name, lastname, email, password, confirmpass } = formvalues;

    const handleRegister = (e) => {
        e.preventDefault();

        if (isFormValid()) {

            dispatch(registerUser(name, lastname, email, password));
        }

    }


    const isFormValid = () => {

        if (name.trim().length === 0) {
            dispatch(
                setError('Nombre es requerido')
            )
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(
                setError('El email no es valido')
            )
            return false;
        } else if (password !== confirmpass || password.length < 5) {
            dispatch(
                setError('la contraseña debe ser almenos de 6 caracteres y debe ser igual confirmar password')
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

            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleRegister} className="animate__animated animate__fadeIn">

                {
                    msgError &&
                    <div className="auth__alert-error">
                        {
                            msgError

                        }
                    </div>
                }

                <input
                    className="auth__input"
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                    autoComplete="off"
                />

                <input
                    className="auth__input"
                    type="text"
                    placeholder="Last Name"
                    name="lastname"
                    value={lastname}
                    onChange={handleInputChange}
                    autoComplete="off"
                />

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

                <input
                    className="auth__input"
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmpass"
                    value={confirmpass}
                    onChange={handleInputChange}
                />
                <button
                    className="btn btn-primary btn-block"
                    type="submit">
                    Register
        </button>


                <p className="mt-5"></p>
                <Link className="link"
                    to="/auth/login">

                    Already registered?

                </Link>

            </form>

        </>
    )
}
