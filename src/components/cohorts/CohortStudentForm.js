import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { toSpinalCase, capitalize } from 'utils/stringUtils'
import { useToastContext } from 'context/ToastContext'

function CohortStudentForm({addStudent, cohortName}) {

  const { setToast } = useToastContext()

  const [studentInput, setStudentInput] = useState({
    name: '',
    id: uuid(),
    className: cohortName
  })

  function handleChangeToCapitalized(e) {
    setStudentInput(prev => ({...prev, [e.target.name]: capitalize(e.target.value)}))
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
      setToast(prev => ({ ...prev, toastType: 'success', messages: [`Added ${studentInput.name} to ${studentInput.className}`] }))
      resetInput()
    } else {
      alert('Student must have a name and belong to a class!')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="background-grey padding-medium display-inline-block border-round margin-weak-vertical">

      <label htmlFor="name" style={{marginTop: 0}}>Add New Student</label>
      <input className='border-primary border-round-left pop-focus' type="text" name="name" value={studentInput.name} onChange={handleChangeToCapitalized} />

      <input className="border-primary border-round-right background-alternate pop-focus" type="submit" value="Create Student" />

    </form>
  )
}

export default CohortStudentForm
