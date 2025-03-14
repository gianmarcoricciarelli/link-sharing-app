import clsx from 'clsx'
import { ChangeEventHandler } from 'react'

import TextField from '@ui/textField/textField'

import useResizeObserver from '@hooks/useResizeObserver'

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
    const { isMobile } = useResizeObserver()

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
            <div className='mobile:flex mobile:items-center mobile:gap-4'>
                {!isMobile && (
                    <label
                        className='w-60 text-base text-lsa-grey'
                        htmlFor='name'
                    >
                        First Name*
                    </label>
                )}
                <TextField
                    className='mobile:grow'
                    name='name'
                    placeholder='e.g. John'
                    label={isMobile ? 'First name*' : undefined}
                    value={detailsFormData.firstName}
                    onChange={onFirstNameChangeHandler}
                    error={detailsFormErrors.firstName}
                />
            </div>
            <div className='mobile:flex mobile:items-center mobile:gap-4'>
                {!isMobile && (
                    <label
                        className='w-60 text-base text-lsa-grey'
                        htmlFor='lastName'
                    >
                        Last Name*
                    </label>
                )}
                <TextField
                    className='mobile:grow'
                    name='lastName'
                    placeholder='e.g. Doe'
                    label={isMobile ? 'Last name*' : undefined}
                    value={detailsFormData.lastName}
                    onChange={onLastNameChangeHandler}
                    error={detailsFormErrors.lastName}
                />
            </div>
            <div className='mobile:flex mobile:items-center mobile:gap-4'>
                {!isMobile && (
                    <label
                        className='w-60 text-base text-lsa-grey'
                        htmlFor='email'
                    >
                        Email*
                    </label>
                )}
                <TextField
                    className='mobile:grow'
                    name='email'
                    placeholder='e.g. email@provider.com'
                    label={isMobile ? 'Email' : undefined}
                    value={detailsFormData.email}
                    onChange={onEmailChangeHandler}
                    error={detailsFormErrors.email}
                />
            </div>
        </form>
    )
}
