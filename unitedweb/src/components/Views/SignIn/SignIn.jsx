import styles from './Signin.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';


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

    return(
        <div className={styles.wrapper}>
            <div className={styles.lside}>
                <h3>United logo</h3>
                <h2>Sign In</h2>
                <div className={styles.form}>
                    <input type="email" placeholder='Email' value={ email } onChange={(event) => setEmail(event.target.value)}/>
                    <input type="password" placeholder='Password'  value={ password } onChange={(event) => setPassword(event.target.value)}/>
                    <a className={styles.btn_submit}  onClick={loginuser}>Login</a>
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