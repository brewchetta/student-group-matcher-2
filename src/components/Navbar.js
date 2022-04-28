import { Link } from 'react-router-dom'

function Navbar() {
  return (

    <nav className="flex row gap-medium">

      <Link to='/'>Students</Link>
      <Link to='/groups'>Groups</Link>

    </nav>

  )
}

export default Navbar
