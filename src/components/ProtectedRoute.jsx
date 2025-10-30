import { Navigate } from "react-router-dom";

function ProtectedRoute({ userId, children }) {
  if (!userId) {
    // Not logged in, redirect to signin page
    return <Navigate to="/auth/signin" replace />;
  }
  // Logged in, render children pages
  return children;
}

export default ProtectedRoute;