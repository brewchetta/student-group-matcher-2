import { useState, useEffect } from 'react'
import StudentForm from './StudentForm'
import StudentClassList from "./StudentClassList"
import StudentDetail from "./StudentDetail"
import * as local from 'utils/localStorageUtils'

function StudentList(props) {

  const [students, setStudents] = useState([])
  const [classNames, setClassNames] = useState(new Set([]))
  const [inspectedStudent, setInspectedStudent] = useState(null)

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
      <StudentClassList
        key={cN}
        students={filterStudentsByClassName(cN)}
        className={cN}
        setStudentDetail={setInspectedStudent}
      />
  ))

  return (
    <>
      <h2>Student List</h2>

      <StudentForm addStudent={addStudent} />

      {inspectedStudent ? <StudentDetail student={inspectedStudent} removeStudent={removeStudent} /> : null}

      {renderedClassLists}

    </>
  )
}

export default StudentList
