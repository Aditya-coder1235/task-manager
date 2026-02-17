import React from 'react'
import Dashboard from './pages/Dashboard'
import {Route,Routes} from 'react-router-dom'
import Task from './pages/Task'
import User from './pages/User'
import Setting from './pages/Setting'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ProtectedRoute from './pages/ProtectedRoute'

const App = () => {
  return (
      <div>
          <Routes>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<Dashboard />}></Route>
                  <Route path="/task" element={<Task />}></Route>
                  <Route path="/user" element={<User />}></Route>
                  <Route path="/setting" element={<Setting />}></Route>
              </Route>
          </Routes>
      </div>
  );
}

export default App
