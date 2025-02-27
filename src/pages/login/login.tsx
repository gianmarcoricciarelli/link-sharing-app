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

    const { setLoggedUser, getUsers } = useContext(StoreContext)

    const onLoginFormSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        const { email, password } = Object.fromEntries(
            new FormData(e.target as HTMLFormElement)
        ) as Omit<User, 'links'>
        const loggedUser: User = {
            email,
            password,
            links: getUsers().find((u) => u.email === email)!.links
        }
        const users = getUsers()

        if (!users.find((u) => u.email === loggedUser.email)) {
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
                'flex flex-col tablet:justify-center tablet:items-center gap-16 tablet:gap-12'
            )}
        >
            <DevLinks logoSize='large' />
            <div
                className={clsx(
                    'tablet:bg-white',
                    'tablet:w-[476px] tablet:p-10',
                    'tablet:rounded-xl',
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
                            'flex flex-col tablet:flex-row tablet:justify-center text-center'
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
