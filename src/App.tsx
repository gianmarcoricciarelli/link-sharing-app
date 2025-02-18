import clsx from 'clsx'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { StoreContext } from './contexts/storeContext/storeContext'

function App() {
    const navigateTo = useNavigate()

    const { getLoggedUser } = useContext(StoreContext)

    useEffect(() => {
        if (!getLoggedUser()) {
            navigateTo('/login')
        }
    }, [getLoggedUser, navigateTo])

    return (
        <div className={clsx('flex flex-col gap-2')}>
            <div>navbar</div>
            <div>other</div>
        </div>
    )
}

export default App
