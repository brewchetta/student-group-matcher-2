import GroupParticipantDisplay from './GroupParticipantDisplay'

function GroupDisplay({groupParticipants, groupName, addUnassignedToGroup}) {

  const renderedParticipants = groupParticipants.map(p => <GroupParticipantDisplay key={p.id} participant={p} />)

  return (
      <div>

        <h3>{groupName}</h3>

        <button onClick={() => addUnassignedToGroup(groupName)}>Add Unassigned Students</button>

        {renderedParticipants}

      </div>
  )
}

export default GroupDisplay
