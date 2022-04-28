function StudentDetail({student, removeStudent}) {

  function handleDeleteClick() {
    removeStudent(student)
  }

  return (
    <div className='border-primary border-round padding-medium' style={{marginTop: "1em"}}>

      <h3>{student.name}</h3>

      <p>Cohort: {student.className}</p>

      <button className="border-primary background-alternate border-round pop-focus" onClick={handleDeleteClick}>Remove</button>

    </div>
  )
}

export default StudentDetail
