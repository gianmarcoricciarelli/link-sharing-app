import DevLinks from '@/ui/devlinks/devlinks'
import Text from '@/ui/text/text'
import TextField from '@/ui/textField/textField'
import EmailIcon from '@icons/icon-email.svg?react'
import PasswordIcon from '@icons/icon-password.svg?react'
import clsx from 'clsx'
import { ChangeEventHandler, useState } from 'react'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onEmailTextChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setEmail(e.target.value)
    }
    const onPasswordTextChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value)
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
                    <TextField
                        placeholder='e.g. alex@email.com'
                        label='Email address'
                        icon={<EmailIcon />}
                        value={email}
                        onChange={onEmailTextChange}
                    />
                    <TextField
                        placeholder='Enter your password'
                        label='Password'
                        icon={<PasswordIcon />}
                        value={password}
                        onChange={onPasswordTextChange}
                    />
                </div>
            </div>
        </div>
    )
}
