import { Outlet, useLoaderData, useLocation, useNavigate } from "react-router"
import Navbar from "./Navbar"
import { createContext, useEffect, useState } from "react";
export const MovieContext = createContext();
function Layout() {

   const loaderData = useLoaderData();
  const { error } = loaderData || {};
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const isDetailPage = location.pathname.startsWith('/movie/');

  // Show the error popup whenever the loader returns an error.
  useEffect(() => {
    if (error) {
      setShowErrorPopup(true);
    }
  
  }, [error]);

  return (
    <div className="h-full">
     <MovieContext.Provider value={{showErrorPopup,setShowErrorPopup,isDetailPage,navigate}}>
         <Navbar loaderData={loaderData}/>
          <Outlet />
     </MovieContext.Provider>
        
      
      
    </div>
  )
}

export default Layout