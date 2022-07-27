import { NavLink } from 'react-router-dom'

function Navbar() {
  return (

    <nav className="flex row gap-medium">

      <NavLink className={({isActive}) => isActive ? "decoration-underline" : "decoration-none"} to='/'>Cohorts</NavLink>
      <NavLink className={({isActive}) => isActive ? "decoration-underline" : "decoration-none"} to='/groups'>Groups</NavLink>

    </nav>

  )
}

export default Navbar
