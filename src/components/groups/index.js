import { useState, useEffect } from 'react'
import { getCohortNames, getStudents, getLocalGroups, setLocalGroups } from 'utils/localStorageUtils'
import { ToastContextProvider } from  'context/ToastContext'

import CohortSelect from "./CohortSelect"
import GroupForm from "./GroupForm"
import GroupDisplay from './GroupDisplay'
import GroupCohortDisplay from "./GroupCohortDisplay"
import ToastWrapper from "components/shared/ToastWrapper"

function GroupList(props) {

  const [cohorts, setCohorts] = useState([])
  const [selectedCohort, setSelectedCohort] = useState('')
  const [cohortStudents, setCohortStudents] = useState([])
  const [groups, setGroups] = useState({})

  const groupNames = Object.keys(groups)

  useEffect(() => {
    const cohortNames = getCohortNames()
    setCohorts(cohortNames)
    setSelectedCohort(cohortNames[cohortNames.length - 1] || '')
  }, [])

  useEffect(() => {
    setCohortStudents(getStudents(selectedCohort) || [])
    setGroups(getLocalGroups(selectedCohort) || {})
  }, [selectedCohort])

  function addGroup(groupName) {
    if (!groups[groupName]) {
      setGroups(prev => ({...prev, [groupName]: []}))
      setLocalGroups(selectedCohort, {...groups, [groupName]: []})
    } else {
      alert(`A group named ${groupName} already exists for this cohort`)
    }
  }

  function addAllToGroup(groupName) {
    setGroups(prev => ({...prev, [groupName]: [...cohortStudents]}))
    setLocalGroups(selectedCohort, {...groups, [groupName]: [...cohortStudents]})
  }

  const handleAddToGroup = (student, groupKey) => {
    const duplicateStudent = groups[groupKey].find(s => s.id === student.id)
    if (!duplicateStudent) {
      const revisedGroup = [...groups[groupKey], student]
      setGroups({...groups, [groupKey]: revisedGroup})
      setLocalGroups(selectedCohort, {...groups, [groupKey]: revisedGroup})
    } else {
      console.log('student already in that group');
    }
  }

  const handleRemoveFromGroup = (student, groupKey) => {
    const revisedGroup = groups[groupKey].filter(s => s.id !== student.id)
    const revisedGroups = {...groups, [groupKey]: revisedGroup}
    if (!revisedGroup.length) {
      delete revisedGroups[groupKey]
    }
    setGroups(revisedGroups)
    setLocalGroups(selectedCohort, revisedGroups)
  }

  const renderedGroups = Object.keys(groups).map(gKey => (
    <GroupDisplay
      key={gKey}
      cohortName={selectedCohort}
      groupParticipants={groups[gKey]}
      groupName={gKey}
      addAllToGroup={addAllToGroup}
      handleRemoveFromGroup={handleRemoveFromGroup}
      groupNames={Object.keys(groups)}
    />
  ))

  return (
    <ToastContextProvider>

      <h2>Groups</h2>

      <CohortSelect {...{cohorts, selectedCohort, setSelectedCohort}} />

      <h3>Cohort: {selectedCohort}</h3>

      <GroupCohortDisplay {...{cohortStudents, handleAddToGroup, groupNames}} />

      <GroupForm addGroup={addGroup} />

      {renderedGroups}

      <ToastWrapper />

    </ToastContextProvider>
  )
}

export default GroupList
