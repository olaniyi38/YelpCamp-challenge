import './spinner.styles.scss'

const Spinner = ({width='',height=''}) => {
  return (
    <div className="spinner-container">
        <div style={{width:width,height:height}}
         className="spinner"></div>
    </div>
  )
}

export default Spinner