import clsx from 'clsx'
import { MouseEventHandler, useContext, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'

import Button from '@ui/button/button'

import useResizeObserver from '@hooks/useResizeObserver'

import NavBar from '@widgets/navbar/navbar'
import PhoneMockup from '@widgets/phoneMockup/phoneMockup'

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

    const { isMobile, isTablet } = useResizeObserver()

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
            <div className={clsx('xl:px-6 xl:pb-6', 'grow flex')}>
                {!isMobile && !isTablet && <PhoneMockup />}
                <div className='p-4 grow'>
                    <div
                        className={clsx(
                            'h-full bg-white',
                            'rounded-xl',
                            'flex flex-col gap-6'
                        )}
                    >
                        <div className='pt-6 px-6 xl:pt-10 xl:px-10 grow'>
                            <LinkCustomizationContextProvider>
                                <Outlet />
                            </LinkCustomizationContextProvider>
                        </div>
                        <div className='h-[1px] bg-lsa-borders' />
                        <div
                            className={clsx(
                                'px-6 pb-6 ',
                                'xl:px-10 xl:pb-10',
                                'md:flex md:justify-end'
                            )}
                        >
                            <Button.Primary
                                className='w-full md:w-[unset]'
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
        </div>
    )
}

export default App
