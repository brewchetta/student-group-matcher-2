import { useState } from 'react'
import Student from "./Student"
import CohortStudentForm from "./CohortStudentForm"

function CohortStudents({className, students, setStudentDetail}) {

  const [listOpen, setListOpen] = useState(false)

  const renderedStudents = students.map(s => <Student key={s.id} student={s} setStudentDetail={setStudentDetail} />)

  function handleToggleOpen() {
    setListOpen(prev => !prev)
  }

  return (

    <div>

      <h3 className="pointer" onClick={handleToggleOpen}>{className} - {students.length} students <span style={ listOpen ? ({transition: "transform 0.2s", display: "inline-block"}) : ({display: "inline-block", transform: "rotate(-90deg)", transition: "transform 0.2s"}) }>▼</span></h3>


        {
          listOpen
          ?
          (
            <div className="background-black border-round padding-medium">

              <div className="grid-column-auto gap-medium">
                {renderedStudents}
              </div>

              <CohortStudentForm cohortName={className} addStudent={(i) => console.log(i)} />

            </div>
          )
          :
          null
        }

      </div>


  )
}

export default CohortStudents
