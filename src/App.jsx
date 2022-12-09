import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import AddCampground from './routes/add-campground/AddCampground'
import Auth from './routes/auth/Auth'
import Home from './routes/home/Home'
import Navigation from './routes/navigation/Navigation'
import SearchPage from './routes/search-page/SearchPage'
import { checkUserSession } from './store/reducers/user/user.actions'
import { selectCurrentUser } from './store/reducers/user/user.selectors'
import { ToastContainer,toast,Flip, Zoom } from 'react-toastify'
 import '../node_modules/react-toastify/dist/ReactToastify.css'


 

const App = () => {

  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectCurrentUser)
  
  useEffect(()=>{
     dispatch(checkUserSession())
  },[])

  return (
    <>
       <Routes>
           <Route path='/' element={ <Navigation /> }>
             <Route index element={ <Home /> }/>
             <Route path='search-page/*' element={ <SearchPage /> } />
             <Route path='add-campground' element={ isLoggedIn ? <AddCampground /> : <Navigate replace to='/auth/sign-in' />  } />
             <Route path='auth/*' element={ isLoggedIn ? <Navigate replace to='/search-page' /> : <Auth />} /> 
           </Route>
       </Routes>
       <ToastContainer 
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        rtl={false}
        draggable
        theme='dark'
         pauseOnHover={false}
       ></ToastContainer>
       
       
    </>
  )
}

export default App

//https://fonts.google.com/specimen/Archivo  