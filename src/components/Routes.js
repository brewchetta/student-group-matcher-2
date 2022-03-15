import { Routes, Route } from 'react-router-dom'
import StudentList from "./students"
import GroupList from "./groups"
import Home from "./Home"

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='students' element={<StudentList />} />
      <Route path='groups' element={<GroupList/>} />
      <Route path='*' element={<code>::404::Looks like that doesn't exist::</code>} />
    </Routes>
  )
}

export default AppRoutes
