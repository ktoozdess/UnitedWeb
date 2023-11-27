import styles from './Feed.module.scss'
import { Link } from 'react-router-dom'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import db from "../../../service/firebase.js"
import addcircle from '../../../assets/add_circle.svg'
import settings from '../../../assets/settings.svg'
import sunicon from '../../../assets/sun.svg'
import moonicon from '../../../assets/moon.svg'
import theme from '../../../service/theme.js'


const FeedPage = () =>{
    const auth = getAuth();
    const [usser, setUsser] = useState([])
    useEffect(() =>{

      theme()
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
      if ( usser.name == '' || usser.surname == '' || usser.bio == '', usser.location){
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
                  img: doc.data().img,
                  imgId: doc.data().imgId,
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
            <li>
              <img src={moonicon} alt="" class="moon cursor-pointer" width="50px" />
              <img src={sunicon} alt="" class="sun cursor-pointer"  width="50px" />
            </li>
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
            {
              usser.bio && <p className={styles.bio_profile}>Bio: { usser.bio }</p>
            }
            {
              usser.occupation && <p>Occupation: { usser.occupation }</p>
            }
            {
              usser.location && <p>Location: { usser.location }</p>
            }
            {
              usser.tglink  && <p>Contact Link <a class="text-sky-800" href={usser.tglink}>{ usser.tglink }</a></p>
            }
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