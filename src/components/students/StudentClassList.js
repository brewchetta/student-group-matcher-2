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

      <h3 className="pointer" onClick={handleToggleOpen}>{className} <span style={ listOpen ? ({transition: "transform 0.2s", display: "inline-block"}) : ({display: "inline-block", transform: "rotate(-90deg)", transition: "transform 0.2s"}) }>▼</span></h3>

      <div className="grid-column-auto gap-medium border-white border-primary border-round padding-medium">

        {listOpen ? renderedStudents : null}

      </div>

    </div>

  )
}

export default StudentClassList
