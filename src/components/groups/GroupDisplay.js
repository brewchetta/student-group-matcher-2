import { useState, useEffect } from 'react'
import { buildGroupsFromArray } from 'utils/arrayUtils'
import { getLocalSubGroup, setLocalSubGroup } from 'utils/localStorageUtils'
import GroupParticipantDisplay from './GroupParticipantDisplay'
import SubGroupDisplay from './GroupSubGroupDisplay'
import { useToastContext } from 'context/ToastContext'

function GroupDisplay({groupParticipants, groupName, addAllToGroup, groupNames, handleRemoveFromGroup, cohortName}) {

  const { setToast } = useToastContext()
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

  const handleAddAll = () => {
    addAllToGroup(groupName)
    setIsOpen(true)
    setToast(prev => ({...prev, toastType: 'success', messages: [`All students in cohort added to ${groupName}`]}))
  }

  const rerollGroup = () => {
    const rerolledGroups = buildGroupsFromArray(groupParticipants)
    setSubGroups(rerolledGroups)
    setLocalSubGroup(cohortName, groupName, rerolledGroups)
    return rerolledGroups
  }

  const parseSubgroupToText = (sg, joinString=" - ") => sg.map(student => student.name).join(joinString)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(subGroups.map(sg => parseSubgroupToText(sg)).join('\n'))
    setToast(prev => ({...prev, toastType: 'success', messages: [`${groupName} copied to clipboard`]}))
  }

  const buttonClassNames = "border-none border-round background-grey text-color-primary margin-weak-sides padding-small"


  return (

    <div className="background-black padding-small border-round margin-weak-vertical">

      <h3>
        <span className="pointer" onClick={() => setIsOpen(prev => !prev)}>{groupName} {"\/\/"} {groupParticipants.length} students</span>
      </h3>

        <button
          className={"border-none background-none text-white"}
          style={
            isOpen
            ?
            ({transition: "transform 0.2s", display: "inline-block"})
            :
            ({display: "inline-block", transform: "rotate(-90deg)", transition: "transform 0.2s"})
          }
          onClick={() => setIsOpen(prev => !prev)}
        >
          ▼
        </button>

      <button className={buttonClassNames} onClick={handleAddAll}>Add All From Cohort</button>

      <button className={buttonClassNames} onClick={() => rerollGroup(groupName)}>Randomize</button>

      <button className={buttonClassNames} onClick={copyToClipboard}>Copy To Clipboard</button>

      {
        isOpen

        ?

          <div className="flex rows space-around justify-start">

            {renderedSubGroups}

          </div>

        :

          null

      }



    </div>

  )
}

export default GroupDisplay
