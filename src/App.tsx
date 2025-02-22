import clsx from 'clsx'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Outlet } from 'react-router'

import Button from '@ui/button/button'

import NavBar from '@widgets/navbar/navbar'

import { StoreContext } from '@contexts/storeContext/storeContext'

import { AppSection } from './types'

function App() {
    const navigateTo = useNavigate()

    const { getLoggedUser } = useContext(StoreContext)

    const onTabClickHandler = (tabId: AppSection) => {
        if (tabId === 'links') {
            navigateTo('/')
        } else {
            navigateTo('/details')
        }
    }

    useEffect(() => {
        if (!getLoggedUser()) {
            navigateTo('/login')
        }
    }, [getLoggedUser, navigateTo])

    return (
        <div className={clsx('h-full', 'flex flex-col gap-2')}>
            <NavBar onTabClick={onTabClickHandler} />
            <div className='p-4 grow'>
                <div
                    className={clsx(
                        'h-full bg-white',
                        'rounded-xl',
                        'flex flex-col gap-6'
                    )}
                >
                    <div className='pt-6 px-6 grow'>
                        <Outlet />
                    </div>
                    <div className='h-[1px] bg-lsa-borders' />
                    <div className='px-6 pb-6'>
                        <Button.Primary className='w-full'>Save</Button.Primary>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
