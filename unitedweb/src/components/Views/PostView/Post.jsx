import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../../../service/firebase.js"
import styles from './post.module.scss'
import addcircle from '../../../assets/add_circle.svg'
import morevert from '../../../assets/more_vert.svg'
import { getAuth } from "firebase/auth";

const Post = () =>{
    const {id} = useParams()
    const [data, setData] = useState([])
    const [usser, setUsser] = useState([])
    const auth = getAuth();
    const user = auth.currentUser
    const libusers = []
    useEffect(() =>{
        const FetchData = async() =>{
          const querySnapshot = await getDocs(collection(db, "posts"));
          querySnapshot.forEach((doc) => {
              const data ={
                  docId: doc.id,
                  UserId: doc.data().UserId,
                  author: doc.data().author,
                  descr: doc.data().descr,
                  occupation: doc.data().occupation,
                  timestamp: doc.data().timestamp,
                  title: doc.data().title,
                  isActive: doc.data().isActive
              }
              if(doc.id == id){
                setData(data)
              }

          });
        }
         FetchData()
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
    const postuser = usser.filter(user => user.id == data.UserId)
    const isActivepost = () =>{
        if (data.isActive == true){
            return(
                <p className={styles.isActive_active}>active</p>
            )
        }else{
            return(
                <p className={styles.isActive_inactive}>inactive</p>
            )
        }

    }
    const isOptions = () =>{
        if(data.UserId == user.uid){
            return(
                <div className={styles.dropdown_header_options}>
                    <div class="dropdown text-end">
                        <a href="#" class="d-flex link-body-emphasis text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={morevert} width="40px" alt="more" />
                        </a>
                        <ul class="dropdown-menu text-small">
                            <li><a class="dropdown-item" href="#">delete post</a></li>
                        </ul>
                        </div>
                    </div>
            )
        }

    }
    return(
        <div className={styles.wrapper}>
            <Link className={styles.back_home_link} to={'../'}> Back to home</Link>
            <div className={styles.post_wrapper}>
                <div className={styles.post_header}>
                    {isOptions()}
                    <div className={styles.post_header_img}>
                        <img src={addcircle} width="100px" alt="logo or something post photo" />
                    </div>
                </div>
                <div className={styles.post_info}>
                    <div className={styles.naming}>
                        <p>{isActivepost()}</p>
                        <p className={styles.title}> {data.title} </p>
                        <p> <b> Occupation:</b> {data.occupation} </p>
                        <p className={styles.p_about_idea}> <b>About idea:</b> {data.descr} </p>
                    </div>
                    {
                    postuser.map((user, index) =>(
                        <Link to={`/profile/${user.id}`} key={index} className={styles.post_user}>
                            <img src={user.profilePhoto} className={styles.profile_logo} alt="" />
                            <p>{user.username}</p>
                        </Link>
                    ))
                    }
                </div>
        </div>
        </div>

    )
}
export default Post