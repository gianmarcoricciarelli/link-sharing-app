import clsx from 'clsx'
import { ChangeEventHandler, useContext } from 'react'
import { useOutletContext } from 'react-router'

import { OutletContext } from '@customTypes/index'

import TextField from '@ui/textField/textField'

import { StoreContext } from '@contexts/storeContext/storeContext'

export default function ProfileDetailsForm() {
    const {
        store: { loggedUser },
        setFirstName,
        setLastName,
        setEmail
    } = useContext(StoreContext)

    const { detailsFormErrors, setDetailFormErrors } =
        useOutletContext<OutletContext>()

    const onNameChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (detailsFormErrors.firstName) {
            setDetailFormErrors((prevErrors) => ({
                ...prevErrors,
                firstName: ''
            }))
        }
        setFirstName(e.target.value)
    }
    const onLastNameChangeHandler: ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        if (detailsFormErrors.lastName) {
            setDetailFormErrors((prevErrors) => ({
                ...prevErrors,
                lastName: ''
            }))
        }
        setLastName(e.target.value)
    }
    const onEmailChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (detailsFormErrors.email) {
            setDetailFormErrors((prevErrors) => ({
                ...prevErrors,
                email: ''
            }))
        }
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
                value={loggedUser?.firstName}
                onChange={onNameChangeHandler}
                error={detailsFormErrors.firstName}
            />
            <TextField
                name='lastName'
                placeholder='e.g. Doe'
                label='Last name*'
                value={loggedUser?.lastName}
                onChange={onLastNameChangeHandler}
                error={detailsFormErrors.lastName}
            />
            <TextField
                name='email'
                placeholder='e.g. email@provider.com'
                label='Email'
                value={loggedUser?.email}
                onChange={onEmailChangeHandler}
                error={detailsFormErrors.email}
            />
        </form>
    )
}
