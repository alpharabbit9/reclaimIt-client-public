import React, { useContext } from 'react';
import LoginAnimation from '../assets/Animation - 1735057783480.json'
import Lottie from 'lottie-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../Provider/AuthContext';
import { FcGoogle } from "react-icons/fc";

const Login = () => {

    const {userLogIn,setUser , logInWithGoogle} = useContext(AuthContext);
    const [ErrorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();


    const HandleLogIn = (e) => {
        e.preventDefault() ;


        const email = e.target.email.value;
        const password = e.target.password.value;

        userLogIn(email,password)
        .then(res => {
            console.log(res.user);
            setUser(res.user);
            navigate('/')
            
        })
        .catch(error =>{
            setErrorMessage(error.message)
        })


        

        console.log(email,password)
    }


    const handleGoogle = () => {

        logInWithGoogle()
        .then(res => {
            console.log(res.user);
            setUser(res.user);
            navigate('/')
        })
        .catch(error =>{
            setErrorMessage(error.message);
        })

    }
    return (
        <div className="hero bg-[#8770FF] min-h-screen p-5">
            <div className="hero-content p-5 gap-16 flex justify-between  lg:flex-row-reverse">
                <div className="text-center lg:text-center w-full flex-1">
                    <h1 className="text-5xl font-bold text-white">Login now!</h1>
                    <Lottie className='w-full' animationData={LoginAnimation}></Lottie>
                </div>
                <div className="card  w-full max-w-screen-2xl shadow-2xl flex-1">
                    <form onSubmit={HandleLogIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Email</span>
                            </label>
                            <input  name='email' type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Password</span>
                            </label>
                            <input name='password' type="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover text-white">Forgot password?</a>
                            </label>
                            <p>New here ? <Link to={'/register'}>Create an Account</Link></p>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <div className="form-control mt-6">
                            <button onClick={handleGoogle} className="btn bg-white"><FcGoogle /> Log in with Google</button>
                        </div>
                    </form>
                    {
                        ErrorMessage && <p className='text-red-700 mb-3'>{ErrorMessage}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Login;