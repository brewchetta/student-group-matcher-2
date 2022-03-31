import { useState } from 'react'

function GroupForm({addGroup}) {

  const [name, setName] = useState('')

  const resetForm = () => setName('')

  const handleSubmit = e => {
    e.preventDefault()
    addGroup(name)
    resetForm()
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
