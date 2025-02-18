import { UserContext } from '@/contexts/user'
import { User } from '@/types'
import DevLinks from '@/ui/devlinks/devlinks'
import Text from '@/ui/text/text'
import LoginForm from '@/widgets/loginForm/loginForm'
import clsx from 'clsx'
import { FormEventHandler, useContext } from 'react'
import { useNavigate } from 'react-router'

export default function Login() {
    const navigateTo = useNavigate()

    const { setUser } = useContext(UserContext)

    const onLoginFormSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        const newUser = Object.fromEntries(
            new FormData(e.target as HTMLFormElement)
        )
        localStorage.setItem(
            'lsa-user-info',
            JSON.stringify({ ...newUser, isLoggedIn: 'true' })
        )

        setUser({ ...newUser, isLoggedIn: true } as User)
        navigateTo('/')
    }

    return (
        <div
            className={clsx(
                'tablet:max-desktop:h-full',
                'p-8',
                'flex flex-col tablet:max-desktop:justify-center tablet:max-desktop:items-center gap-16 tablet:max-desktop:gap-12'
            )}
        >
            <DevLinks logoSize='large' />
            <div
                className={clsx(
                    'tablet:max-desktop:bg-white',
                    'tablet:max-desktop:p-10',
                    'tablet:max-desktop:rounded-xl',
                    'flex flex-col gap-10'
                )}
            >
                <div className='flex flex-col gap-2'>
                    <Text
                        className='text-[24px]!'
                        color='lsa-dark-gray'
                        style='bold'
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
                            'flex flex-col tablet:max-desktop:flex-row tablet:max-desktop:justify-center text-center'
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
