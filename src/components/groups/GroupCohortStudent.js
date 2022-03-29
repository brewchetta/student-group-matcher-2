import { useState, useEffect } from 'react'

function GroupCohortStudent({student, handleAddToGroup, groupNames}) {

  const [selectedGroup, setSelectedGroup] = useState('')

  useEffect(() => {
    setSelectedGroup(selectedGroup || groupNames[0] || '')
  }, [groupNames, selectedGroup])

  return (
    <div>

      <span>{student.name}</span>

      {
        groupNames.length

        ?

          <>
            <select value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)}>
              {groupNames.map(name => <option key={name} value={name}>{name}</option>)}
            </select>

            <button onClick={() => handleAddToGroup(student, selectedGroup)}>Add to Group</button>
          </>

        :

          null
      }


    </div>
  )
}

export default GroupCohortStudent
