import { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { UserContext } from './contexts/user'

function App() {
    const navigateTo = useNavigate()

    const { user } = useContext(UserContext)

    useEffect(() => {
        if (!user.isLoggedIn) {
            navigateTo('/login')
        }
    }, [navigateTo, user.isLoggedIn])

    return <Outlet />
}

export default App
