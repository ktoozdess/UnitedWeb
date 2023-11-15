import db from "../../../service/firebase.js"
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import Header from "../../header/Header.jsx"
import styles from './homepage.module.scss'
import PostsList from "./PostsList.jsx"



function App() {
  const [data, setData] = useState([])
  const [searchval, setSearchval] = useState('')
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
