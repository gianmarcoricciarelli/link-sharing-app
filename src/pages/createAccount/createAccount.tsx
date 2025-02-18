import { UserContext } from '@contexts/user'
import { User } from '@customTypes/index'
import DevLinks from '@ui/devlinks/devlinks'
import Text from '@ui/text/text'
import CreateAccountForm from '@widgets/createAccountForm/createAccountForm'
import clsx from 'clsx'
import { FormEventHandler, useContext } from 'react'
import { useNavigate } from 'react-router'

export default function CreateAccount() {
    const navigateTo = useNavigate()

    const { setUser } = useContext(UserContext)

    const onCreateAccountFormSubmitHandler: FormEventHandler<
        HTMLFormElement
    > = (e) => {
        const newUser = Object.fromEntries(
            new FormData(e.target as HTMLFormElement)
        )
        localStorage.setItem(
            'lsa-user-info',
            JSON.stringify({ ...newUser, isLoggedIn: 'true' })
        )

        setUser({ ...newUser, isLoggedIn: true } as User)
        navigateTo('/')
    }

    return (
        <div
            className={clsx(
                'h-full p-8',
                'flex flex-col tablet:justify-center tablet:items-center gap-16 tablet:gap-12'
            )}
        >
            <DevLinks logoSize='large' />
            <div
                className={clsx(
                    'tablet:bg-white',
                    'tablet:w-[476px] tablet:p-10',
                    'tablet:rounded-xl',
                    'flex flex-col gap-10'
                )}
            >
                <div className='flex flex-col gap-2'>
                    <Text
                        className='text-[24px]!'
                        color='lsa-dark-gray'
                        style='bold'
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
                            'flex flex-col tablet:flex-row tablet:justify-center text-center'
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
