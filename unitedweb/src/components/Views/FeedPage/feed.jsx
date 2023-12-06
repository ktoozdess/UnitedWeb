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
import logoUnited from '../../../assets/logoUnited.png'


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
            // console.log(error);
        });
    }

    const alertupdateprofile = () =>{
      if ( usser.name == '' || usser.surname == '' || usser.bio == '', usser.location){
        setTimeout(() => {
          document.querySelector('.alert').classList.add('hidden')
        }, 4000);
      return(
        <div class="alert alert-light w-8/12 m-auto flex justify-center animate__animated animate__fadeInDown" role="alert">
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
                <a onClick={enabledisable} class="cursor-pointer" className={styles.isActive_btn}>Disable post</a>
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
                <a onClick={enabledisable} class="cursor-pointer" className={styles.isActive_btn}>Enable post</a>
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
      <div class="animate__animated animate__fadeIn">

      <div className={styles.wrapper}>
        <div className={styles.header}>
        <a href="/">
          <img src={logoUnited} width="140px" alt="United Logo" />
        </a>
        <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            {/* <li><a href="#" class="nav-link px-2">Pricing</a></li> */}
            {/* <li><a href="#" class="nav-link px-2">FAQs</a></li> */}
            <li><Link to={'/aboutus'} class="text-text-lighttheme dark:text-text-darktheme px-2">About</Link></li>
        </ul>
        <div className="flex">
        <Link to={`/createpost`} className={styles.add_circle}>
              <img src={addcircle} alt="add" width="42" height="42" />
          </Link>
          <div className="dropdown">
          <a type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={settings} alt="add" width="42" height="42" />
          </a>
          <ul className="dropdown-menu animate__animated animate__fadeIn bg-lightbg">
            <li class="sun cursor-pointer">
              <div className="d-flex dropdown-item text-text-lighttheme">
                Change Theme
                <img src={sunicon} alt="" class="cursor-pointer" width="50px" />
              </div>
            </li>
            <li class="moon cursor-pointer">
              <div className="dropdown-item d-flex text-text-lighttheme">
                Change Theme
                <img src={moonicon} alt="" class="cursor-pointer" width="50px" />
              </div>
            </li>
            <li><Link class="dropdown-item text-text-lighttheme" to={'/updateprofile'} >Update profile</Link></li>
            <li><a class="dropdown-item text-text-lighttheme" onClick={logout} >LogOut</a></li>
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
              usser.bio && <div className={styles.bio_profile}><p>Bio: { usser.bio }</p></div>
            }
            {
              usser.occupation && <p>Occupation: { usser.occupation }</p>
            }
            {
              usser.location && <p>Location: { usser.location }</p>
            }
            {
              usser.tglink  && <p class="text-center">Contact Link <a class="text-sky-800" href={usser.tglink}>{ usser.tglink }</a></p>
            }
          </div>


            <div className={styles.choicelinks}>
              <a>Your posts</a>
            </div>

            {postiteminfo}

        </div>
      </div>

      </div>
    )
}

export default FeedPage