import DevLinks from '@/ui/devlinks/devlinks'
import Text from '@/ui/text/text'
import clsx from 'clsx'
import { useNavigate } from 'react-router'

export default function CreateAccount() {
    const navigateTo = useNavigate()

    return (
        <div className={clsx('p-8', 'flex flex-col gap-16')}>
            <DevLinks logoSize='large' />
            <div className='flex flex-col gap-10'>
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
                    <div className='flex flex-col gap-6'>
                        <div className='flex flex-col text-center'>
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
        </div>
    )
}
