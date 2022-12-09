import './form-input.styles.scss'
import { motion } from 'framer-motion'
const FormInput = ({label ,...inputProps}) => {
  return (
    <>
       <motion.div initial={{opacity:.5,x:-20}} animate={{opacity:1,x:0}} exit={{opacity:0}} className="form-group" >
          <label htmlFor="">{label}</label>
          <input required={true} {...inputProps}  />
       </motion.div>
    </>
  )
}

export default FormInput