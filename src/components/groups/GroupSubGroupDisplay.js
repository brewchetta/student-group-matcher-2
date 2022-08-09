import GroupParticipantDisplay from './GroupParticipantDisplay'

function GroupSubGroupDisplay({participants, groupName, handleRemoveFromSubGroup, setCurrentDraggedStudent}) {

  const renderedParticipants = participants.map(participant => (
    <GroupParticipantDisplay
      key={participant.id}
      currentGroupName={groupName}
      {...{participant, handleRemoveFromSubGroup, setCurrentDraggedStudent}}
    />
  ))

  const handleDragEnter = () => {
    console.log('dragging over this group:', participants.map(p => p.name))
  }

  const handleDragLeave = () => {
    console.log('elvis has left the building');
  }

  return (

    <div onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} className="flex row background-grey border-round margin-padding-weak">
      {renderedParticipants}
    </div>

  )
}

export default GroupSubGroupDisplay
