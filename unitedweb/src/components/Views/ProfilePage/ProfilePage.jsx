import styles from './Profile.module.scss'
import Header from "../../header/Header.jsx"
import { Link,useParams } from 'react-router-dom'
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore'
import db from "../../../service/firebase.js"


const ProfilePage = () =>{
    const auth = getAuth();
    const {id} = useParams()
    const [usser, setUsser] = useState([])
    useEffect(() =>{
      const FetchUser = async() =>{
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          if (doc.id == id){
            setUsser(doc.data())
            console.log(doc.data());
          }
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

    const navigate = useNavigate()
      const [data, setData] = useState([])
      const libdata = []
      useEffect(() =>{
        const FetchData = async() =>{
          const querySnapshot = await getDocs(collection(db, "posts"));
          querySnapshot.forEach((doc) => {
              const data ={
                  docId: doc.id,
                  UserId: doc.data().UserId,
                  author: doc.data().author,
                  img: doc.data().img,
                  imgId: doc.data().imgId,
                  descr: doc.data().descr,
                  occupation: doc.data().occupation,
                  timestamp: doc.data().timestamp,
                  title: doc.data().title,
                  isActive: doc.data().isActive,
              }
              libdata.push(data)
              setData(libdata)
          });
        }
        FetchData()
    }, [])

    const postiteminfo = data.map((post, index) => {
      const isActivepost = () =>{

        if (post.isActive == true){
            return(
              <div className={styles.status}>
                <p className={styles.isActive_active}>active</p>
              </div>

            )
        }else{
            return(
              <div className={styles.status}>
                <p className={styles.isActive_inactive}>inactive</p>
              </div>
            )
        }

    }
      if(post.UserId == id){
        return(
          <div className={styles.postitem_wrapper} key={index}>
              <Link to={`/post/${post.docId}`} className="naming">
                  <p>{post.title}</p>
                  <p className={styles.post_descr}>{post.descr}</p>

              </Link>
              {isActivepost()}
          </div>
      )
      }else{
        return(
          <>
            <p>No posts</p>
          </>
        )
      }

})

    return(
      <div class="animate__animated animate__fadeIn">
      <div className={styles.wrapper}>
        <Header/>
        <div className={styles.feed_wrapper}>
          <div className={styles.profile}>
            <img src={usser.profilePhoto} className={styles.profile_logo} alt="profile photo" />
            <p>{usser.name} {usser.surname}</p>
            <p>@{ usser.username }</p>
            <p>Email: {usser.email}</p>

            {
              usser.bio && <p>Bio: { usser.bio }</p>
            }
            {
              usser.occupation && <p>Occupation: { usser.occupation }</p>
            }
            {
              usser.location && <p>Location: { usser.location }</p>
            }
            {
              usser.tglink && <p class="text-center">Contact Link <a  class="text-sky-800"  href={usser.tglink}>{ usser.tglink }</a></p>
            }
          </div>


            <div className={styles.choicelinks}>
              <a>{usser.username}`s posts</a>
            </div>

            {postiteminfo}

        </div>
      </div>
      </div>
    )
}

export default ProfilePage
