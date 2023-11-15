import styles from './Feed.module.scss'
import { Link } from 'react-router-dom'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
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
        setTimeout(() => {
          document.querySelector('.alert').classList.add('hidden')
        }, 4000);
      return(
        <div className="alert alert-light w-6/12 m-auto flex justify-center" role="alert">
          <p>Update your profile in settings to enter your Name, Surname etc!</p>
        </div>
      )
      }
    }


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
                  descr: doc.data().descr,
                  occupation: doc.data().occupation,
                  timestamp: doc.data().timestamp,
                  title: doc.data().title,
                  isActive: doc.data().isActive
              }
              libdata.push(data)
              setData(libdata)
          });
        }
        FetchData()
    }, [data])

    const postiteminfo = data.map((post, index) => {
      const isActivepost = () =>{

        if (post.isActive == true){
          const enabledisable = async() =>{
            try{
                  await updateDoc(doc(db, "posts", post.docId), {
                    isActive: false,
                  });
              } catch(e){
                  console.error("Error adding document: ", e);
              }
          }
            return(
              <div className={styles.status}>
                <p className={styles.isActive_active}>active</p>
                <a onClick={enabledisable} className={styles.isActive_btn}>Disable post</a>
              </div>

            )
        }else{
          const enabledisable = async() =>{
            try{
                  await updateDoc(doc(db, "posts", post.docId), {
                    isActive: true,
                  });
              } catch(e){
                  console.error("Error adding document: ", e);
              }
          }
            return(
              <div className={styles.status}>
                <p className={styles.isActive_inactive}>inactive</p>
                <a onClick={enabledisable} className={styles.isActive_btn}>Enable post</a>
              </div>

            )
        }

    }


      if(post.UserId == auth.currentUser.uid){
        return(
          <div className={styles.postitem_wrapper} key={index}>
              <Link to={`/post/${post.docId}`} className="naming">
                  <div className={styles.naming}>
                    <p>{post.title}</p>
                    <p className={styles.post_descr}>{post.descr}</p>
                  </div>

              </Link>
              <div >
                <p>{isActivepost()}</p>
              </div>
          </div>
      )
      }

})

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


            <div className={styles.choicelinks}>
              <a>Your posts</a>
            </div>

            {postiteminfo}

        </div>
      </div>
    )
}


export default FeedPage