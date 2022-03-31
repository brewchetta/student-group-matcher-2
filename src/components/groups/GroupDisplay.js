import { useState, useEffect } from 'react'
import { buildGroupsFromArray } from 'utils/arrayUtils'
import GroupParticipantDisplay from './GroupParticipantDisplay'
import SubGroupDisplay from './SubGroupDisplay'

function GroupDisplay({groupParticipants, groupName, addAllToGroup, groupNames, handleRemoveFromGroup}) {

  const [isOpen, setIsOpen] = useState(false)
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

  if (!isOpen) {
    return (
      <div>
        <h3>{groupName} - {groupParticipants.length} students <button onClick={() => setIsOpen(true)}>Open</button></h3>
      </div>
    )
  }

  const buttonClassNames = "pop-focus border-primary border-round background-primary text-color-primary margin-weak-sides"

  return (

    <div className="border-primary border-round margin-padding-weak">

      <h3>{groupName} - {groupParticipants.length} students <button className={buttonClassNames} onClick={() => setIsOpen(false)}>Close</button></h3>

      <button className={buttonClassNames} onClick={() => addAllToGroup(groupName)}>Add All Students</button>
      <button className={buttonClassNames} onClick={() => rerollGroup(groupName)}>Reroll</button>
      <button className={buttonClassNames} onClick={copyToClipboard}>Copy To Clipboard</button>

      {renderedSubGroups}

    </div>

  )
}

export default GroupDisplay
