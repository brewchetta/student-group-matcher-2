import { useState, useEffect, useRef } from 'react'
import { useToastContext } from 'context/ToastContext'

import CSVParser from 'utils/csvParser'

import Student from "./Student"
import CohortStudentForm from "./CohortStudentForm"

function CohortStudents({className, students, addStudent, removeStudent, deleteCohort}) {

  const csvInputRef = useRef()

  const { setToast } = useToastContext()

  const [listOpen, setListOpen] = useState(false)
  const [csvParser, setCSVParser] = useState({})

  const renderedStudents = students.map(s => (
    <Student
      key={s.id}
      student={s}
      removeStudent={removeStudent}
    />
  ))

  const handleChangeFiles = e => {
    if (csvInputRef.current.files.length) {
      setCSVParser( new CSVParser(csvInputRef.current) )
    }
  }

  const handleAddFromCSV = (e) => {
    e.preventDefault()
    console.log(csvParser.parsedNames)
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

      <h3 className="pointer" onClick={handleToggleOpen}>{className} {"\/\/"} {students.length} students <button className="border-none text-white background-none" style={ listOpen ? ({transition: "transform 0.2s", display: "inline-block"}) : ({display: "inline-block", transform: "rotate(-90deg)", transition: "transform 0.2s"}) }>▼</button></h3>

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

                <form onSubmit={handleAddFromCSV} className="background-grey padding-small border-round">
                  <label style={{marginTop: 0}} htmlFor="csv-upload">Upload CSV</label>
                  <input onChange={handleChangeFiles} ref={csvInputRef} name="csv-upload" type="file" className="text-white" />
                  <input type="submit" value="Upload to Cohort" />
                </form>

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
