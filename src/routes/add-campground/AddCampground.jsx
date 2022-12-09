import './add-campground.scss'
import FormInput from "../../components/form-input/FormInput"
import { Button } from '../../components/button/Button'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadCampStart } from '../../store/reducers/camps/camps.actions'
import { selectDisplayName } from '../../store/reducers/user/user.selectors'
import { selectCampsIsLoading  } from '../../store/reducers/camps/camps.selectors'


const AddCampground = () => {
  const dispatch = useDispatch()
  const userName = useSelector(selectDisplayName)
  const isLoading = useSelector(selectCampsIsLoading)
  const defaultState = {
    name: '',
    price: '',
    imageFile: '',
    description: '',
    submittedBy: userName
  }

  const [ formState, setFormState] = useState(defaultState)


  function onChangeHandler(e) {
    let { name, value } = e.target
    if(name === 'imageFile') { value = e.target.files[0] }
    setFormState((prevState)=> {
      return {
        ...prevState,
        [name]:value
      }
    })
  }

  const { name, price, imageFile, description } = formState
 
 async function onSubmitHandler(e) {
  e.preventDefault()
  if(!name || !price || !imageFile || !description) return ;
   dispatch(uploadCampStart(formState))
   setFormState(defaultState)
  }

  return (
    <>
       <main className="add-campground">
        <section>
        <h1>Add new campground</h1>
           <form action="" className="add-campground_form" onSubmit={onSubmitHandler}>
               <FormInput type="text" name='name' label='Campground Name' value={name} onChange={onChangeHandler} />
               <FormInput type="number" name='price' min='0' label='Price' value={price} onChange={onChangeHandler} />
               <FormInput type="file" accept='image/*' name='imageFile' label='Image'  onChange={onChangeHandler}  />
               <FormInput type="text" name='description'  label='Description' value={description} onChange={onChangeHandler} />
               <Button isLoading={isLoading} spinner={true}> Add Campground </Button>
           </form>
        </section>
       </main>
    </>
  )
}

export default AddCampground