import EmailIcon from '@icons/icon-email.svg?react'
import PasswordIcon from '@icons/icon-password.svg?react'
import Button from '@ui/button/button'
import Text from '@ui/text/text'
import TextField from '@ui/textField/textField'
import { ChangeEventHandler, useState } from 'react'

export default function CreateAccountForm() {
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const onEmailTextChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (emailError) {
            setEmailError('')
        }
        setEmail(e.target.value)
    }
    const onPasswordTextChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (passwordError) {
            setPasswordError('')
        }
        setPassword(e.target.value)
    }

    return (
        <form className='flex flex-col gap-6'>
            <TextField
                placeholder='e.g. alex@email.com'
                name='email'
                label='Email address'
                icon={<EmailIcon />}
                value={email}
                error={emailError}
                onChange={onEmailTextChange}
            />
            <TextField
                placeholder='At least 8 characters'
                name='password'
                label='Create password'
                icon={<PasswordIcon />}
                value={password}
                error={passwordError}
                onChange={onPasswordTextChange}
            />
            <TextField
                placeholder='At least 8 characters'
                name='password'
                label='Confirm password'
                icon={<PasswordIcon />}
                value={password}
                error={passwordError}
                onChange={onPasswordTextChange}
            />
            <Text context='body' size='small' color='lsa-grey'>
                Password must contain at least 8 characters
            </Text>
            <Button.Primary type='submit'>Create new account</Button.Primary>
        </form>
    )
}
