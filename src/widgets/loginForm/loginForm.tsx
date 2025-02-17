import Button from '@/ui/button/button'
import TextField from '@/ui/textField/textField'
import EmailIcon from '@icons/icon-email.svg?react'
import PasswordIcon from '@icons/icon-password.svg?react'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'

export default function LoginForm({
    onSubmit
}: {
    onSubmit: FormEventHandler<HTMLFormElement>
}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onEmailTextChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setEmail(e.target.value)
    }
    const onPasswordTextChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value)
    }
    const onSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        onSubmit(e)
    }

    return (
        <form className='flex flex-col gap-6' onSubmit={onSubmitHandler}>
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
            <Button.Primary type='submit'>Login</Button.Primary>
        </form>
    )
}
