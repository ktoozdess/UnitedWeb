import styles from './CreatePost.module.scss'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from '@firebase/firestore';
import db from "../../../service/firebase.js"
import { getAuth } from 'firebase/auth';

const CreatePost = () =>{
    const navigate = useNavigate()
    const auth = getAuth();
    const user = auth.currentUser;
    const [Title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [Occupation, setOccupation] = useState('')

    const createposthandle = async() =>{
        if(Title != '' || Occupation != ''){
            try {
                const docRef = await addDoc(collection(db, "posts"), {
                    title: Title,
                    descr: Description,
                    author: user.displayName,
                    UserId: user.uid,
                    timestamp: -(+new Date()),
                });
                    console.log("Document written with ID: ", docRef.id);
                    navigate('../', { replace: true })
                } catch (e) {
                console.error("Error adding document: ", e);
                }
            }else{
                console.log('have');
            }

    }

    return(
        <div>
        <div className={styles.form}>
            <input type="text" placeholder='Title' value={ Title } onChange={(event) => setTitle(event.target.value)}  />
            <input type="text" placeholder='Description' value={ Description } onChange={(event) => setDescription(event.target.value)}  />
            {/* <input type="text" placeholder='Username' value={ image } onChange={(event) => setUsername(event.target.value)}  /> */}
            <input type="text" placeholder='Occupation' value={ Occupation } onChange={(event) => setOccupation(event.target.value)}  />

            <a className={styles.btn_submit} onClick={createposthandle}>Create Post!</a>
            </div>
        </div>
    )
}

export default CreatePost