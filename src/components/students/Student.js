function Student({student, setStudentDetail}) {

  function handleClick() {
    setStudentDetail(student)
  }

  return (
    <div className="pointer" onClick={handleClick}>

      <span>{student.name}</span>

    </div>
  )
}

export default Student
