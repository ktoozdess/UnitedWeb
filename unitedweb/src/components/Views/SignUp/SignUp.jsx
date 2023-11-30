import styles from './Signup.module.scss'
import { Link } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,updateProfile } from "firebase/auth";
import { setDoc, doc, getDocs, collection } from '@firebase/firestore';
import db from "../../../service/firebase.js"
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import googlelogo from '../../../assets/google_logo.svg'
import logoUnited from '../../../assets/logoUnited.png'


const SignUp = () =>{
    const [Name, setName] = useState('')
    const [Surname, setSurname] = useState('')
    const [username, setUsername] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const [usser, setUsser] = useState([])
    const libusers = []

    useEffect(() =>{
      const FetchUser = async() =>{
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            const users ={
                id: doc.id,
                username: doc.data().username,
                profilePhoto: doc.data().profilePhoto
            }
            libusers.push(users)
            setUsser(libusers)
        });
      }
      FetchUser()
      const userTheme = localStorage.getItem("theme")
        const systemTheme = window.matchMedia("(prefers-color-scheme:dark)").matches
        const ThemeCheck = () =>{
        if (userTheme === "dark" || (!userTheme && systemTheme)){
            document.documentElement.classList.add("dark")
            return
        }
        }
  ThemeCheck()

  }, [])

    const auth = getAuth();
    const createuser = ()=>{
        if(password1 == password2){
            createUserWithEmailAndPassword(auth, email, password1)
            .then(async() =>{
                try {
                    await setDoc(doc(db, "users", auth.currentUser.uid), {
                        email: email,
                        username: username,
                        profilePhoto: 'https://i.pinimg.com/736x/c9/e3/e8/c9e3e810a8066b885ca4e882460785fa.jpg',
                        name: Name,
                        surname: Surname,
                        bio: ''
                    });
                    updateProfile(auth.currentUser, {
                        displayName: username,
                        photoURL: 'https://i.pinimg.com/736x/c9/e3/e8/c9e3e810a8066b885ca4e882460785fa.jpg'
                    }).then(() => {
                        console.log("Profile updated!");
                    }).catch((error) => {
                // An error occurred
                });

                } catch (e) {
                console.error("Error adding document: ", e);
                }
                console.log('success');
                navigate('../', { replace: true })
            })
            .catch((error) => {
                // console.log(error);
            });
        }else{
            alert('Please enter correctly two passwords fields')
        }
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
                // console.log(error);
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
            // console.log(error.message);
        })
    }

    return(
        <div class="animate__animated animate__fadeIn">
        <div className={styles.wrapper}>
            <div className={styles.lside}>
            <div class="animate__animated animate__backInLeft">
                <img src={logoUnited} alt="logo United" width="180px" />
                <h2>Sign Up</h2>
                <div className={styles.form}>
                    <input class="dark:bg-lightbg dark:placeholder-text-lighttheme dark:text-text-lighttheme" type="text" placeholder='Name' value={ Name } onChange={(event) => setName(event.target.value)}  />
                    <input class="dark:bg-lightbg dark:placeholder-text-lighttheme dark:text-text-lighttheme" type="text" placeholder='Surname' value={ Surname } onChange={(event) => setSurname(event.target.value)}  />
                    <input class="dark:bg-lightbg dark:placeholder-text-lighttheme dark:text-text-lighttheme" type="text" placeholder='Username' value={ username } onChange={(event) => setUsername(event.target.value)}  />
                    <input class="dark:bg-lightbg dark:placeholder-text-lighttheme dark:text-text-lighttheme" type="email" placeholder='Email' value={ email } onChange={(event) => setEmail(event.target.value)}  />
                    <input class="dark:bg-lightbg dark:placeholder-text-lighttheme dark:text-text-lighttheme" type="password" placeholder='Password' value={ password1 } onChange={(event) => setPassword1(event.target.value)} />
                    <input class="dark:bg-lightbg dark:placeholder-text-lighttheme dark:text-text-lighttheme" type="password" placeholder='Password again' value={ password2 } onChange={(event) => setPassword2(event.target.value)} />
                    <a className={styles.btn_submit} onClick={createuser}>Sign Up</a>
                    <a className={styles.btn_submit_google} onClick={signInWithGoogle}> <img src={googlelogo} alt="" /> Sign Up with Google</a>
                </div>
                </div>
                <div className={styles.linksignup_lside}>
                    <p>Don't have an account? <Link  to={'/signin'}>Sign In</Link></p>
                </div>
            </div>
            <div className={styles.rside}>
                <div className={styles.linksignup}>
                    <p>Already have an account? <Link  to={'/signin'}>Sign In</Link></p>
                </div>
            </div>
        </div>
        </div>
    )
}

export default SignUp