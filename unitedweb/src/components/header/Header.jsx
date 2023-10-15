import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import addcircle from '../../assets/add_circle.svg'
import { getAuth } from "firebase/auth";


const Header = () =>{
    const auth = getAuth();
    const user = auth.currentUser;
    const onauthusercheck = () =>{
      if (user) {
        return(
          <Link to={`/feed`} className={styles.profile_logo}>
            <img src="https://github.com/mdo.png" alt="profile" width="42" height="42" />
          </Link>
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
            <h3>United logo</h3>
        </a>

        {/* <ul className="flex flex-row justify-center ">
          <li><a href="#" className={styles.nav_link}>Overview</a></li>
          <li><a href="#" className={styles.nav_link}>Inventory</a></li>
          <li><a href="#" className={styles.nav_link}>Customers</a></li>
          <li><a href="#" className={styles.nav_link}>Products</a></li>
        </ul> */}
        <div className="flex">
          <Link to={`/createpost`} className={styles.profile_logo}>
              <img src={addcircle} alt="add" width="42" height="42" />
          </Link>
            {onauthusercheck()}
        </div>
      </div>
    )
}

export default Header