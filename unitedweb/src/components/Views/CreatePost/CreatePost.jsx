import styles from './CreatePost.module.scss'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from '@firebase/firestore';
import db from "../../../service/firebase.js"
import { getAuth } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import logoUnited from '../../../assets/logoUnited.png'
import {getStorage, uploadBytes, getDownloadURL, ref } from "firebase/storage";
const storage = getStorage();

const CreatePost = () =>{
    const navigate = useNavigate()
    const auth = getAuth();
    const user = auth.currentUser;
    const [Title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [Occupation, setOccupation] = useState('')
    useEffect(() =>{
        const userTheme = localStorage.getItem("theme")
        const systemTheme = window.matchMedia("(prefers-color-scheme:dark)").matches
        const ThemeCheck = () =>{
        if (userTheme === "dark" || (!userTheme && systemTheme)){
            document.documentElement.classList.add("dark")
            return
        }
        }
  ThemeCheck()
    },[])
    let file = {};

    const chooseFile = (e) => {
        file = e.target.files[0]
        console.log(file);
    }

    const createposthandle = () => {
        const postId = uuidv4();
        console.log(file);
        if(file.name !== undefined && Title != '' && Occupation != '' ){
            const storageRef  = ref(storage, 'posts/' + postId + '/post.jpg');
            uploadBytes(storageRef, file).then(() => {
            console.log('Uploaded a blob or file!');
            getDownloadURL(ref(storage, 'posts/' + postId + '/post.jpg'))



    .then(async(url) => {
        try {
            const docRef = await addDoc(collection(db, "posts"), {
                title: Title,
                img: url,
                imgId: postId,
                descr: Description,
                occupation: Occupation,
                author: user.displayName,
                UserId: user.uid,
                timestamp: -(+new Date()),
                isActive: true
            });
                console.log("Document written with ID: ", docRef.id);
                navigate('../', { replace: true })
            } catch (e) {
            console.error("Error adding document: ", e);
            }
        })
    });
    }else{
        alert('Choose a Photo')
    }
    }


    return(
        <div class="animate__animated animate__fadeIn">
        <div className={styles.wrapper}>

            <Link class="dark:text-text-darktheme" className={styles.back_home_link} to={'../'}> Back to home</Link>
            <div className={styles.header}>
        <a href="/">
            <img src={logoUnited} alt="" width="180px" />
        </a>
      </div>
        <div className={styles.form}>
            <p>Create post</p>
            <input type="text" placeholder='Title' value={ Title } onChange={(event) => setTitle(event.target.value)}  />
            <input type="text" placeholder='Description' value={ Description } onChange={(event) => setDescription(event.target.value)}  />
            <input type="text" placeholder='Occupation' value={ Occupation } onChange={(event) => setOccupation(event.target.value)}  />
            <div class="form-file">
                <input class="form-control" type="file"
                    onChange={chooseFile}
                />
            </div>
            <a className={styles.btn_submit} onClick={createposthandle}>Create Post!</a>
            </div>
        </div>
        </div>
    )
}

export default CreatePost