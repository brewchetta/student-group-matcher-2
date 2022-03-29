import { useState, useEffect } from 'react'
import { buildGroupsFromArray } from 'utils/arrayUtils'
import GroupParticipantDisplay from './GroupParticipantDisplay'
import SubGroupDisplay from './SubGroupDisplay'

function GroupDisplay({groupParticipants, groupName, addAllToGroup, groupNames, handleRemoveFromGroup}) {

  const [subGroups, setSubGroups] = useState([])

  useEffect(() => {
    setSubGroups(buildGroupsFromArray(groupParticipants))
  }, [groupParticipants, groupName])

  const renderedParticipants = groupParticipants.map(participant => (
    <GroupParticipantDisplay
      key={participant.id}
      currentGroupName={groupName}
      {...{participant, handleRemoveFromGroup}}
    />
  ))

  const renderedSubGroups = subGroups.map((sg, i) => (
    <SubGroupDisplay key={i} participants={sg} {...{groupName, handleRemoveFromGroup}} />
  ))

  const rerollGroup = () => setSubGroups(buildGroupsFromArray(groupParticipants))

  const parseSubgroupToText = (sg, joinString=" - ") => sg.map(student => student.name).join(joinString)

  const copyToClipboard = () => navigator.clipboard.writeText(subGroups.map(sg => parseSubgroupToText(sg)).join('\n'))

  return (

    <div>

      <h3>{groupName} - {groupParticipants.length} students</h3>

      <button onClick={() => addAllToGroup(groupName)}>Add All Students</button>
      <button onClick={() => rerollGroup(groupName)}>Reroll</button>
      <button onClick={copyToClipboard}>Copy To Clipboard</button>

      <div>
        {renderedSubGroups}
      </div>

    </div>

  )
}

export default GroupDisplay
