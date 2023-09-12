import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../app/features/authSlice"

const PrivateRoutes = () => {
    const location = useLocation()
    const token = useSelector(selectCurrentToken)

  return (
    token  ? 
        <Outlet />
            : 
        <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default PrivateRoutes