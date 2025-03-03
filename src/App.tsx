import clsx from 'clsx'
import { MouseEventHandler, useContext, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { z } from 'zod'

import Button from '@ui/button/button'

import NavBar from '@widgets/navbar/navbar'

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

    const [detailsFormErrors, setDetailFormErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    const onTabClickHandler = (tabId: AppSection) => {
        if (tabId === 'links') {
            navigateTo('/')
        } else {
            navigateTo('/details')
        }
    }

    const onSaveClickHandler: MouseEventHandler = () => {
        if (location.pathname.includes('details')) {
            const detailsFormValidationSchema = z.object({
                firstName: z.string().min(1, 'This field is required'),
                lastName: z.string().min(1, 'This field is required'),
                email: z
                    .string()
                    .min(1, 'This field is required')
                    .email('Invalid email')
            })
            const validatedData = detailsFormValidationSchema.safeParse({
                firstName: loggedUser?.firstName,
                lastName: loggedUser?.lastName,
                email: loggedUser?.email
            })

            if (!validatedData.success) {
                const errors = validatedData.error.flatten().fieldErrors
                console.log(' App ~ errors:', errors)

                setDetailFormErrors({
                    firstName: errors.firstName?.[0] || '',
                    lastName: errors.lastName?.[0] || '',
                    email: errors.email?.[0] || ''
                })
            }
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
                            <Outlet
                                context={{
                                    detailsFormErrors,
                                    setDetailFormErrors
                                }}
                            />
                        </LinkCustomizationContextProvider>
                    </div>
                    <div className='h-[1px] bg-lsa-borders' />
                    <div className='px-6 pb-6'>
                        <Button.Primary
                            className='w-full'
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
