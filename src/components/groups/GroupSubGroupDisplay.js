import { useState } from 'react'
import GroupParticipantDisplay from './GroupParticipantDisplay'

function GroupSubGroupDisplay({
  participants,
  groupName,
  fullGroupParticipants,
  handleRemoveFromSubGroup,
  setCurrentDraggedStudent,
  setCurrentDragTarget,
  currentDragTarget,
  currentDraggedStudent,
  handleMoveToSubGroup
}) {

  // const [isDragged, setIsDragged] = useState(false)
  const isDragged = currentDragTarget === participants

  const renderedParticipants = participants.map(participant => (
    <GroupParticipantDisplay
      key={participant.id}
      currentGroupName={groupName}
      {...{participant, handleRemoveFromSubGroup, setCurrentDraggedStudent, handleMoveToSubGroup}}
    />
  ))

  const handleDragEnter = e => {
    // prevent default stops the dragged item boomerang back to its original position
    e.preventDefault()
    if (currentDraggedStudent.id) {
      setCurrentDragTarget(participants)
    }
  }

  // const handleDragLeave = () => setIsDragged(false)

  return (

    <div
      onDragOver={handleDragEnter}
      className={`flex row background-grey border-round margin-padding-weak ${isDragged ? 'background-green' : 'background-grey'}`}
    >

      {renderedParticipants}

    </div>

  )
}

export default GroupSubGroupDisplay
