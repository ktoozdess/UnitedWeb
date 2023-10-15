import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAT8PIoXLps1QB09jRD9N4PAa46RuWcoAk",
  authDomain: "united-ceb28.firebaseapp.com",
  projectId: "united-ceb28",
  storageBucket: "united-ceb28.appspot.com",
  messagingSenderId: "1040825055890",
  appId: "1:1040825055890:web:93aed9fdda322a9dc6044b",
  measurementId: "G-EEZMJ03GS2"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default getFirestore()
