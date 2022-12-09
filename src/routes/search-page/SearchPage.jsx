import './search-page.styles.scss'

import { Navigate, Route, Routes} from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchCampsStart, fetchCampsSuccess} from '../../store/reducers/camps/camps.actions'
import { selectCurrentUser } from '../../store/reducers/user/user.selectors'

import { ReactComponent as SearchSvg} from '../../assets/Assets/Search Icon.svg'
import { Link } from "react-router-dom"
import Campground from '../campground/Campground'
import AddComment from '../add-comment/AddComment'
import { Button } from '../../components/button/Button'
import Card from '../../components/card/Card'
import Spinner from '../../components/spinner/Spinner'
import { toast } from 'react-toastify'
import { motion, animate, useInView } from 'framer-motion'



const SearchPage = () => {
  const dispatch = useDispatch()
  const camps = useSelector((state)=> state.camps.camps)
  const isLoggedIn = useSelector(selectCurrentUser)


  useEffect(()=>{
    dispatch(fetchCampsStart())

  },[])

  const [ searchWords, setSearchWords ] = useState('')

  const onChangeHandler = (e) => {
    const { value } = e.target
    setSearchWords(value)
  }
  
  const filteredCamps = camps.filter((camp)=> camp.name.toLowerCase().includes(searchWords.toLowerCase()))
  console.log(camps);


 
  return (
      <>
         <Routes>
            <Route index element={
              <main className='search-page'>
                <section className="search-page_hero">
                  <motion.h1 transition={{duration:.3}} initial={{y:30,opacity:0}} animate={{y:0, opacity:1}} >Welcome to YelpCamp!</motion.h1>
                  <motion.p transition={{delay:.3,duration:.3}} initial={{y:30,opacity:0}} animate={{y:0, opacity:1}} >View our hand-picked campgrounds from all over the world, or add your own</motion.p>
                  <motion.div transition={{delay:.6,duration:.3}} initial={{opacity:0}} animate={{opacity:1}} className="search-page_search">
                    <div className="search-page_input">
                      <input type="text" placeholder='search for camps' onChange={onChangeHandler}
                        value={searchWords} />
                      <SearchSvg />
                    </div>
                    <Button>Search</Button>
                  </motion.div >
                  <Link to='/add-campground'>or add your own campground</Link>
                </section>
                <section className="search-page_camps" >
                  {
                  camps.length !== 0 ?
                  filteredCamps.map((camp, index)=>{
                    return <Card data={camp} key={index} />
                  }) :
                  <Spinner width='3rem' height='3rem' />
                  }
                </section>
              </main>
            } />
            <Route path=':campName' element={<Campground />} />
            <Route path=':campName/add-comment' element={  isLoggedIn ? <AddComment /> : <Navigate replace to='/auth/sign-in' /> } />

         </Routes>
    </>
  
  )
}

export default SearchPage