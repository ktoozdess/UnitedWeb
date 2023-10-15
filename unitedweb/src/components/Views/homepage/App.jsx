import db from "../../../service/firebase.js"
import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import Header from "../../header/Header.jsx"


function App() {
  const [data, setData] = useState([])
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
        {data.map((car, index) => (
            <p key={index}>{car.sec}</p>
          ))
            }
    </div>
  )
}

export default App
