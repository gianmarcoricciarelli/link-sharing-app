import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { z } from 'zod'

import EmailIcon from '@icons/icon-email.svg?react'
import PasswordIcon from '@icons/icon-password.svg?react'

import Button from '@ui/button/button'
import Text from '@ui/text/text'
import TextField from '@ui/textField/textField'

export default function CreateAccountForm({
    onSubmit
}: {
    onSubmit: FormEventHandler<HTMLFormElement>
}) {
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

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
    const onConfirmPasswordTextChange: ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        if (confirmPasswordError) {
            setConfirmPasswordError('')
        }
        setConfirmPassword(e.target.value)
    }
    const onSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()

        const createAccountFormValidationSchema = z.object({
            email: z
                .string()
                .min(1, `Email is required`)
                .email('Not a valid Email'),
            password: z.string().min(8, 'Too short'),
            confirmPassword: z.string().min(8, 'Too short')
        })
        const parsedData = createAccountFormValidationSchema.safeParse({
            email,
            password,
            confirmPassword
        })

        if (!parsedData.success) {
            const {
                email: _emailError,
                password: _passwordError,
                confirmPassword: _confirmPasswordError
            } = parsedData.error.flatten().fieldErrors

            if (_emailError?.length) {
                setEmailError(_emailError[0])
            }
            if (_passwordError?.length) {
                setPasswordError(_passwordError[0])
            }
            if (_confirmPasswordError?.length) {
                setConfirmPasswordError(_confirmPasswordError[0])
            }

            return
        } else if (
            parsedData.data.password !== parsedData.data.confirmPassword
        ) {
            setConfirmPasswordError('Differs from Password')

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
                name='confirmPassword'
                label='Confirm password'
                icon={<PasswordIcon />}
                value={confirmPassword}
                error={confirmPasswordError}
                onChange={onConfirmPasswordTextChange}
            />
            <Text context='body' size='small' color='lsa-grey'>
                Password must contain at least 8 characters
            </Text>
            <Button.Primary type='submit'>Create new account</Button.Primary>
        </form>
    )
}
