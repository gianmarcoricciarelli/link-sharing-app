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
        localStorage.setItem('lsa', JSON.stringify(newUser))
        setUser(newUser as User)
    }

    return (
        <div className={clsx('p-8', 'flex flex-col gap-16')}>
            <DevLinks logoSize='large' />
            <div className='flex flex-col gap-10'>
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
                    <div className='flex flex-col text-center'>
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
