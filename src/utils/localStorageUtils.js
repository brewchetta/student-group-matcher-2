export function getStudents (cohortName='no-class') {
  return JSON.parse(localStorage.getItem(`students-${cohortName}`))
}

export function setStudents(cohortName='no-class', students) {
  return localStorage.setItem(`students-${cohortName}`, JSON.stringify(students))
}

export function clearStudents(cohortName='no-class') {
  return localStorage.removeItem(`students-${cohortName}`)
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

export function removeCohortByName(cohortName='no-class') {
  const cohortNames = getCohortNames()
  setCohortNames(cohortNames.filter(name => name !== cohortName))
  clearStudents(cohortName)
}

export function getLocalGroups(cohortName) {
  return JSON.parse(localStorage.getItem(`groups-${cohortName}`))
}

export function setLocalGroups(cohortName='no-class', groups) {
  return localStorage.setItem(`groups-${cohortName}`, JSON.stringify(groups))
}

export function clearLocalGroups(cohortName='no-class') {
  return localStorage.removeItem(`groups-${cohortName}`)
}

export function getLocalSubGroup(cohortName='no-class', groupName='no-group') {
  return JSON.parse(localStorage.getItem(`sub-group-${cohortName}-${groupName}`))
}

export function setLocalSubGroup(cohortName='no-class', groupName='no-group', group) {
  return localStorage.setItem(`sub-group-${cohortName}-${groupName}`, JSON.stringify(group))
}

export function clearLocalSubGroup(cohortName='no-class', groupName='no-group') {
  return localStorage.removeItem(`sub-group-${cohortName}-${groupName}`)
}
