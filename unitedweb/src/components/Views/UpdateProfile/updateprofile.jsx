import styles from './updateprofile.module.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { getAuth } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'
import db from "../../../service/firebase.js"
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const storage = getStorage();

const UpdateProfile = () => {
    const navigate = useNavigate()
    const auth = getAuth();
    const user = auth.currentUser;

    const [Name, setName] = useState('')
    const [Surname, setSurname] = useState('')
    const [Bio, setBio] = useState('')
    const [Occupation, setOccupation] = useState('')
    // const [Sex, setSex] = useState('')
    const [Location, setLocation] = useState('')
    const [TG, setTG] = useState('')
    const updatename = async() =>{
        if (Name !== ''){
            try{
                await updateDoc(doc(db, "users", user.uid), {
                    name: Name,
                });
                navigate('../feed', { replace: true })
            } catch(e){
                console.error("Error adding document: ", e);
            }
        }
    }

    const updatesurname = async() =>{
        if (Surname !== ''){
            try{
                await updateDoc(doc(db, "users", user.uid), {
                    surname: Surname,
                });
                navigate('../feed', { replace: true })
            } catch(e){
                console.error("Error adding document: ", e);
            }
        }
    }
    const updatebio = async() =>{
        if (Bio !== ''){
            try{
                await updateDoc(doc(db, "users", user.uid), {
                    bio: Bio,
                });
                navigate('../feed', { replace: true })
            } catch(e){
                console.error("Error adding document: ", e);
            }
        }
    }
    const updateOccupation = async() =>{
        if (Occupation !== ''){
            try{
                await updateDoc(doc(db, "users", user.uid), {
                    occupation: Occupation,
                });
                navigate('../feed', { replace: true })
            } catch(e){
                console.error("Error adding document: ", e);
            }
        }
    }
    const updateLocation = async() =>{
        if (Location !== ''){
            try{
                await updateDoc(doc(db, "users", user.uid), {
                    location: Location,
                });
                navigate('../feed', { replace: true })
            } catch(e){
                console.error("Error adding document: ", e);
            }
        }
    }
    // const updateSex = async() =>{
    //     if (Sex !== ''){
    //         try{
    //             await updateDoc(doc(db, "users", user.uid), {
    //                 sex: Sex,
    //             });
    //             navigate('../feed', { replace: true })
    //         } catch(e){
    //             console.error("Error adding document: ", e);
    //         }
    //     }
    // }
    const updateTG = async() =>{
        if (TG !== ''){
            try{
                await updateDoc(doc(db, "users", user.uid), {
                    tglink: TG,
                });
                navigate('../feed', { replace: true })
            } catch(e){
                console.error("Error adding document: ", e);
            }
        }
    }
    let file = {};

    const chooseFile = (e) => {
        file = e.target.files[0]
    }

    const handleclick = () => {
        if(file.name !== undefined){
            const storageRef  = ref(storage, 'users/' + auth.currentUser.uid + '/profile.jpg');
            uploadBytes(storageRef, file).then(() => {
            console.log('Uploaded a blob or file!');
    });

    getDownloadURL(ref(storage, 'users/' + auth.currentUser.uid + '/profile.jpg'))
    .then(async(url) => {
            try {
                await updateDoc(doc(db, "users", user.uid), {
                    profilePhoto: url
                });
            } catch (e) {
            console.error("Error adding document: ", e);
            }

        updateProfile(auth.currentUser, {
             photoURL: url
        }).then(() => {
            console.log("Profile updated!");
            navigate('../feed', { replace: true })

        }).catch((error) => {
            console.log(error);
            });
        })

    }else{
        alert('Choose a Photo')
    }
    }

    return(
        <div>
            <div className={styles.header}>
        <a href="/">
            <h3>United logo</h3>
        </a>
      </div>
            <div className={styles.form_wrapper}>
                <h2>Edit your profile</h2>
                <input type="file"
                onChange={chooseFile}
            />
            <button onClick={handleclick}  className="btn btn-secondary" >Upload</button>

            <input type="text" placeholder='Name' value={ Name } onChange={(event) => setName(event.target.value)}  />
            <button onClick={updatename} className="btn btn-secondary">Update!</button>

            <input type="text" placeholder='Surname' value={ Surname } onChange={(event) => setSurname(event.target.value)}  />
            <button onClick={updatesurname} className="btn btn-secondary">Update!</button>

            <input type="text" className={styles.bio_input} maxLength="100" placeholder='Bio' value={ Bio } onChange={(event) => setBio(event.target.value)}  />
            <button onClick={updatebio} className="btn btn-secondary">Update!</button>

            <input type="text" placeholder='Occupation' value={ Occupation } onChange={(event) => setOccupation(event.target.value)}  />
            <button onClick={updateOccupation} className="btn btn-secondary">Update!</button>

            <input type="text" placeholder='Your location(City, Country)' value={ Location } onChange={(event) => setLocation(event.target.value)}  />
            <button onClick={updateLocation} className="btn btn-secondary">Update!</button>

            <input type="text" placeholder='Contact link' value={ TG } onChange={(event) => setTG(event.target.value)}  />
            <button onClick={updateTG} className="btn btn-secondary">Update!</button>
            </div>
        </div>

    )
}

export default UpdateProfile