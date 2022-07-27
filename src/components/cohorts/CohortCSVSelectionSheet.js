import { useState } from 'react'

import ModalWrapper from "components/shared/ModalWrapper"

// --- HELPERS --- //
const createHash = namesList => {
  const sorted = [...namesList].sort()
  const hash = {}
  sorted.forEach(name => hash[name] = true)
  return hash
}

// --- COMPONENT --- //
function CohortCSVSelectionSheet({csvNamesList, handleAddStudentsFromCSV}) {

  // on open creates an object with keys of student name and value of true (included)
  const [students, setStudents] = useState(createHash(csvNamesList))

  const toggleStudent = name => {
    setStudents(students => ({
      ...students,
      [name]: !students[name]
    }))
  }

  // takes students hash and builds array of students with true values
  const handleAddStudents = () => {
    const includedStudents = []
    for (let student in students) {
      if (students[student]) includedStudents.push(student)
    }
    handleAddStudentsFromCSV( includedStudents )
  }

  // --- RENDER --- //

  return (
    <div>
      <h2>Students Uploaded From CSV</h2>
      <div className="grid-column-auto">
        {
          Object.keys(students).map(name => (

            <label key={name}>

              {/* toggleable checkbox */}
              <input type="checkbox"
                onChange={() => toggleStudent(name)}
                checked={students[name] ? true : false}
              />

              {name}

            </label>

          ))
        }
      </div>

      {/* submit button */}
      <button onClick={handleAddStudents}>Add Students</button>

    </div>
  )
}

export default ModalWrapper(CohortCSVSelectionSheet)
