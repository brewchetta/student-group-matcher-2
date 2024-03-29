import { useState } from 'react'
import { useToastContext } from 'context/ToastContext'
import { v4 as uuid } from 'uuid'

import Student from "./Student"
import CohortStudentForm from "./CohortStudentForm"
import CohortCSVUploader from "./CohortCSVUploader"

function CohortStudents({className, students, addStudent, removeStudent, deleteCohort}) {

  const { setToast } = useToastContext()

  const [listOpen, setListOpen] = useState(false)

  const renderedStudents = students.map(s => (
    <Student
      key={s.id}
      student={s}
      removeStudent={removeStudent}
    />
  ))

  const uploadStudentList = parsedNames => {
    console.log(parsedNames)
    parsedNames.forEach(studentName => {
      addStudent({
        name: studentName,
        id: uuid(),
        className: className
      })
    })
  }

  const handleToggleOpen = () => setListOpen(prev => !prev)

  const handleDeleteCohort = () => {
    if (window.confirm(`Are you sure you want to delete ${className} and ${students.length} students?`)) {
      setToast(prev => ({...prev, toastType: 'error', messages: [`Deleted "${className}" and ${students.length} students`]}))
      deleteCohort(className)
    }
  }

  return (

    <div>

      <h3 className="pointer" onClick={handleToggleOpen}>{className} {"//"} {students.length} students <button className="border-none text-white background-none" style={ listOpen ? ({transition: "transform 0.2s", display: "inline-block"}) : ({display: "inline-block", transform: "rotate(-90deg)", transition: "transform 0.2s"}) }>▼</button></h3>

        {
          listOpen
          ?
          (
            <div className="background-black border-round padding-medium">

              <div className="grid-column-auto gap-medium">
                {renderedStudents}
              </div>

              <div className="flex row space-between align-center">
                <CohortStudentForm cohortName={className} addStudent={addStudent} />

                <CohortCSVUploader uploadStudentList={uploadStudentList} />

                <div>
                  <button className="border-none background-yellow text-black border-round padding-small" onClick={handleDeleteCohort}>Delete Cohort</button>
                </div>
              </div>



            </div>
          )
          :
          null
        }

      </div>


  )
}

export default CohortStudents
