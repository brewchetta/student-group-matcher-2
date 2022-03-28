import GroupParticipantDisplay from './GroupParticipantDisplay'

function GroupDisplay({groupParticipants, groupName, addUnassignedToGroup, groupNames, moveStudentToGroups}) {

  const renderedParticipants = groupParticipants.map(participant => (
    <GroupParticipantDisplay
      key={participant.id}
      currentGroupName={groupName}
      {...{participant, groupNames, moveStudentToGroups}}
    />
  ))

  return (

    <div>

      <h3>{groupName} - {groupParticipants.length} students</h3>


        {
          groupName !== 'unassigned'
          ?
          <button onClick={() => addUnassignedToGroup(groupName)}>Add Unassigned Students</button>
          :
          null
        }


      <ul className="bullet-points-inside flex rows">
        {renderedParticipants}
      </ul>

    </div>

  )
}

export default GroupDisplay
