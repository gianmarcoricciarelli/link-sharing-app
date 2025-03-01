import clsx from 'clsx'
import { ChangeEventHandler, useContext, useState } from 'react'

import TextField from '@ui/textField/textField'

import { StoreContext } from '@contexts/storeContext/storeContext'

export default function ProfileDetailsForm() {
    const {
        store: { loggedUser }
    } = useContext(StoreContext)

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState(loggedUser!.email)

    const onNameChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        setName(e.target.value)
    }
    const onLastNameChangeHandler: ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        setLastName(e.target.value)
    }
    const onEmailChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        setEmail(e.target.value)
    }

    return (
        <form
            className={clsx(
                'p-5',
                'bg-lsa-light-grey',
                'rounded-xl',
                'flex flex-col gap-3'
            )}
        >
            <TextField
                name='name'
                placeholder='e.g. John'
                label='First name*'
                value={name}
                onChange={onNameChangeHandler}
            />
            <TextField
                name='lastName'
                placeholder='e.g. Doe'
                label='Last name*'
                value={lastName}
                onChange={onLastNameChangeHandler}
            />
            <TextField
                name='email'
                placeholder='e.g. email@provider.com'
                label='Email'
                value={email}
                onChange={onEmailChangeHandler}
            />
        </form>
    )
}
