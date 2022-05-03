import { useState, useEffect } from 'react'
import ConditionalWrapper from 'components/shared/ConditionalWrapper'

function Toast({messages, toastType, open, setOpen, className}) {

  // console.log('MESSAGES:', messages);
  // console.log('TOAST TYPE:', toastType);
  // console.log('OPEN:', open);

  useEffect(() => {
    if (!open) {
      setOpen(true)
    }
  }, [messages])

  useEffect(() => {
    const timeoutClock = 3000
    let timeout
    if (open) {
      timeout = setTimeout(() => {
        setOpen(!open)
      }, timeoutClock)
    }

    return () => clearTimeout(timeout)
  }, [open])

  const createMessages = () => (
    messages.constructor === Array
    ?
    messages.map(m => <span key={m}>{m}</span>)
    :
    (<span>{messages.message}</span>))

  const openOrClosed = open ? "" : " closed"

  return (
    <div
      className={`toast ${toastType} ${openOrClosed} ${className}`}
      onClick={open => setOpen(!open)}
    >
        {createMessages()}
    </div>
  )
}

export default ConditionalWrapper(Toast)
