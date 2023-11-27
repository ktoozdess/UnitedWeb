import db from "../../../service/firebase.js"
import { useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import Header from "../../header/Header.jsx"
import styles from './homepage.module.scss'
import PostsList from "./PostsList.jsx"
// import theme from '../../../service/theme.js'


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
    <div>
      <Header/>
      <div className={styles.body_wrapper}>
        <div className={styles.search_wrapper}>
            <h3>Search people by occupation for Business, <br /> Hobby, Co-work, Co-project and more!</h3>
            <input type="text" placeholder="Search by title and occupation"
              onChange={(event) => setSearchval(event.target.value)}
            />
        </div>
        <PostsList data={data} searchval={searchval} />
      </div>

    </div>
  )
}

export default App
