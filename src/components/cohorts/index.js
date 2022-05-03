import { useState, useEffect } from 'react'
import CohortStudents from "./CohortStudents"
import CohortForm from "./CohortForm"
import * as local from 'utils/localStorageUtils'

function CohortList(props) {

  const [students, setStudents] = useState([])
  const [classNames, setClassNames] = useState(new Set([]))
  const [inspectedStudent, setInspectedStudent] = useState(null)

  const addCohortName = name => setClassNames( prev => new Set([...prev, name]) )

  useEffect(() => {
    const cohorts = new Set(local.getCohortNames())
    setClassNames(cohorts)
    cohorts.forEach(c => {
      const localStudents = local.getStudents(c)
      setStudents(prev => [...prev, ...localStudents])
    })
  }, [])

  useEffect(() => {
    local.setCohortNames(Array.from(classNames))
  }, [classNames])

  function filterStudentsByClassName(className) {
    return students.filter(s => s.className === className)
  }

  function addStudent(student) {
    setStudents(prev => [...prev, student])
    setClassNames(prev => new Set([...prev, student.className]))
    const prevStudents = local.getStudents(student.className) || []
    local.setStudents(student.className, [...prevStudents, student])
  }

  function removeStudent(student) {
    if (inspectedStudent === student) {
      setInspectedStudent(null)
    }
    setStudents(prev => prev.filter(s => s !== student))
    const prevStudents = local.getStudents(student.className)
    local.setStudents(student.className, prevStudents.filter(s => s.id !== student.id))
  }

  const renderedClassLists = Array.from(classNames).map(cN => (
      <CohortStudents
        key={cN}
        students={filterStudentsByClassName(cN)}
        className={cN}
        setStudentDetail={setInspectedStudent}
        addStudent={addStudent}
        removeStudent={removeStudent}
      />
  ))

  return (
    <>
      <h2>Cohorts List</h2>

      <CohortForm addCohortName={addCohortName} />

      {renderedClassLists}

    </>
  )
}

export default CohortList
