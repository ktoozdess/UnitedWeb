import styles from './Signup.module.scss'
import { Link } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SignUp = () =>{
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const auth = getAuth();
    const createuser = ()=>{
        createUserWithEmailAndPassword(auth, email, password)
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
                <h2>Sign Up</h2>
                <div className={styles.form}>
                    {/* <input type="text" placeholder='First name' />
                    <input type="text" placeholder='Last name' />
                    <input type="text" placeholder='Nickname' /> */}
                    <input type="email" placeholder='Email' value={ email } onChange={(event) => setEmail(event.target.value)}  />
                    <input type="password" placeholder='Password' value={ password } onChange={(event) => setPassword(event.target.value)} />
                    {/* <input type="password" placeholder='Password' /> */}
                    <a className={styles.btn_submit} onClick={createuser}>Sign Up</a>
                </div>
            </div>
            <div className={styles.rside}>
                <div className={styles.linksignup}>
                    <p>Already have an account? <Link  to={'/signin'}>Sign In</Link></p>
                </div>
            </div>
        </div>
    )
}

export default SignUp