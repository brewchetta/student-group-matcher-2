import { useState, useEffect } from 'react'

import CohortDetail from "./CohortDetail"
import CohortForm from "./CohortForm"
import ToastWrapper from "components/shared/ToastWrapper"

import * as local from 'utils/localStorageUtils'

import { ToastContextProvider } from  'context/ToastContext'

// --- CohortList COMPONENT --- //
function CohortList(props) {

  // --- STATE --- //

  const [students, setStudents] = useState([])
  const [classNames, setClassNames] = useState(new Set([]))
  const [inspectedStudent, setInspectedStudent] = useState(null)

  const addCohortName = name => setClassNames( prev => new Set([...prev, name]) )

  // --- EFFECTS --- //

  // on load, get cohort names and students from local storage
  useEffect(() => {
    const cohorts = new Set(local.getCohortNames())
    setClassNames(cohorts)
    cohorts.forEach(c => {
      const localStudents = local.getStudents(c)
      if (localStudents) {
        setStudents(prev => [...prev, ...localStudents])
      } else {
        console.warn(`Could not find local students for ${c} in local storage`);
      }
    })
  }, [])

  // whenever cohort names change, set them in local storage
  useEffect(() => {
    local.setCohortNames(Array.from(classNames))
  }, [classNames])

  // --- HELPER FNS --- //

  function filterStudentsByClassName(className) {
    return students.filter(s => s.className === className)
  }

  function addStudent(student) {
    if (!students.find(s => s.name === student.name && s.className === student.className)) {
      setStudents(prev => [...prev, student])
      setClassNames(prev => new Set([...prev, student.className]))
      const prevStudents = local.getStudents(student.className) || []
      local.setStudents(student.className, [...prevStudents, student])
    }
  }

  function removeStudent(student) {
    if (inspectedStudent === student) {
      setInspectedStudent(null)
    }
    setStudents(prev => prev.filter(s => s !== student))
    const prevStudents = local.getStudents(student.className)
    local.setStudents(student.className, prevStudents.filter(s => s.id !== student.id))
  }

  const deleteCohort = cohortName => {
    local.removeCohortByName(cohortName)
    setClassNames(prev => [...prev].filter(name => name !== cohortName))
  }

  // --- RENDERS --- //

  const renderedClassLists = Array.from(classNames).map(cN => (
      <CohortDetail
        key={cN}
        students={filterStudentsByClassName(cN)}
        className={cN}
        setStudentDetail={setInspectedStudent}
        addStudent={addStudent}
        removeStudent={removeStudent}
        deleteCohort={deleteCohort}
      />
  ))

  return (
    <ToastContextProvider>
      <h2>Cohorts List</h2>

      <CohortForm addCohortName={addCohortName} />

      {renderedClassLists}

      <ToastWrapper />

    </ToastContextProvider>
  )
}

export default CohortList
