import DevLinks from '@/ui/devlinks/devlinks'
import clsx from 'clsx'

export default function Login() {
    return (
        <div className={clsx('p-8', 'flex flex-col gap-16')}>
            <DevLinks logoSize='large' />
        </div>
    )
}
