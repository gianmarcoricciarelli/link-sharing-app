import clsx from 'clsx'
import { ChangeEventHandler } from 'react'

import TextField from '@ui/textField/textField'

import { DetailContextProps } from '@contexts/detailsContext/detailsContext'

interface ProfileDetailsFormProps {
    detailsFormData: DetailContextProps['detailsFormData']
    setDetailsFormData: DetailContextProps['setDetailsFormData']
    detailsFormErrors: DetailContextProps['detailsFormErrors']
    setDetailFormErrors: DetailContextProps['setDetailFormErrors']
}

export default function ProfileDetailsForm({
    detailsFormData,
    setDetailsFormData,
    detailsFormErrors,
    setDetailFormErrors
}: ProfileDetailsFormProps) {
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
