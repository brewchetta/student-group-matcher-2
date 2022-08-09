import { useState, useEffect, useRef } from 'react'
import { buildGroupsFromArray } from 'utils/arrayUtils'
import { getLocalSubGroup, setLocalSubGroup } from 'utils/localStorageUtils'
import SubGroupDisplay from './GroupSubGroupDisplay'
import { useToastContext } from 'context/ToastContext'

function GroupDisplay({groupParticipants, groupName, addAllToGroup, groupNames, handleRemoveFromGroup, cohortName}) {

  // --- STATE --- //

  const { setToast } = useToastContext()
  const [isOpen, setIsOpen] = useState(false)
  const [subGroups, setSubGroups] = useState([])
  const groupCount = useRef(0)
  const [currentDraggedStudent, setCurrentDraggedStudent] = useState({})
  const [currentDragTarget, setCurrentDragTarget] = useState([])

  // for setting localStorage state and react state
  const commitSubGroups = newSubGroups => {
    setSubGroups(newSubGroups)
    setLocalSubGroup(cohortName, groupName, newSubGroups)
  }

  const handleRemoveFromSubGroup = student => {
    const revisedSubGroups = subGroups.map(group => group.filter(s => s.id !== student.id)).filter(sg => sg.length > 0)
    commitSubGroups(revisedSubGroups)
    handleRemoveFromGroup(student, groupName)
  }

  // adds all students to this group
  const handleAddAll = () => {
    addAllToGroup(groupName)
    setIsOpen(true)
    setToast(prev => ({...prev, toastType: 'success', messages: [`All students in cohort added to ${groupName}`]}))
  }

  // randomizes who is in which group
  const rerollGroup = () => {
    const rerolledGroups = buildGroupsFromArray(groupParticipants)
    commitSubGroups(rerolledGroups)
    return rerolledGroups
  }

  // on drag and drop moves a student to another subgroup
  // currentDragTarget is set up to only be sub groups inside this group
  const handleMoveToSubGroup = () => {
    if (currentDragTarget && currentDraggedStudent) {
      setToast(prev => ({...prev, toastType: 'success', messages: [`${currentDraggedStudent.name} moved to new group`]}))
      // amends subgroups so the proper student gets moved to the proper sub group then filters empty sub groups
      const revisedGroups = subGroups.map( sg => {
        if ( sg === currentDragTarget && !sg.includes(currentDraggedStudent) ) {
          return [...sg, currentDraggedStudent]
        } else if ( sg !== currentDragTarget && sg.includes(currentDraggedStudent) ) {
          return sg.filter(s => s !== currentDraggedStudent)
        } else {
          return sg
        }

      })
      .filter(sg => sg.length > 0)

      commitSubGroups(revisedGroups)

    }
    setCurrentDraggedStudent({})
    setCurrentDragTarget([])
  }

  // --- EFFECTS --- //

  // when showing the group, get group data or else roll data for unlogged groups
  useEffect(() => {
    groupCount.current = groupParticipants.length || 0
    const localSubGroups = getLocalSubGroup(cohortName, groupName) || null
    if (localSubGroups) {
      setSubGroups(localSubGroups)
    } else {
      rerollGroup()
    }
  }, [])

  // creates a student in their own subgroup when they're added to the group
  useEffect(() => {
    if (groupCount.current < groupParticipants.length) {
      const newSubGroup = [ groupParticipants[groupCount.current] ]
      const revisedSubGroups = [...subGroups, newSubGroup]
      commitSubGroups(revisedSubGroups)
    }
    groupCount.current = groupParticipants.length
  }, [groupParticipants])

  // --- COPY TO CLIPBOARD --- //

  // parses sub group to text to copy to clipboard
  const parseSubgroupToText = (sg, joinString=" - ") => sg.map(student => student.name).join(joinString)

  // copies group to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(subGroups.map(sg => parseSubgroupToText(sg)).join('\n'))
    setToast(prev => ({...prev, toastType: 'success', messages: [`${groupName} copied to clipboard`]}))
  }

  // --- RENDERS --- //

  const renderedSubGroups = subGroups.map((sg, i) => (
    <SubGroupDisplay
      key={i}
      participants={sg}
      {...{
        groupName,
        handleRemoveFromSubGroup,
        setCurrentDragTarget,
        currentDragTarget,
        currentDraggedStudent,
        handleMoveToSubGroup
      }}
      fullGroupParticipants={groupParticipants}
      setCurrentDraggedStudent={setCurrentDraggedStudent}
    />
  ))

  const buttonClassNames = "border-none border-round background-grey text-color-primary margin-weak-sides padding-small"

  return (

    <div className="background-black padding-small border-round margin-weak-vertical">

      <h3>
        <span
          className="pointer"
          onClick={() => setIsOpen(prev => !prev)}
        >

          {groupName} {"//"} {groupParticipants.length} students

        </span>
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
