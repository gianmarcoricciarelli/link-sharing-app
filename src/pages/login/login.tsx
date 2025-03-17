import clsx from 'clsx'
import { FormEventHandler, useContext } from 'react'
import { useNavigate } from 'react-router'

import { User } from '@customTypes/index'

import DevLinks from '@ui/devlinks/devlinks'
import Text from '@ui/text/text'

import LoginForm from '@widgets/loginForm/loginForm'

import { StoreContext } from '@contexts/storeContext/storeContext'

export default function Login() {
    const navigateTo = useNavigate()

    const { setLoggedUser, getUserByEmail } = useContext(StoreContext)

    const onLoginFormSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        const { email, password } = Object.fromEntries(
            new FormData(e.target as HTMLFormElement)
        ) as Omit<User, 'links' | 'id'>
        const loggedUser: User = {
            id: getUserByEmail(email)?.id || -1,
            email,
            password,
            links: getUserByEmail(email)?.links || []
        }

        if (!getUserByEmail(loggedUser.email)) {
            console.log('hello')
            navigateTo('/create-account')

            return
        }

        setLoggedUser({ ...loggedUser })
        navigateTo('/user')
    }

    return (
        <div
            className={clsx(
                'h-full p-8',
                'flex flex-col md:justify-center md:items-center gap-16 md:gap-12'
            )}
        >
            <DevLinks logoSize='large' />
            <div
                className={clsx(
                    'md:bg-white',
                    'md:w-[476px] md:p-10',
                    'md:rounded-xl',
                    'flex flex-col gap-10'
                )}
            >
                <div className='flex flex-col gap-2'>
                    <Text
                        className='text-[24px]!'
                        color='lsa-dark-gray'
                        fontStyle='bold'
                    >
                        Login
                    </Text>
                    <Text context='body' size='medium' color='lsa-grey'>
                        Add your details below to get back into the app
                    </Text>
                </div>
                <div className='flex flex-col gap-6'>
                    <LoginForm onSubmit={onLoginFormSubmitHandler} />
                    <div
                        className={clsx(
                            'flex flex-col md:flex-row md:justify-center text-center'
                        )}
                    >
                        <Text context='body' size='medium' color='lsa-grey'>
                            Don't have an account?
                        </Text>
                        <Text
                            className='hover:cursor-pointer'
                            context='body'
                            size='medium'
                            color='lsa-purple'
                            onClick={() => navigateTo('/create-account')}
                        >
                            Create account
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    )
}
