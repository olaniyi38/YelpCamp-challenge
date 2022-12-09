import './review.styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../../store/reducers/user/user.selectors'
import { ReactComponent as DeleteSvg } from '../../assets/Assets/delete.svg'
import { deleteReviewStart } from '../../store/reducers/camps/camps.actions'
import { useState } from 'react'
import { toast } from 'react-toastify'

const Review = ( { review, campName } ) => {
  const [onDelete, setOnDelete] = useState( false )
  const { author, content } = review
  const dispatch = useDispatch()

  const currentUser = useSelector( selectCurrentUser )
  function onDeleteReview() {
    dispatch( deleteReviewStart( review, campName ) )
    setOnDelete( false )
  }

  return (
    <>
      <div className="campground_reviews_review">
        {
          onDelete ?
            <div className='delete-box'>
              <h1>Confirm delete</h1>
              <div>
                <span onClick={ onDeleteReview }>Yes</span> <span onClick={ () => setOnDelete( false ) }>No</span>
              </div>
            </div>
            :
            <>
              <hgroup>
                {
                  currentUser ?
                    <>
                      <h1> { currentUser.displayName === author ? 'You' : author } </h1>
                      { currentUser.displayName === author && <span onClick={ () => setOnDelete( true ) }>
                        <DeleteSvg /> </span> }
                    </>
                    :
                    <h1>{ author }</h1>
                }
                {/* <h4>13h ago</h4> */ }
              </hgroup>
              <p>{ content }</p>
            </>
        }
      </div>
    </>
  )
}

export default Review