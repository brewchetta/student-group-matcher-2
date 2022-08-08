import { useState, useEffect } from 'react'
import GroupParticipantDisplay from './GroupParticipantDisplay'

function GroupSubGroupDisplay({participants, groupName, handleRemoveFromSubGroup}) {

  const renderedParticipants = participants.map(participant => (
    <GroupParticipantDisplay
      key={participant.id}
      currentGroupName={groupName}
      {...{participant, handleRemoveFromSubGroup}}
    />
  ))

  return (

    <div className="flex row background-grey border-round margin-padding-weak">
      {renderedParticipants}
    </div>

  )
}

export default GroupSubGroupDisplay
