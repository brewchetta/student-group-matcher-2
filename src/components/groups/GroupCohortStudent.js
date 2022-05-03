import { useState, useEffect } from 'react'
import { useToastContext } from 'context/ToastContext'

function GroupCohortStudent({student, handleAddToGroup, groupNames}) {

  const { setToast } = useToastContext()

  const [selectedGroup, setSelectedGroup] = useState('')

  useEffect(() => {
    setSelectedGroup(selectedGroup || groupNames[0] || '')
  }, [groupNames, selectedGroup])

  const handleAdd = () => {
    handleAddToGroup(student, selectedGroup)
    setToast(prev => ({...prev, toastType: 'success', messages: [`Added ${student.name} to ${selectedGroup}`]}))
  }

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

            <button className="border-green border-round-right text-white background-green" onClick={handleAdd}>Add</button>
          </>

        :

          null
      }


    </div>
  )
}

export default GroupCohortStudent
