import { Link } from 'react-router-dom'

function Navbar() {
  return (

    <nav>

      <Link to='/'>Students</Link>
      <Link to='/groups'>Groups</Link>

    </nav>

  )
}

export default Navbar
