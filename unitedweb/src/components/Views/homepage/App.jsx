import db from "../../../service/firebase.js"
import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import Header from "../../header/Header.jsx"
import styles from './homepage.module.scss'
import PostsList from "./PostsList.jsx"



function App() {
  const [data, setData] = useState([])
  const [searchval, setSearchval] = useState('')
  useEffect(() =>{
    onSnapshot(collection(db, "posts"), (snapshot) => {
      const response = snapshot.docs.map(doc => doc.data());
      setData(response)
      // console.log(response);
    })
}, [])

  return (
    <div>
      <Header/>
      <div className={styles.body_wrapper}>
        <div className={styles.search_wrapper}>
            <h3>Search people for Business, <br /> Hobby, Co-work, Co-project and more!</h3>
            <input type="text" placeholder="Search by users, by occupation "
              onChange={(event) => setSearchval(event.target.value)}
            />
        </div>
        <PostsList data={data} searchval={searchval} />
      </div>

    </div>
  )
}

export default App
