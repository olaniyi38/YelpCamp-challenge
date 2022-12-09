import './auth-form.styles.scss'
import { Link, useParams} from 'react-router-dom'
import { Button } from '../button/Button'
import FormInput from '../form-input/FormInput'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signUpStart } from '../../store/reducers/user/user.actions'
import { selectUserIsLoading } from '../../store/reducers/user/user.selectors'
import { toast } from 'react-toastify'
import { AnimatePresence } from 'framer-motion'



const AuthForm = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectUserIsLoading)
    const { authAction } = useParams()
    const pathSignUp = authAction === 'sign-up'
    const pathSignIn = authAction === 'sign-in'

    const defaultFormState = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }


    const [ formState, setFormState ] = useState(defaultFormState)

    const { email, displayName, confirmPassword, password } = formState

    const signUpwithEmailAndPassword = async (e) => {
      e.preventDefault()
     
      try {
        if (!email || !displayName) {
          toast.error('Please fill in all fields');
          return;
        };
        if (!(confirmPassword === password)) {
          toast.error('Passwords do not match');
          return;
        };
        e.target.setAttribute('disabled', true)
        setFormState(defaultFormState)
        dispatch(signUpStart(email, password, {
          displayName
        }))
        }
        catch (error) {
          console.log(error)
        }
    }

    const signInWithEmailAndPassword = async (e) => {
      e.preventDefault()
      try {
        if (!email || !password) {
          toast.error('Please fill in all fields');
          return;
        }
        setFormState(defaultFormState)
        dispatch(signInStart(email, password))
      } catch (error) {
        console.log(error)
      }
    }
  
    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setFormState((prevValue)=>{
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

  return (
    <AnimatePresence mode='wait'>
      <form className='auth-form'>
        {pathSignUp &&
        <FormInput disabled={isLoading} value={displayName} onChange={onChangeHandler} name='displayName' type='text' label='Display Name' />
        }
        <FormInput  disabled={isLoading} value={email} onChange={onChangeHandler} name='email' type='emai' label='Email' />
        <FormInput disabled={isLoading} autoComplete='new-password'  value={password} onChange={onChangeHandler} name='password' type='password' label='Password' />
        {
        pathSignUp &&
        <FormInput  disabled={isLoading}autoComplete='new-password'  value={confirmPassword} onChange={onChangeHandler} name='confirmPassword' type='password'
          label='Confirm Password' />
        }
        { pathSignUp && <Button isLoading={isLoading} disabled={isLoading} onClick={signUpwithEmailAndPassword} spinner={true}> Create an Account </Button> }
        { pathSignIn && <Button isLoading={isLoading} disabled={ isLoading } onClick={signInWithEmailAndPassword} spinner={true}> Sign In </Button> }
        { pathSignUp && <span>Already a user? <Link to={'/auth/sign-in'}>sign in</Link> </span> } 
        { pathSignIn && <span>Not a user? <Link to={'/auth/sign-up'}>sign up</Link> </span> } 
      </form>

    </AnimatePresence>
  )
}

export default AuthForm