import EmailIcon from '@icons/icon-email.svg?react'
import PasswordIcon from '@icons/icon-password.svg?react'
import Button from '@ui/button/button'
import TextField from '@ui/textField/textField'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import z from 'zod'

export default function LoginForm({
    onSubmit
}: {
    onSubmit: FormEventHandler<HTMLFormElement>
}) {
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
    const onSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()

        const loginFormValidationSchema = z.object({
            email: z
                .string()
                .min(1, 'Email is required')
                .email('Not a valid Email'),
            password: z.string().min(4, 'Password is required')
        })
        const parsedData = loginFormValidationSchema.safeParse({
            email,
            password
        })

        if (!parsedData.success) {
            const { email: _emailError, password: _passwordError } =
                parsedData.error.flatten().fieldErrors

            if (_emailError?.length) {
                setEmailError(_emailError[0])
            }
            if (_passwordError?.length) {
                setPasswordError(_passwordError[0])
            }

            return
        }

        onSubmit(e)
    }

    return (
        <form className='flex flex-col gap-6' onSubmit={onSubmitHandler}>
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
                placeholder='Enter your password'
                name='password'
                label='Password'
                icon={<PasswordIcon />}
                value={password}
                error={passwordError}
                onChange={onPasswordTextChange}
            />
            <Button.Primary type='submit'>Login</Button.Primary>
        </form>
    )
}
