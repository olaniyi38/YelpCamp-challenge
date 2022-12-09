import './card.styles.scss'
import image from '../../assets/Assets/Camp Images/High Quality Images/Seven Sisters Waterfall.jpg'
import { Button, BUTTON_TYPE_CLASSES } from '../button/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { useInView, motion } from 'framer-motion'

const Card = ({data}) => {
  const { description, imageUrl, name } = data
  const navigate = useNavigate()
  const ref = useRef(null)
  const isInView = useInView(ref,{once: true})

  const navigateTo = (path) => {
    navigate(path)
  }

  const variants = {
    hide:{
      opacity:0,
      y:50
    },
    show: {
      opacity:1,
      y:0
    }
  }

  return (
    <>
      <motion.div transition={{ease:[.53,.18,.53,1.01],duration:.4}} variants={variants} initial='hide' whileInView='show'
        viewport={{once:true}} className="card" ref={ref}>
        <div className="card_image">
          <img src={ imageUrl } alt={name} />
        </div>
        <div className="card_body">
          <h1> {name} </h1>
          <p> {description} </p>
        </div>
        <div className="card_footer">
          <Link to={`/search-page/${name.toLowerCase()}`}> <Button buttonType={BUTTON_TYPE_CLASSES.inverted}> View
          Campground </Button>
          </Link>
        </div>

      </motion.div>
    </>
  )
}

export default Card