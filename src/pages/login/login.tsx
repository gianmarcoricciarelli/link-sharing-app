import DevLinks from '@/ui/devlinks/devlinks'
import Text from '@/ui/text/text'
import clsx from 'clsx'

export default function Login() {
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
                        Login
                    </Text>
                    <Text context='body' size='medium' color='lsa-grey'>
                        Add your details below to get back into the app
                    </Text>
                </div>
            </div>
        </div>
    )
}
