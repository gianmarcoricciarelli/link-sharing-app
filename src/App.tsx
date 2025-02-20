import clsx from 'clsx'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'

import NavBar from '@widgets/navbar/navbar'

import { StoreContext } from '@contexts/storeContext/storeContext'

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
            <NavBar />
            <div>other</div>
        </div>
    )
}

export default App
