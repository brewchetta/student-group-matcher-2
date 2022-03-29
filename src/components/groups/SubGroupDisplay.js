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

    <div className="flex row border-black">
      {renderedParticipants}
    </div>

  )
}

export default SubGroupDisplay
