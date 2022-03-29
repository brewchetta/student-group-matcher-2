function GroupParticipantDisplay({participant, handleRemoveFromGroup, currentGroupName}) {

  return (
    <span style={{marginRight: "1em"}}>{participant.name} <button onClick={() => handleRemoveFromGroup(participant, currentGroupName)}>X</button></span>
  )

}

export default GroupParticipantDisplay
