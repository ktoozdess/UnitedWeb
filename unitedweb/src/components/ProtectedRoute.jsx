import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

export const ProtectedRoute = ({ children }) => {
    const user = getAuth();
    console.log(user);
  if (user == null) {
    // user is not authenticated
    alert('You are not auth')
    return <Navigate to="/signin" />;

  }
  return children;
};