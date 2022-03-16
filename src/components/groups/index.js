import { useState, useEffect } from 'react'
import { getCohortNames, getStudents } from 'utils/localStorageUtils'
import CohortSelect from "./CohortSelect"
import GroupForm from "./GroupForm"
import GroupDisplay from './GroupDisplay'

function GroupList(props) {

  const [cohorts, setCohorts] = useState([])
  const [selectedCohort, setSelectedCohort] = useState('')
  const [cohortStudents, setCohortStudents] = useState([])
  const [groups, setGroups] = useState({})

  useEffect(() => {
    setCohorts(getCohortNames())
    setSelectedCohort(getCohortNames()[0] || '')
  }, [])

  useEffect(() => {
    setCohortStudents(getStudents(selectedCohort) || [])
    setGroups({unassigned: getStudents(selectedCohort) || []})
  }, [selectedCohort])

  function addGroup(groupName) {
    if (!groups[groupName]) {
      setGroups(prev => ({...prev, [groupName]: []}))
    } else {
      alert(`A group named ${groupName} already exists for this cohort`)
    }
  }

  function addUnassignedToGroup(groupName) {
    const revisedGroup = [...groups[groupName], ...groups.unassigned]
    setGroups(prev => ({...prev, [groupName]: revisedGroup, unassigned: []}))
  }

  const renderedGroups = Object.keys(groups).map(gKey => (
    gKey === 'unassigned'
    ?
    <GroupDisplay
      key={gKey}
      groupParticipants={groups[gKey]}
      groupName={gKey}
      addUnassignedToGroup={addUnassignedToGroup}
    />
    :
    <GroupDisplay
      key={gKey}
      groupParticipants={groups[gKey]}
      groupName={gKey}
      addUnassignedToGroup={addUnassignedToGroup}
    />
  ))

  return (
    <>

      <h2>Groups</h2>

      <CohortSelect {...{cohorts, selectedCohort, setSelectedCohort}} />

      <h3>Cohort: {selectedCohort}</h3>

      <GroupForm addGroup={addGroup} />

      {renderedGroups}

    </>
  )
}

export default GroupList
