import React, { useContext, useState } from 'react';
import LoginAnimation from '../assets/RegisterAnimatio.json'
import Lottie from 'lottie-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../Provider/AuthContext';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc';





const Register = () => {

    const [ErrorMessage, setErrorMessage] = useState(null);
    const { createUser, setUser, updateUser ,logInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const HandleRegister = e => {

        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;

        console.log(name, email, photo, password)


        // createUser(email,password)
        // .then(res =>{
        //     console.log(res.user);
        //     setUser(res.user)
        //     updateUser({displayName : name , photoURL : photo})
        //     .then(() =>{
        //         console.log('User Updated');
        //     })

        //     }

        //     alert('user Created')
        // })
        // .catch(error =>{
        //     console.log(error.message)
        // })


        if (password.length < 6) {

            setErrorMessage('password should be 6 characters or longer');
            return;

        }

        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~]).{8,}$/;

        if (!passwordRegex.test(password)) {
            setErrorMessage('Use Uppercase and alphanumeric number and special characters')
            return;

        }



        createUser(email, password)
            .then(res => {
                console.log(res.user)
                setUser(res.user);
                // alert('user Created');
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Welcome Back",
                    showConfirmButton: false,
                    timer: 1500
                });
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        console.log('user Updated');
                        navigate('/')

                    })
                    .catch(error => {
                        console.log(error.message)
                        setErrorMessage(error.message)
                    })
            })
            .catch(error => {
                setErrorMessage(error.message);
            })
    }


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
            <div className="hero-content p-5 gap-16 flex justify-between  lg:flex-row-reverse">
                <div className="text-center lg:text-center w-full flex-1">
                    <h1 className="text-5xl font-bold text-white">Create Account</h1>
                    <Lottie animationData={LoginAnimation}></Lottie>
                </div>
                <div className="card  w-full max-w-screen-lg shadow-2xl flex-1">
                    <form onSubmit={HandleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Name</span>
                            </label>
                            <input name='name' type="text" placeholder="name" className="input input-bordered text-black" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Photo URL</span>
                            </label>
                            <input name='photo' type="text" placeholder="photo URL" className="input input-bordered text-black" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Email</span>
                            </label>
                            <input name='email' type="email" placeholder="email" className="input input-bordered text-black" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Password</span>
                            </label>
                            <input name='password' type="password" placeholder="password" className="input input-bordered text-black" required />

                            <p className='text-white mt-2'>New here ? <Link to={'/login'}>Already have an Account</Link></p>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                        <div className="form-control mt-4">
                            <button
                                type="button"
                                onClick={handleGoogle}
                                className="btn bg-white text-black flex items-center justify-center gap-2 w-full"
                            >
                                <FcGoogle /> Signup with with Google
                            </button>
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

export default Register;