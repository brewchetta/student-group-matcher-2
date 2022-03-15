import { Routes, Route } from 'react-router-dom'

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<p>Home</p>} />
      <Route path='students' element={<p>Students</p>} />
      <Route path='groups' element={<p>Groups</p>} />
      <Route path='*' element={<code>404 Looks like that doesn't exist</code>} />
    </Routes>
  )
}

export default AppRoutes
