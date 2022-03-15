import { useState } from 'react'
import { v4 as uuid } from 'uuid'

function StudentForm(props) {

  const [studentInput, setStudentInput] = useState({
    name: '',
    className: ''
  })

  function handleChange(e) {
    setStudentInput(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(studentInput)
  }

  return (
    <form onSubmit={handleSubmit}>

      <label htmlFor="name">Student Name:</label>
      <input type="text" name="name" value={studentInput.name} onChange={handleChange} />

      <label htmlFor="className">Class:</label>
      <input type="text" name="className" value={studentInput.className} onChange={handleChange} />

      <input type="submit" value="Create Student" />

    </form>
  )
}

export default StudentForm
