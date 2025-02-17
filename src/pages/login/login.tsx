import DevLinks from '@/ui/devlinks/devlinks'
import Text from '@/ui/text/text'
import LoginForm from '@/widgets/loginForm/loginForm'
import clsx from 'clsx'
import { FormEventHandler } from 'react'

export default function Login() {
    const onLoginFormSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        console.log(e)
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
                        <Text context='body' size='medium' color='lsa-purple'>
                            Create account
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    )
}
