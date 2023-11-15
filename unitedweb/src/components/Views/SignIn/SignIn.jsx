import styles from './Signin.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { useEffect, useState } from 'react';
import { setDoc, doc, getDocs, collection } from 'firebase/firestore';
import googlelogo from '../../../assets/google_logo.svg'
import db from "../../../service/firebase.js"

const SignIn = () =>{

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const auth = getAuth();
    const [usser, setUsser] = useState([])
    const libusers = []
    const navigate = useNavigate()
     useEffect(() =>{
        const FetchUser = async() =>{
                const querySnapshot = await getDocs(collection(db, "users"));
                querySnapshot.forEach((doc) => {
                    libusers.push(doc)
                    setUsser(libusers)
                    // console.log(doc.data());
                });
              }
              FetchUser()
              console.log(usser);
     }, [])


    const loginuser = () =>{
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {

            console.log('success');
            navigate('../', { replace: true })
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then(async(result) => {
            try {
                if( Object.keys(usser.filter(user => user.id == result.user.uid)).length == 0 ){
                await setDoc(doc(db, "users", result.user.uid), {
                    email: result.user.email,
                    username: result.user.displayName,
                    profilePhoto: 'https://i.pinimg.com/736x/c9/e3/e8/c9e3e810a8066b885ca4e882460785fa.jpg',
                    name: '',
                    surname: '',
                    bio: ''
                });
                updateProfile(auth.currentUser, {
                    displayName: result.user.displayName,
                    photoURL: 'https://i.pinimg.com/736x/c9/e3/e8/c9e3e810a8066b885ca4e882460785fa.jpg'
                }).then(() => {
                    console.log("Profile updated!");

                }).catch((error) => {
                // An error occurred
                console.log(error);
            });
                }else{
                    console.log('have');
                }
            } catch (e) {
            console.error("Error adding document: ", e);
            }
            navigate('../', { replace: true })
        })
        .catch((error) => {
            console.log(error.message);
        })

    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.lside}>
                <h3>United logo</h3>
                <h2>Sign In</h2>
                <div className={styles.form}>
                    <input type="email" placeholder='Email' value={ email } onChange={(event) => setEmail(event.target.value)}/>
                    <input type="password" placeholder='Password'  value={ password } onChange={(event) => setPassword(event.target.value)}/>
                    <a className={styles.btn_submit}  onClick={loginuser}>Login</a>
                    <a className={styles.btn_submit_google} onClick={signInWithGoogle}> <img src={googlelogo} alt="" /> Sign In with Google</a>
                </div>
            </div>
            <div className={styles.rside}>
                <div className={styles.linksignup}>
                    <p>Don't have an account? <Link  to={'/signup'}>Sign Up</Link></p>
                </div>
            </div>
        </div>
    )
}

export default SignIn