import { useState } from 'react'

import Toast from 'components/shared/Toast'

import { useToastContext } from 'context/ToastContext'

function CohortToast() {

  const { toast: { messages, toastType, open }, setToast } = useToastContext()

  const setOpen = newState => setToast(prev => ({...prev, open: newState}))

  return (
    <Toast
      messages={messages}
      toastType={toastType}
      open={open}
      setOpen={setOpen}
      displayCondition={messages.length}
    />
  )

}

export default CohortToast
