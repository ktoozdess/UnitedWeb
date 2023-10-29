import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/Views/homepage/App.jsx'
import './assets/styles/global.css'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignIn from './components/Views/SignIn/SignIn.jsx';
import SignUp from './components/Views/SignUp/SignUp.jsx';
import AboutUs from './components/Views/AboutUs/AboutUs.jsx';
import FeedPage from './components/Views/FeedPage/feed.jsx'
import UpdateProfile from './components/Views/UpdateProfile/updateprofile.jsx'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import CreatePost from './components/Views/CreatePost/CreatePost.jsx'


const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user);
  } else {
    console.log('no');
  }
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/signin",
    element: <SignIn/>,
  },
  {
    path: "/signup",
    element: <SignUp/>,
  },
  {
    path: "/aboutus",
    element: <AboutUs/>,
  },
  {
    path: "/feed",
    element: <ProtectedRoute><FeedPage/></ProtectedRoute>,
  },
  {
    path: "/createpost",
    element: <ProtectedRoute><CreatePost/></ProtectedRoute>,
  },
  {
    path: "/updateprofile",
    element: <ProtectedRoute><UpdateProfile/></ProtectedRoute>,
  },
  // {
  //   path: "/car/:id",
  //   element: <CarDetail/>,
  // },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
      <RouterProvider router={router}/>
)
