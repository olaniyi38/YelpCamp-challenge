import './auth.styles.scss'
import { Link, Route, Routes,} from 'react-router-dom'
import AuthForm from '../../components/auth-form/AuthForm'

import {  ReactComponent as UserSvg } from '../../assets/Assets/User Testimonial.svg'
import { ReactComponent as ArrowLeftSvg} from '../../assets/Assets/Arrow-left.svg'

const Auth = () => {
 
   

  return (
    <>
        <main className="auth">
            <Link to='/search-page'> <ArrowLeftSvg /> <span>Back to campgrounds</span> </Link>
            <div className='auth_container'>
            <section className='auth_form'>
                <h1>Start exploring camps all over the world</h1>
                <Routes>
                    <Route path=':authAction' element={<AuthForm />} />
                </Routes>
               
            </section>
            <section className='auth_testimonial'>
                <div>
                   <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, adipisci?
                   </p>
                   <UserSvg />
                   <p>John Doe</p>
                </div>
            </section>
            </div>
        </main>
    </>
  )
}

export default Auth