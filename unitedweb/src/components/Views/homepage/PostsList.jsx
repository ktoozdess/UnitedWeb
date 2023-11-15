import { useState } from "react"
import { useEffect } from "react";
import styles from './postslist.module.scss'
import { getDocs, collection } from "firebase/firestore";
import db from "../../../service/firebase.js"
import { Link } from "react-router-dom";

const PostsList = ({data,searchval}) =>{
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
        const postdata = data.filter(post => post.title.toLowerCase().includes(searchval) || post.title.toUpperCase().includes(searchval) || post.title.includes(searchval) || post.occupation.toLowerCase().includes(searchval) || post.occupation.toUpperCase().includes(searchval) || post.occupation.includes(searchval))
       const filtereditems = postdata.map((post, index) => {
        const postuser = usser.filter(user => user.id == post.UserId)
        if(post.isActive == true){
            return(
                <div className={styles.postitem_wrapper} key={index}>
                    <Link to={`/post/${post.docId}`} className="naming">
                        <p>{post.title}</p>
                        <p className={styles.post_descr}>{post.descr}</p>
                    </Link>
                        {
                            postuser.map((user, index) =>(
                                <Link to={`/profile/${user.id}`} key={index} className={styles.post_user}>
                                    <img src={user.profilePhoto} className={styles.profile_logo} alt="" />
                                    <p>{user.username}</p>
                                </Link>
                            ))
                        }
                </div>
            )
        }

})

//      const postiteminfo = data.map((post, index) => {
//         const postuser = usser.filter(user => user.id == post.UserId)
//         if(post.isActive == true){
//             return(
//                 <div className={styles.postitem_wrapper} key={index}>
//                     <Link to={`/post/${post.docId}`} className="naming">
//                         <p>{post.title}</p>
//                         <p className={styles.post_descr}>{post.descr}</p>
//                     </Link>
//                         {
//                             postuser.map((user, index) =>(
//                                 <Link to={`/profile/${user.id}`} key={index} className={styles.post_user}>
//                                     <img src={user.profilePhoto} className={styles.profile_logo} alt="" />
//                                     <p>{user.username}</p>
//                                 </Link>
//                             ))
//                         }
//                 </div>
//             )
//         }

// })

    return(
        <>
        {filtereditems}
            {/* {postiteminfo} */}
        </>


    )
}

export default PostsList