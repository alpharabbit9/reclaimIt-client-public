import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import auth from '../Firebase/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateCurrentUser, updateProfile } from 'firebase/auth';

const AuthProvider = ({children}) => {

    const [user , setUser] = useState(null);
    const [ loading , setLoading] = useState(true);
    const provider = new GoogleAuthProvider();


    const createUser = (email , password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth ,email ,password);
    }

    const userLogOut = () =>{
        setLoading(true);
        signOut(auth);
    }

    const updateUser = (updateData) =>  {
        setLoading(true)
        return updateProfile(auth.currentUser,updateData);
    }

    const userLogIn = (email ,password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth ,email ,password);
    }

    const logInWithGoogle = () =>{

        return signInWithPopup(auth,provider);



    }



    const authInfo = {

        user,
        setUser,
        loading,
        setLoading,
        createUser,
        userLogOut,
        updateUser,
        userLogIn,
        logInWithGoogle

    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth , (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        })

        return () =>{
            unsubscribe() ;
        }
    },[])


    return (
        <AuthContext.Provider value={authInfo}>

            {children}

        </AuthContext.Provider>
    );
};

export default AuthProvider;