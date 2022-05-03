function Student({student, removeStudent}) {

  function handleRemove() {
    removeStudent(student)
  }

  return (
    <div>

      <span>{student.name}</span>
      <button
        className="border-none background-none text-white hover-text-yellow"
        onClick={handleRemove}
      >
        X
      </button>

    </div>
  )
}

export default Student
