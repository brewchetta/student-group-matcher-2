export function getStudents (className='no-class') {
  return JSON.parse(localStorage.getItem(`students-${className}`))
}

export function setStudents(students, className='no-class') {
  return localStorage.setItem(`students-${className}`, JSON.stringify(students))
}

export function clearStudents(className='no-class') {
  return localStorage.removeItem('students')
}
