import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import PrivateRoute from './PrivateRoute'

function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/dashboard' element={
                <PrivateRoute>
                    <Dashboard/>
                </PrivateRoute>
            }/>
            <Route path='/pets' element={
                <PrivateRoute>
                    <Pets/>
                </PrivateRoute>
            }/>
        </Routes>
    )
}

export default AppRoutes