import { useState } from 'react'
import { toSpinalCase } from 'utils/stringUtils'
import { useToastContext } from 'context/ToastContext'

function CohortForm({addCohortName}) {

  const { setToast } = useToastContext()

  const [input, setInput] = useState('')

  const handleChangeToSpinalCase = e => setInput( toSpinalCase(e.target.value) )

  const validateInput = () => !!input.length

  const resetInput = () => setInput('')

  const handleSubmit = e => {
    e.preventDefault()
    if (validateInput()) {
      addCohortName(input)
      resetInput()
      setToast(prev => ({ ...prev, toastType: 'success', messages: [`Added ${input} cohort`] }))
    } else {
      setToast(prev => ({ ...prev, toastType: 'error', messages: [`Error: Cohort must have a name!`] }))
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      <label htmlFor="className">Add Cohort</label>
      <input className='border-primary border-round-left pop-focus' type="text" name="className" value={input} onChange={handleChangeToSpinalCase} />

      <input className="border-primary border-round-right background-alternate pop-focus" type="submit" value="Create Cohort" />

    </form>
  )
}

export default CohortForm
