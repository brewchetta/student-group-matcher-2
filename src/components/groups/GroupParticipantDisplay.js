import { useToastContext } from 'context/ToastContext'

function GroupParticipantDisplay({participant, handleRemoveFromSubGroup, currentGroupName, setCurrentDraggedStudent}) {

  const { setToast } = useToastContext()

  const removeFromGroup = () => {
    handleRemoveFromSubGroup(participant)
    setToast(prev => ({...prev, toastType: 'error', messages: [`${participant.name} removed from ${currentGroupName}`]}))
  }

  const handleStartDrag = () => setCurrentDraggedStudent(participant)

  const handleFinishDrag = () => {
    setCurrentDraggedStudent({})
    console.log('finishing drag:', participant);
  }

  return (
    <span
      className="grabbable"
      draggable="true"
      onDragStart={handleStartDrag}
      onDragEnd={handleFinishDrag}
      style={{marginRight: "1em"}}
    >

      {participant.name} <button onClick={removeFromGroup}>X</button>

    </span>
  )

}

export default GroupParticipantDisplay
