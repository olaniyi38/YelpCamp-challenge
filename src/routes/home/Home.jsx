import './home.styles.scss'
import heroImgPortrait from '../../assets/Assets/Hero Image.jpg'
import heroImgLandscape from '../../assets/Assets/Hero Image (Tablet and Mobile).jpg'



import { ReactComponent as CheckmarkSvg } from '../../assets/Assets/Checkmark.svg'
import { ReactComponent as BookingSvg } from '../../assets/Assets/Plum Guide.svg'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/button/Button'
import { motion } from 'framer-motion'


const Home = () => {

  const [ screenWidth, setScreenWidth ] = useState(window.innerWidth)

  const navigate = useNavigate()

  const navigateTo = (path) => {
     navigate(path)
  }

  window.addEventListener('resize',()=>{
    setScreenWidth(window.innerWidth)
  })

 
  
  return (
    <>
       <main className='home'>
             
           <section className='home_hero-img'>
              {
                screenWidth >= 768 ? <img src={heroImgPortrait} alt="" />
                : <img src={heroImgLandscape} alt="" />
              }
            
           </section>
           <section className="home_content">
             <motion.h1 transition={{delay:.2,duration:.4}} initial={{y:40,opacity:0}} animate={{y:0,opacity:1}}>
              Explore the best camps on earth
             </motion.h1>
             <motion.p transition={{delay:.4,duration:.4}} initial={{y:20,opacity:0}} animate={{y:0,opacity:1}}>Yelpcamp is Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, nesciunt?</motion.p>
             <motion.ul transition={{delay:.6,duration:.4}} initial={{x:20,opacity:0}} animate={{x:0,opacity:1}}>
              <li> <CheckmarkSvg /> Lorem ipsum dolor sit amet.  </li>
              <li> <CheckmarkSvg /> Lorem ipsum dolor sit amet. </li>
              <li> <CheckmarkSvg /> Lorem ipsum dolor sit amet. </li>
             </motion.ul>
             <Button onClick={ ()=> navigateTo('/search-page') }>
                  View Campgrounds
             </Button>
             <h3>Partnered with:</h3>
             <motion.div transition={{delay:0}} initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} className='home_content_partners'>
                 <span><BookingSvg /></span>
                 <span><BookingSvg /></span>
                 <span><BookingSvg /></span>
                 <span><BookingSvg /></span>
                
             </motion.div>
             
           </section>
       </main>
    </>
  )
}

export default Home