import { useState, useEffect } from 'react'

function GroupCohortStudent({student, handleAddToGroup, groupNames}) {

  const [selectedGroup, setSelectedGroup] = useState('')

  useEffect(() => {
    setSelectedGroup(selectedGroup || groupNames[0] || '')
  }, [groupNames, selectedGroup])

  return (
    <div style={{marginBottom: "0.5em"}}>

      <span>{student.name} - </span>

      {
        groupNames.length

        ?

          <>
            <select className="pop-focus border-primary border-round-left background-alternate" value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)}>
            {groupNames.map(name => <option key={name} value={name}>{name}</option>)}
            </select>

            <button className="pop-focus border-primary border-round-right background-secondary" onClick={() => handleAddToGroup(student, selectedGroup)}>Add</button>
          </>

        :

          null
      }


    </div>
  )
}

export default GroupCohortStudent
