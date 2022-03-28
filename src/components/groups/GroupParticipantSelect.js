function GroupParticipantSelect({participant, groupNames, currentGroupName, moveStudentToGroups}) {

  const handleChange = e => {
    moveStudentToGroups(participant, currentGroupName, e.target.value)
  }

  return (
    <select value={currentGroupName} onChange={handleChange}>

      {groupNames.map(name => <option key={name} value={name}>{name}</option>)}

    </select>
  )
}

export default GroupParticipantSelect
