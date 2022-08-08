import { Routes, Route } from 'react-router-dom'
import CohortList from "./cohorts"
import GroupList from "./groups"
import Home from "./Home"

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<CohortList />} />
      <Route path='groups' element={<GroupList/>} />
      <Route path='home' element={<Home/>} />
      <Route path='*' element={<code>::404::Looks like that doesn't exist::</code>} />
    </Routes>
  )
}

export default AppRoutes
