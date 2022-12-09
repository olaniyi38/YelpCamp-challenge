import Spinner from '../spinner/Spinner'
import './button.styles.scss'

const BUTTON_TYPE_CLASSES = {
   inverted: 'button_inverted',
   full: 'button_full'
}

const Button = ({children, buttonType = '', spinner= false,isLoading, ...otherProps}) => {

  
  return (
    <>
       <button className={`button ${buttonType}`} {...otherProps}>
        {children}
        {
         spinner ?
         isLoading && <div className='button_spinner-container'> <Spinner /> </div> :''  
        }      
       </button>
    </>
  )
}

export  {Button,BUTTON_TYPE_CLASSES}