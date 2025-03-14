import clsx from 'clsx'
import { MouseEventHandler, useContext, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'

import Button from '@ui/button/button'

import NavBar from '@widgets/navbar/navbar'

import { DetailsContext } from '@contexts/detailsContext/detailsContext'
import { LinkCustomizationContextProvider } from '@contexts/linkCustomizationContext/linkCustomizationContext'
import { StoreContext } from '@contexts/storeContext/storeContext'

import { AppSection } from './types'

function App() {
    const navigateTo = useNavigate()
    const location = useLocation()

    const {
        store: { loggedUser },
        getLoggedUserLinks
    } = useContext(StoreContext)
    const { validateDetails } = useContext(DetailsContext)

    const onTabClickHandler = (tabId: AppSection) => {
        if (tabId === 'links') {
            navigateTo('/')
        } else if (tabId === 'details') {
            navigateTo('/details')
        } else {
            navigateTo('/preview')
        }
    }

    const onSaveClickHandler: MouseEventHandler = () => {
        if (location.pathname.includes('details')) {
            validateDetails()
        } else {
            console.log('TODO: HANDLE CUSTOM LINKS VALIDATION')
        }
    }

    useEffect(() => {
        if (!loggedUser?.email) {
            navigateTo('/login')
        }
    }, [loggedUser?.email, navigateTo])

    return (
        <div className={clsx('h-full', 'flex flex-col gap-2')}>
            <NavBar
                activeTab={
                    location.pathname.includes('details') ? 'details' : 'links'
                }
                onTabClick={onTabClickHandler}
            />
            <div className='p-4 grow'>
                <div
                    className={clsx(
                        'h-full bg-white',
                        'rounded-xl',
                        'flex flex-col gap-6'
                    )}
                >
                    <div className='pt-6 px-6 grow'>
                        <LinkCustomizationContextProvider>
                            <Outlet />
                        </LinkCustomizationContextProvider>
                    </div>
                    <div className='h-[1px] bg-lsa-borders' />
                    <div className='px-6 pb-6 mobile:flex mobile:justify-end'>
                        <Button.Primary
                            className='w-full mobile:w-[unset]'
                            onClick={onSaveClickHandler}
                            disabled={
                                location.pathname.includes('details')
                                    ? false
                                    : getLoggedUserLinks().length === 0
                            }
                        >
                            Save
                        </Button.Primary>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
