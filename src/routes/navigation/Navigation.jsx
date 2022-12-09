import './navigation.styles.scss'
import { ReactComponent as LogoSvg } from '../../assets/Assets/Logo.svg'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Button, BUTTON_TYPE_CLASSES } from '../../components/button/Button'
import { ReactComponent as MenuSvg } from '../../assets/Assets/Hamburger Menu.svg'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../../store/reducers/user/user.selectors'
import { signOutUser } from '../../utils/firebase/firebase.utils'
import { USER_ACTION_TYPES } from '../../store/reducers/user/user.types'
import { signOutStart } from '../../store/reducers/user/user.actions'

const Navigation = () => {

  const location = useLocation()
  const currentPath = location.pathname
  
  const dispatch = useDispatch()

  const currentUser = useSelector(selectCurrentUser)

  const [ isMobileNavActive, setMobileNavActive ] = useState(false)
  
  const toggleMobileNav = () => {
    setMobileNavActive(!isMobileNavActive)
  }

  const logOut = () => {
    signOutUser()
    dispatch(signOutStart())
    setMobileNavActive(false)
  }
   
  return (
    <>
      <header className="header">
        <LogoSvg className='header_logo' />
        {
        currentPath !== '/' &&
        <nav className={`header_nav ${ isMobileNavActive && 'active' }` }>
          <Link onClick={()=> setMobileNavActive(false)} to='/'>Home</Link>

          {
          currentUser ? <div className='header_signed-in'>
            <span onClick={()=> setMobileNavActive(false)}>{currentUser.displayName}</span>
            <span onClick={logOut}>LogOut</span>

          </div>
          :
          <div>
            <Link to='/auth/sign-in'>
            <Button onClick={()=> setMobileNavActive(false)} buttonType={BUTTON_TYPE_CLASSES.inverted}>
              Login
            </Button>
            </Link>
            <Link to='/auth/sign-up'>
            <Button onClick={()=> setMobileNavActive(false)}>
              Create an Account
            </Button>
            </Link>
          </div>
          }



        </nav>

        }

        { currentPath !== '/' &&
        <MenuSvg className='mobile-nav-toggle' onClick={toggleMobileNav} />}
      </header>

      <Outlet />
    </>
  )
}

export default Navigation