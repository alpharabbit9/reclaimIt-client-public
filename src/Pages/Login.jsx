import React, { useContext, useState } from 'react';
import LoginAnimation from '../assets/Animation - 1735057783480.json';
import Lottie from 'lottie-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../Provider/AuthContext';
import { FcGoogle } from "react-icons/fc";
import Swal from 'sweetalert2';

const Login = () => {
    const { userLogIn, setUser, logInWithGoogle } = useContext(AuthContext);
    const [ErrorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const HandleLogIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        userLogIn(email, password)
            .then((res) => {
                console.log(res.user);
                setUser(res.user);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Welcome Back",
                    showConfirmButton: false,
                    timer: 1500
                  });
                navigate('/');
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    };

    const handleGoogle = () => {
        logInWithGoogle()
            .then((res) => {
                console.log(res.user);
                setUser(res.user);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Welcome Back",
                    showConfirmButton: false,
                    timer: 1500
                  });
                navigate('/');
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    };

    return (
        <div className="hero bg-[#8770FF] min-h-screen p-5">
            <div className="hero-content flex flex-col-reverse lg:flex-row-reverse gap-16 items-center">
                <div className="text-center lg:text-center w-full lg:w-1/2">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Login now!</h1>
                    <Lottie className="w-full max-w-sm mx-auto lg:max-w-md" animationData={LoginAnimation} />
                </div>
                <div className="card w-full max-w-sm lg:max-w-lg shadow-2xl">
                    <form onSubmit={HandleLogIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Email</span>
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Password</span>
                            </label>
                            <input
                                name="password"
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                required
                            />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover text-white">
                                    Forgot password?
                                </a>
                            </label>
                            <p className="text-white mt-2">
                                New here?{' '}
                                <Link to={'/register'} className="link link-hover text-blue-400">
                                    Create an Account
                                </Link>
                            </p>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary w-full">Login</button>
                        </div>
                        <div className="form-control mt-4">
                            <button
                                type="button"
                                onClick={handleGoogle}
                                className="btn bg-white text-black flex items-center justify-center gap-2 w-full"
                            >
                                <FcGoogle /> Log in with Google
                            </button>
                        </div>
                    </form>
                    {ErrorMessage && (
                        <p className="text-red-700 text-center mb-3">{ErrorMessage}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
