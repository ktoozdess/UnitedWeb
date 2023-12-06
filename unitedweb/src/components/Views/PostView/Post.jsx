import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import db from "../../../service/firebase.js"
import styles from './post.module.scss'
import morevert from '../../../assets/more_vert.svg'
import { getAuth } from "firebase/auth";
import {getStorage, ref, deleteObject } from "firebase/storage";
const storage = getStorage();

const Post = () =>{
    const navigate = useNavigate()
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
                  img: doc.data().img,
                  imgId: doc.data().imgId,
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

        if(user && data.UserId == user.uid){
            return(
                <div className={styles.dropdown_header_options}>
                    <div class="dropdown text-end">
                        <a href="#" class=" cursor-pointer d-flex link-body-emphasis text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={morevert} width="40px" alt="more" />
                        </a>
                        <ul class="dropdown-menu text-small animate__animated animate__fadeIn bg-lightbg">
                            <li><a class="cursor-pointer dropdown-item text-text-lighttheme" onClick={deletepost}>delete post</a></li>
                        </ul>
                        </div>
                    </div>
            )
        }
    }
    const deletepost = () => {
        const desertRef = ref(storage,'posts/' +  data.imgId + '/post.jpg');
                // Delete the file
                deleteObject(desertRef).then(() => {
                // File deleted successfully
                deleteDoc(doc(db, "posts", id))
            .then(() => {

                console.log("Document successfully deleted!");
                }).catch(function(error) {
                console.error("Error removing document: ", error);
                });
                console.log('Successfully');
                navigate('../', { replace: true })
                }).catch((error) => {
                // console.log(error);
                });
    }

    return(
        <div class="animate__animated animate__fadeIn">
        <div className={styles.wrapper}>
            <Link className={styles.back_home_link} to={'../'}> Back to home</Link>
            <div className={styles.post_wrapper}>
                <div className={styles.post_header}>
                    {isOptions()}
                    <div className={styles.post_header_img}>
                        <img class="animate__animated animate__fadeIn" src={data.img} width="140px" alt="logo or something post photo" />
                    </div>
                </div>
                <div className={styles.post_info}>
                    <div class="animate__animated animate__fadeIn">
                    <div className={styles.naming}>
                        <p>{isActivepost()}</p>
                        <p className={styles.title}> {data.title} </p>
                        <p> <b> Occupation:</b> {data.occupation} </p>
                        <p className={styles.p_about_idea}> <b>About idea:</b> {data.descr} </p>
                    </div>
                    </div>
                    {
                    postuser.map((user, index) =>(
                        <div class="animate__animated animate__fadeIn">
                        <Link to={`/profile/${user.id}`} key={index} className={styles.post_user}>
                            <img src={user.profilePhoto} className={styles.profile_logo} alt="" />
                            <p>{user.username}</p>
                        </Link>
                        </div>
                    ))
                    }
                </div>
        </div>
        </div>
        </div>
    )
}
export default Post