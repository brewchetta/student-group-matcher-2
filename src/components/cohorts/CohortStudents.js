import { useState } from 'react'
import Student from "./Student"
import CohortStudentForm from "./CohortStudentForm"

function CohortStudents({className, students, addStudent, removeStudent}) {

  const [listOpen, setListOpen] = useState(false)

  const renderedStudents = students.map(s => (
    <Student
      key={s.id}
      student={s}
      removeStudent={removeStudent}
    />
  ))

  const handleToggleOpen = () => setListOpen(prev => !prev)

  return (

    <div>

      <h3 className="pointer" onClick={handleToggleOpen}>{className} {"\/\/"} {students.length} students <button className="border-none text-white background-none" style={ listOpen ? ({transition: "transform 0.2s", display: "inline-block"}) : ({display: "inline-block", transform: "rotate(-90deg)", transition: "transform 0.2s"}) }>▼</button></h3>


        {
          listOpen
          ?
          (
            <div className="background-black border-round padding-medium">

              <div className="grid-column-auto gap-medium">
                {renderedStudents}
              </div>

              <CohortStudentForm cohortName={className} addStudent={addStudent} />

            </div>
          )
          :
          null
        }

      </div>


  )
}

export default CohortStudents
