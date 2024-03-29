import { useEffect } from 'react'
import ConditionalWrapper from 'components/shared/ConditionalWrapper'

function Toast({messages, toastType, open, setOpen, className}) {

  useEffect(() => {
    if (!open) {
      setOpen(true)
    }
  }, [messages])

  useEffect(() => {
    const timeoutClock = 3000
    if (open) {
      const timeout = setTimeout(() => {
        setOpen(!open)
      }, timeoutClock)

      return () => clearTimeout(timeout)
    }
  }, [open, messages])

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
