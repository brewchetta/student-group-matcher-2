import { useToastContext } from 'context/ToastContext'

function Student({student, removeStudent}) {

  const { setToast } = useToastContext()

  const handleRemove = () => {
    removeStudent(student)
    setToast(prev => ({...prev, toastType: 'error', messages: [`Removed ${student.name} from ${student.className}`]}))
  }

  return (
    <div>

      <span>{student.name}</span>
      <button
        className="border-none background-none text-grey hover-text-yellow"
        onClick={handleRemove}
      >
        X
      </button>

    </div>
  )
}

export default Student
