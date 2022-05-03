import { useToastContext } from 'context/ToastContext'

function GroupParticipantDisplay({participant, handleRemoveFromGroup, currentGroupName}) {

  const { setToast } = useToastContext()

  const removeFromGroup = () => {
    handleRemoveFromGroup(participant, currentGroupName)
    setToast(prev => ({...prev, toastType: 'error', messages: [`${participant.name} removed from ${currentGroupName}`]}))
  }

  return (
    <span style={{marginRight: "1em"}}>{participant.name} <button onClick={removeFromGroup}>X</button></span>
  )

}

export default GroupParticipantDisplay
