import clsx from 'clsx'
import { FormEventHandler, useContext } from 'react'
import { useNavigate } from 'react-router'

import { User } from '@customTypes/index'

import DevLinks from '@ui/devlinks/devlinks'
import Text from '@ui/text/text'

import CreateAccountForm from '@widgets/createAccountForm/createAccountForm'

import { StoreContext } from '@contexts/storeContext/storeContext'

export default function CreateAccount() {
    const navigateTo = useNavigate()

    const { store, setLoggedUser } = useContext(StoreContext)

    const onCreateAccountFormSubmitHandler: FormEventHandler<
        HTMLFormElement
    > = (e) => {
        const ids = store.users.map((u) => u.id)
        const newId = ids.length ? Math.max(...ids) : 0
        const newUser: User = {
            ...(Object.fromEntries(
                new FormData(e.target as HTMLFormElement)
            ) as Omit<User, 'links' | 'id'>),
            id: newId,
            links: []
        }

        setLoggedUser({ ...newUser })
        navigateTo('/')
    }

    return (
        <div
            className={clsx(
                'h-full p-8',
                'flex flex-col md:justify-center md:items-center gap-16 md:gap-12'
            )}
        >
            <DevLinks logoSize='large' />
            <div
                className={clsx(
                    'md:bg-white',
                    'md:w-[476px] md:p-10',
                    'md:rounded-xl',
                    'flex flex-col gap-10'
                )}
            >
                <div className='flex flex-col gap-2'>
                    <Text
                        className='text-[24px]!'
                        color='lsa-dark-gray'
                        fontStyle='bold'
                    >
                        Create account
                    </Text>
                    <Text context='body' size='medium' color='lsa-grey'>
                        Let's get you started sharing your links!
                    </Text>
                </div>
                <div className='flex flex-col gap-6'>
                    <CreateAccountForm
                        onSubmit={onCreateAccountFormSubmitHandler}
                    />
                    <div
                        className={clsx(
                            'flex flex-col md:flex-row md:justify-center text-center'
                        )}
                    >
                        <Text context='body' size='medium' color='lsa-grey'>
                            Already have an account?
                        </Text>
                        <Text
                            className='hover:cursor-pointer'
                            context='body'
                            size='medium'
                            color='lsa-purple'
                            onClick={() => navigateTo('/login')}
                        >
                            Login
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    )
}
