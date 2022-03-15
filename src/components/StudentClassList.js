import { useState } from 'react'
import Student from "./Student"

function StudentClassList({className, students, setStudentDetail}) {

  const [listOpen, setListOpen] = useState(true)

  const renderedStudents = students.map(s => <Student key={s.id} student={s} setStudentDetail={setStudentDetail} />)

  function handleToggleOpen() {
    setListOpen(prev => !prev)
  }

  return (

    <div>

      <h3 onClick={handleToggleOpen}>{className}</h3>

      {listOpen ? renderedStudents : null}

    </div>

  )
}

export default StudentClassList
