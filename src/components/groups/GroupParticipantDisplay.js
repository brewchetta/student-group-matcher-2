import GroupParticipantSelect from "./GroupParticipantSelect"

function GroupParticipantDisplay({participant, groupNames, moveStudentToGroups, currentGroupName}) {

  return (
    <li>{participant.name}

      <GroupParticipantSelect
        {...{participant, groupNames, moveStudentToGroups, currentGroupName}}
      />

    </li>
  )

}

export default GroupParticipantDisplay
