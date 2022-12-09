import {
    all,
    put,
    call,
    takeLatest
} from 'redux-saga/effects'
import {
    createUserAuthWithEmailAndPassword,
    createUserDocumentFromAuth,
    getCurrentUser,
    signInUserWithEmailAndPassword,
    signOutUser
} from '../../../utils/firebase/firebase.utils'
import {
    checkUserSessionSuccess,
    signInFailed,
    signInSucces,
    signOutFailed,
    signOutSuccess
} from './user.actions'
import { USER_ACTION_TYPES } from './user.types'
import { toast } from 'react-toastify'


function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser)
        if(userAuth) {
        const userDoc = yield call(createUserDocumentFromAuth, userAuth)
        yield put(signInSucces(userDoc))
        yield call(toast.success,`Signed in as ` + userDoc.displayName) 
        } else { 
            yield put(checkUserSessionSuccess())

        }
    } catch (error) {
        yield put(signInFailed(error))
      
        yield call(toast.error, '' + error.message)
    }
}

function* signUpUser({payload}) {
    const {  email, password, otherInfo } = payload
    try {
      const { user:userAuth } = yield call(createUserAuthWithEmailAndPassword,email,password )
      const userDoc = yield call(createUserDocumentFromAuth,userAuth,otherInfo)
      yield put(signInSucces(userDoc))
      yield call(toast.success,`Signed in as ` + userDoc.displayName) 
    } catch(error) {
       yield put(signInFailed(error))
       yield call(toast.error, '' + error.code.split('/')[1])

    }
}

function* signInUser({payload}) {
    const { email,  password} = payload
    try {
        const { user:userAuth } = yield call(signInUserWithEmailAndPassword, email, password)
        const userDoc = yield call(createUserDocumentFromAuth, userAuth)
        console.log(userDoc)
        yield put(signInSucces(userDoc))
        yield call(toast.success,`Signed in as ` + userDoc.displayName) 
    } catch (error) {
        yield put(signInFailed(error))
        yield call(toast.error, '' + error.code.split('/')[1])
       
    }

}

function* logOutUser() {
    try {
        yield call(signOutUser)
        yield put(signOutSuccess())
    } catch (error) {
       yield put(signOutFailed(error))
       yield call(toast.error, '' + error.code.split('/')[1])
       
    }
}

function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

function* onUserSignIn() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_IN_START, signInUser)
}

function* onUserSignUp() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpUser)
}

function* onUserSignOut() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, logOutUser)
}


export function* userSaga() {
    yield all([call(onCheckUserSession), call(onUserSignIn), call(onUserSignUp), call(onUserSignOut)])
}