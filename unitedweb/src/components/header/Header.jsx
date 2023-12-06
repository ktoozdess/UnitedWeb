import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import addcircle from '../../assets/add_circle.svg'
import adduser from '../../assets/adduser.svg'
import { getAuth } from "firebase/auth";
import logoUnited from '../../assets/logoUnited.png'
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';


const Header = () =>{
      const auth = getAuth();
      const user = auth.currentUser;

    const onauthusercheck = () =>{
      if (user) {
        return(
          <>
          <Link to={`/searchusers`} >
              <img src={adduser} alt="add" width="42" height="42" />
          </Link>
          <Link to={`/createpost`} className={styles.addcircle_logo}>
              <img src={addcircle} alt="add" width="42" height="42" />
          </Link>
          <Link to={`/feed`} className={styles.profile_logo}>
            <img src={user.photoURL} alt="profile"/>
          </Link>
          </>
        )
      } else {
        return(
          <Link to={'/signin'}>
            Login
          </Link>
        )
      }
    }

    return(
      <div className={styles.wrapper}>
        <a href="/">
            <img src={logoUnited} width="140px" alt="United Logo" />
        </a>

        <div className="flex">
            {onauthusercheck()}
        </div>
      </div>
    )
}

export default Header