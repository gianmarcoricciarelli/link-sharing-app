import clsx from 'clsx'
import { ChangeEventHandler } from 'react'
import { useOutletContext } from 'react-router'

import { OutletContext } from '@customTypes/index'

import TextField from '@ui/textField/textField'

export default function ProfileDetailsForm() {
    const {
        detailsFormData,
        setDetailsFormData,
        detailsFormErrors,
        setDetailFormErrors
    } = useOutletContext<OutletContext>()

    const onFirstNameChangeHandler: ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        if (detailsFormErrors.firstName) {
            setDetailFormErrors((prevErrors) => ({
                ...prevErrors,
                firstName: ''
            }))
        }
        setDetailsFormData((prevData) => ({
            ...prevData,
            firstName: e.target.value
        }))
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
        setDetailsFormData((prevData) => ({
            ...prevData,
            lastName: e.target.value
        }))
    }
    const onEmailChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (detailsFormErrors.email) {
            setDetailFormErrors((prevErrors) => ({
                ...prevErrors,
                email: ''
            }))
        }
        setDetailsFormData((prevData) => ({
            ...prevData,
            email: e.target.value
        }))
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
                value={detailsFormData.firstName}
                onChange={onFirstNameChangeHandler}
                error={detailsFormErrors.firstName}
            />
            <TextField
                name='lastName'
                placeholder='e.g. Doe'
                label='Last name*'
                value={detailsFormData.lastName}
                onChange={onLastNameChangeHandler}
                error={detailsFormErrors.lastName}
            />
            <TextField
                name='email'
                placeholder='e.g. email@provider.com'
                label='Email'
                value={detailsFormData.email}
                onChange={onEmailChangeHandler}
                error={detailsFormErrors.email}
            />
        </form>
    )
}
