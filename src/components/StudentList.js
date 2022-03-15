import { useState } from 'react'
import StudentForm from './StudentForm'
import StudentClassList from "./StudentClassList"
import StudentDetail from "./StudentDetail"

function StudentList(props) {

  const [students, setStudents] = useState([])
  const [classNames, setClassNames] = useState(new Set())
  const [inspectedStudent, setInspectedStudent] = useState(null)

  function filterStudentsByClassName(className) {
    return students.filter(s => s.className === className)
  }

  function addStudent(student) {
    setStudents(prev => [...prev, student])
    setClassNames(prev => new Set([...prev, student.className]))
  }

  function removeStudent(student) {
    if (inspectedStudent === student) {
      setInspectedStudent(null)
    }
    setStudents(prev => prev.filter(s => s !== student))
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
