import { Button } from '../../components/button/Button'
import './campground.styles.scss'
import { ReactComponent as ChatSvg } from '../../assets/Assets/Chat Bubble.svg'
import Review from '../../components/review/Review'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../../components/spinner/Spinner'

import { selectCurrentUser } from '../../store/reducers/user/user.selectors'
import { motion } from 'framer-motion'

const Campground = () => {

   const { campName } = useParams()
  
   const [campgroundInfo, setCampgroundInfo] = useState({})

   const camps = useSelector((state)=>state.camps.camps)
 
  const currentUser = useSelector(selectCurrentUser)

  useEffect(()=>{
    const queriedCamp =  camps.find((camp)=>( camp.name.toLowerCase() === campName.toLowerCase() ))
    setCampgroundInfo(()=>{
    return queriedCamp
    })
    // window.scrollTo({
    //   top:0,
    //   left:0,
    //   behavior:'smooth'
    // })
  },[camps, campName, campgroundInfo])
  
  
  if(!campgroundInfo) { return <div style={{width:'100%' ,height:'60vh',display:"grid",placeItems:'center'}}>
     <Spinner width='5rem' height='5rem'/> 
     </div> }
 
  const { name, price, description, reviews, submittedBy, imageUrl } = campgroundInfo
  
  return (
    <main className='campground'>
      <section className='campground_info'>
        <div className='campground_info_img'>
          <img src={imageUrl} alt="" />
        </div>
        <div className='campground_info_content'>
          <motion.hgroup transition={{duration:.3}} initial={{y:20,opacity:0}} animate={{y:0,opacity:1}}>
            <h1>{name}</h1>
            <h4>${price}</h4>
          </motion.hgroup>

          <motion.p transition={{duration:.3,delay:.5}} initial={{opacity:0}} animate={{opacity:1}}>{description}
          </motion.p>

          <motion.p transition={{duration:.3,delay:.7}} initial={{opacity:0}} animate={{opacity:1}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid quidem tempora debitis nesciunt
            quae veritatis enim quis eius, voluptatibus perferendis maiores soluta
          </motion.p>

          <motion.span transition={{duration:.3,delay:.9}} initial={{x:-40,opacity:0}} animate={{x:0,opacity:1}}>
            Submitted by
            <b style={{marginLeft:'.3rem'}}>
              {
              currentUser ?
              currentUser.displayName === submittedBy ? 'You' : submittedBy
              : submittedBy
              }
            </b>
          </motion.span>
        </div>
      </section>
      <section className='campground_reviews'>
        <div>
          {
          reviews ?
          reviews.length > 0 ? reviews.map((review,index)=>
          <Review key={index} review={review} campName={campName} /> ) :
          <p style={{marginBottom:'1rem'}}>No reviews,say something...</p>
          : ''
          }
        </div>
        <Link to={`/search-page/${campName}/add-comment`}> <Button>
        <ChatSvg />
        <span>Leave a Review</span>
        </Button>
        </Link>
      </section>
    </main>
  )
}

export default Campground