import { useState, useEffect } from 'react'
import { buildGroupsFromArray } from 'utils/arrayUtils'
import GroupParticipantDisplay from './GroupParticipantDisplay'
import SubGroupDisplay from './SubGroupDisplay'

function GroupDisplay({groupParticipants, groupName, addAllToGroup, groupNames, handleRemoveFromGroup}) {

  const [isOpen, setIsOpen] = useState(true)
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

  const buttonClassNames = "pop-focus border-primary border-round background-primary text-color-primary margin-weak-sides"

  return (

    <div>

      <h3 className="pointer" onClick={() => setIsOpen(isOpen => !isOpen)}>{groupName} - {groupParticipants.length} students <span style={ isOpen ? ({transition: "transform 0.2s", display: "inline-block"}) : ({display: "inline-block", transform: "rotate(-90deg)", transition: "transform 0.2s"}) }>▼</span></h3>

      {
        isOpen
        ?

        <>
          <button className={buttonClassNames} onClick={() => addAllToGroup(groupName)}>Add All Students</button>
          <button className={buttonClassNames} onClick={() => rerollGroup(groupName)}>Reroll</button>
          <button className={buttonClassNames} onClick={copyToClipboard}>Copy To Clipboard</button>

          <div className="flex rows space-around justify-start">

            {renderedSubGroups}

          </div>
        </>

        :

        null
      }



    </div>

  )
}

export default GroupDisplay
