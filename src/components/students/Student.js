function Student({student, setStudentDetail}) {

  function handleClick() {
    setStudentDetail(student)
  }

  return (
    <div onClick={handleClick}>

      <span>{student.name}</span>

    </div>
  )
}

export default Student
