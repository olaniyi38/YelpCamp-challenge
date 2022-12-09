import { useParams } from 'react-router-dom'
import { Button } from '../../components/button/Button'
import './add-coment.styles.scss'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadReviewStart } from '../../store/reducers/camps/camps.actions'
import { selectCampsIsLoading } from '../../store/reducers/camps/camps.selectors'

const AddComment = () => {
  const dispatch = useDispatch()
  const userName = useSelector((state) => state.user.currentUser.displayName)
  const isLoading = useSelector(selectCampsIsLoading)
  const { campName } = useParams()
  const [comment, setComment] = useState('')

  function onChangeHandler(e) {
    const {
      value
    } = e.target
    setComment(value)
  }


  function onSubmitHandler(e) {
    if (!comment) return;
    e.preventDefault()
    const data = {
      author: userName,
      content: comment,
    }
    dispatch(uploadReviewStart(data, campName))
    setComment('')
  }

  return (
    <>
        <main className='add-comment'>
           <section>
           <h1>Add new comment</h1>
            <form action="" onSubmit={onSubmitHandler}>
                <label htmlFor="">Description</label>
                <textarea onChange={onChangeHandler} disabled={isLoading} value={comment} name="comment" cols="30" rows="10">

                </textarea>
                <Button isLoading={isLoading} spinner={true}> Post Comment </Button>
            </form>
           </section>
        </main>
    </>
  )
}

export default AddComment