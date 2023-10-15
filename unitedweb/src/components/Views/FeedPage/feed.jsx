import styles from './Feed.module.scss'
import { Link } from 'react-router-dom'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';



const FeedPage = () =>{
    const auth = getAuth();
    const [usser, setUsser] = useState([])
    useEffect(() =>{
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUsser(user)
        } else {
          console.log('no');
        }
      });

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
    return(
        <div>
          <p>{usser.email}</p>
            <a onClick={logout} >LogOut</a>

        </div>
    )
}


export default FeedPage