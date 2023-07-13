import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
const ProtectedRoutes = () => {
    const token = localStorage.getItem('token')
    const screenWidth = window.innerWidth;
    
    return (
        token !== null ?
            <>
                <Header />
                {screenWidth < 500 ?
                    <>
                        <Sidebar />
                        <Outlet />
                    </> :
                    <div className="d-flex">
                        <Sidebar />
                        <Outlet />
                    </div>
                }
            </> :
            <Navigate to='/' />
    );
}

export default ProtectedRoutes;