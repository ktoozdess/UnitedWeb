import styles from './Feed.module.scss'
import { Link } from 'react-router-dom'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore'
import db from "../../../service/firebase.js"
import addcircle from '../../../assets/add_circle.svg'
import settings from '../../../assets/settings.svg'


const FeedPage = () =>{
    const auth = getAuth();
    const [usser, setUsser] = useState([])
    useEffect(() =>{
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // console.log('success');
        } else {
          console.log('no');
        }
      });
      const FetchUser = async() =>{
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          if (doc.id == auth.currentUser.uid){
            setUsser(doc.data())
            console.log(doc.data());
          }
        });
      }

      FetchUser()

  }, [])

    const navigate = useNavigate()

    const logout = () =>{
        signOut(auth).then(() => {
            console.log('signout successful');
            navigate('../', { replace: true })
        }).catch((error) => {
            console.log(error);
        });
    }

    const alertupdateprofile = () =>{
      if ( usser.name == '' || usser.surname == '' || usser.bio == ''){

      return(
        <div className="alert alert-light w-6/12 m-auto flex justify-center" role="alert">
          <p>Update your profile in settings to enter your Name, Surname etc!</p>
        </div>
      )
      }
    }
    setTimeout(() => {
      document.querySelector('.alert').classList.add('hidden')
    }, 4000);



    return(
      <div className={styles.wrapper}>
        <div className={styles.header}>
        <a href="/">
            <h3>United logo</h3>
        </a>

        <div className="flex">
        <Link to={`/createpost`} className={styles.add_circle}>
              <img src={addcircle} alt="add" width="42" height="42" />
          </Link>
          <div className="dropdown">
          <a type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={settings} alt="add" width="42" height="42" />
          </a>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to={'/updateprofile'} >Update profile</Link></li>
            <li><a className="dropdown-item" onClick={logout} >LogOut</a></li>
          </ul>
        </div>
          </div>
      </div>

      {alertupdateprofile()}
        <div className={styles.feed_wrapper}>

          <div className={styles.profile}>
            <img src={usser.profilePhoto} className={styles.profile_logo} alt="profile photo" />
            <p>{usser.name} {usser.surname}</p>
            <p>@{ usser.username }</p>
            <p>Email: {usser.email}</p>
            <p>Bio: { usser.bio }</p>
            <p>Occupation: { usser.occupation }</p>
          </div>

        </div>
      </div>
    )
}


export default FeedPage