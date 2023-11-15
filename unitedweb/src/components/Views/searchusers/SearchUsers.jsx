import { useState } from "react"
import { useEffect } from "react"
import { getDocs, collection } from "firebase/firestore";
import db from "../../../service/firebase.js"
import styles from './searchusers.module.scss'
import Header from "../../header/Header.jsx";
import { Link } from "react-router-dom";

const SearchUsers = () =>{
    const [searchval, setSearch] = useState('')
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
    }, [])


const filtereditems = () =>{
    const postuser = usser.filter(user => user.username.toLowerCase().includes(searchval) || user.username.toUpperCase().includes(searchval) || user.username.includes(searchval))
    return(
        <>
        {
            postuser.map((user, index) =>(
                <Link to={`/profile/${user.id}`} key={index} className={styles.post_user}>
                    <img src={user.profilePhoto} className={styles.profile_logo} alt="" />
                    <p>{user.username}</p>
                </Link>
            ))
        }
        </>

    )
}



    return(
        <div className={styles.wrapper}>
            <Header/>
            <div className={styles.main_search_wrapper}>
                <input type="text" placeholder="Search users" onChange={(event) => setSearch(event.target.value)} />
                {filtereditems()}
            </div>
        </div>
    )
}

export default SearchUsers