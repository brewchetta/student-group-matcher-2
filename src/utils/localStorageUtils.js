export function getStudents (className='no-class') {
  return JSON.parse(localStorage.getItem(`students-${className}`))
}

export function setStudents(className='no-class', students) {
  return localStorage.setItem(`students-${className}`, JSON.stringify(students))
}

export function clearStudents(className='no-class') {
  return localStorage.removeItem(`students-${className}`)
}

export function getCohortNames() {
  const cohorts = JSON.parse(localStorage.getItem('cohort-names'))
  return cohorts[0] ? cohorts : []
}

export function setCohortNames(cohortNames) {
  return localStorage.setItem('cohort-names', JSON.stringify(cohortNames))
}

export function clearCohortNames() {
  return localStorage.removeItem('cohort-names')
}
