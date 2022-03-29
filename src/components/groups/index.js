import { useState, useEffect } from 'react'
import { getCohortNames, getStudents } from 'utils/localStorageUtils'
import CohortSelect from "./CohortSelect"
import GroupForm from "./GroupForm"
import GroupDisplay from './GroupDisplay'
import GroupCohortDisplay from "./GroupCohortDisplay"

function GroupList(props) {

  const [cohorts, setCohorts] = useState([])
  const [selectedCohort, setSelectedCohort] = useState('')
  const [cohortStudents, setCohortStudents] = useState([])
  const [groups, setGroups] = useState({})

  const groupNames = Object.keys(groups)

  useEffect(() => {
    setCohorts(getCohortNames())
    setSelectedCohort(getCohortNames()[0] || '')
  }, [])

  useEffect(() => {
    setCohortStudents(getStudents(selectedCohort) || [])
  }, [selectedCohort])

  function addGroup(groupName) {
    if (!groups[groupName]) {
      setGroups(prev => ({...prev, [groupName]: []}))
    } else {
      alert(`A group named ${groupName} already exists for this cohort`)
    }
  }

  function addAllToGroup(groupName) {
    setGroups(prev => ({...prev, [groupName]: [...cohortStudents]}))
  }

  const handleAddToGroup = (student, groupKey) => {
    const duplicateStudent = groups[groupKey].find(s => s.id === student.id)
    if (!duplicateStudent) {
      const revisedGroup = [...groups[groupKey], student]
      setGroups({...groups, [groupKey]: revisedGroup})
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
  }

  const renderedGroups = Object.keys(groups).map(gKey => (
    <GroupDisplay
      key={gKey}
      groupParticipants={groups[gKey]}
      groupName={gKey}
      addAllToGroup={addAllToGroup}
      handleRemoveFromGroup={handleRemoveFromGroup}
      groupNames={Object.keys(groups)}
    />
  ))

  return (
    <>

      <h2>Groups</h2>

      <CohortSelect {...{cohorts, selectedCohort, setSelectedCohort}} />

      <h3>Cohort: {selectedCohort}</h3>

      <GroupCohortDisplay {...{cohortStudents, handleAddToGroup, groupNames}} />

      <GroupForm addGroup={addGroup} />

      {renderedGroups}

    </>
  )
}

export default GroupList
