import { useContext } from 'react'
import { Outlet } from 'react-router'
import { UserContext } from './contexts/user'
import Login from './pages/login/login'

function App() {
    const { user } = useContext(UserContext)

    return !user.email ? <Login /> : <Outlet />
}

export default App
