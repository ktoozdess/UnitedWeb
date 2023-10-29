import styles from './Signin.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from 'react';
import googlelogo from '../../../assets/google_logo.svg'


const SignIn = () =>{

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const auth = getAuth();
    const navigate = useNavigate()
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
          .then((result) => {
            console.log(result.user);
            navigate('../', { replace: true })
          }).catch((error) => {
            console.log(error);
          });

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