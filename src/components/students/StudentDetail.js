function StudentDetail({student, removeStudent}) {

  function handleDeleteClick() {
    removeStudent(student)
  }

  return (
    <div>

      <h3>{student.name}</h3>

      <p>Cohort: {student.className}</p>

      <button onClick={handleDeleteClick}>Remove</button>

    </div>
  )
}

export default StudentDetail
