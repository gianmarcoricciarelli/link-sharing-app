import { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { StoreContext } from './contexts/storeContext/storeContext'

function App() {
    const navigateTo = useNavigate()

    const { getLoggedUser } = useContext(StoreContext)

    useEffect(() => {
        if (!getLoggedUser()) {
            navigateTo('/login')
        }
    }, [getLoggedUser, navigateTo])

    return <Outlet />
}

export default App
