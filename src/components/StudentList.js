import Student from './Student'
import StudentForm from './StudentForm'

function StudentList(props) {
  return (
    <>
      <h2>Student List</h2>

      <StudentForm />

      <Student />
    </>
  )
}

export default StudentList
