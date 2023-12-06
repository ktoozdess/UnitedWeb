import db from "../../../service/firebase.js"
import { useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import Header from "../../header/Header.jsx"
import styles from './homepage.module.scss'
import PostsList from "./PostsList.jsx"
import { Link } from "react-router-dom"


const App =() => {
  const [data, setData] = useState([])
  const [searchval, setSearchval] = useState('')
  const libdata = []
  useEffect(() =>{
    // theme()
    const FetchData = async() =>{
      const querySnapshot = await getDocs(query(collection(db, "posts"),orderBy('timestamp')));
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

  return (
    <div class="animate__animated animate__fadeIn">
      <Header/>
      <div className={styles.body_wrapper}>

        <div className={styles.search_wrapper}>
        <div class="animate__animated animate__fadeInLeft">
            <p className={styles.quote}>Search people by occupation for Business, <br /> Hobby, Co-work, Co-project and more! <Link class="text-sky-800" to={'/aboutus'}>Read more about Us</Link></p>
            <input class="dark:bg-lightbg dark:placeholder-text-lighttheme dark:text-text-lighttheme" type="text" placeholder="Search by title and occupation"
              onChange={(event) => setSearchval(event.target.value)}
            />
        </div>
        </div>

        <PostsList data={data} searchval={searchval} />
      </div>

    </div>
  )
}

export default App
