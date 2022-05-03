import { useState, useEffect } from 'react'

function GroupCohortStudent({student, handleAddToGroup, groupNames}) {

  const [selectedGroup, setSelectedGroup] = useState('')

  useEffect(() => {
    setSelectedGroup(selectedGroup || groupNames[0] || '')
  }, [groupNames, selectedGroup])

  return (
    <div>

      <span>{student.name}</span>

      <br/>

      {
        groupNames.length

        ?

          <>
            <select className="background-white border-white text-black border-round-left background-alternate" value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)}>
            {groupNames.map(name => <option key={name} value={name}>{name}</option>)}
            </select>

            <button className="border-green border-round-right text-white background-green" onClick={() => handleAddToGroup(student, selectedGroup)}>Add</button>
          </>

        :

          null
      }


    </div>
  )
}

export default GroupCohortStudent
