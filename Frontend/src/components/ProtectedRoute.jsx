import useAuth from "../hooks/useAuth.jsx";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();


  if (isLoading) {
    return
    <div>...Loading</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  } return children;
}
