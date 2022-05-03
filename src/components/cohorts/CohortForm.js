import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { toSpinalCase, capitalize } from 'utils/stringUtils'

function CohortForm({addStudent}) {

  const [studentInput, setStudentInput] = useState({
    name: '',
    id: uuid(),
    className: ''
  })

  function handleChangeToCapitalized(e) {
    setStudentInput(prev => ({...prev, [e.target.name]: capitalize(e.target.value)}))
  }

  function handleChangeToSpinalCase(e) {
    setStudentInput(prev => ({...prev, [e.target.name]: toSpinalCase(e.target.value)}))
  }

  function validateInput() {
    return !!studentInput.name.length && !!studentInput.className.length
  }

  function resetInput() {
    setStudentInput(prev => ({...prev, name: '', id: uuid()}))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (validateInput()) {
      addStudent(studentInput)
      resetInput()
    } else {
      alert('Student must have a name and belong to a class!')
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      <label htmlFor="className">Class:</label>
      <input className='border-primary border-round pop-focus' type="text" name="className" value={studentInput.className} onChange={handleChangeToSpinalCase} />

      <label htmlFor="name">Student Name:</label>
      <input className='border-primary border-round-left pop-focus' type="text" name="name" value={studentInput.name} onChange={handleChangeToCapitalized} />

      <input className="border-primary border-round-right background-alternate pop-focus" type="submit" value="Create Student" />

    </form>
  )
}

export default CohortForm
