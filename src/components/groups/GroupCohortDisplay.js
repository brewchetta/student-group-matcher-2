import GroupCohortStudent from "./GroupCohortStudent"

function GroupCohortDisplay({cohortStudents, handleAddToGroup, groupNames}) {

  return (

    <div>

      {cohortStudents.map(student => <GroupCohortStudent key={student.id} {...{student, handleAddToGroup, groupNames}} />)}

    </div>

  )
}

export default GroupCohortDisplay
