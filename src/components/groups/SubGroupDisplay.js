import { useState, useEffect } from 'react'
import GroupParticipantDisplay from './GroupParticipantDisplay'

function SubGroupDisplay({participants, groupName, handleRemoveFromGroup}) {

  console.log(participants);

  const renderedParticipants = participants.map(participant => (
    <GroupParticipantDisplay
      key={participant.id}
      currentGroupName={groupName}
      {...{participant, handleRemoveFromGroup}}
    />
  ))

  return (

    <div className="flex row border-primary border-round margin-padding-weak">
      {renderedParticipants}
    </div>

  )
}

export default SubGroupDisplay
