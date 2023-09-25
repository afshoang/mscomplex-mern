import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../features/auth/authSlice';

const PrivateRoutes = () => {
    const location = useLocation()
    const user = useSelector(selectCurrentUser)

  return (
    user && user.accessToken  ? 
        <Outlet />
            : 
        <Navigate to="/" state={{ from: location }} replace />
  )
}

export default PrivateRoutes