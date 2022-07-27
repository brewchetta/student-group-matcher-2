import { useState } from 'react'
import { useToastContext } from 'context/ToastContext'

function GroupForm({addGroup}) {

  const { setToast } = useToastContext()

  const [name, setName] = useState('')

  const resetForm = () => setName('')

  const validateInput = () => !!name.length

  const handleSubmit = e => {
    e.preventDefault()
    if (validateInput()) {
      addGroup(name)
      setToast(prev => ({...prev, toastType: 'success', messages: [`Created ${name}`]}))
      resetForm()
    } else {
      setToast(prev => ({...prev, toastType: 'error', messages: [`Error: Your group must have a name!`]}))
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      <label htmlFor="name">New Group: </label>
      <input className="border-round-left border-primary pop-focus" name="name" value={name} onChange={e => setName(e.target.value)} />

      <input className="border-round-right border-primary pop-focus background-alternate" type="submit" value="Add Group" />

    </form>
  )
}

export default GroupForm
