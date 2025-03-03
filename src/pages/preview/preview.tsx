import clsx from 'clsx'
import { useNavigate } from 'react-router'

import Button from '@ui/button/button'

export default function Preview() {
    const navigateTo = useNavigate()

    return (
        <div className='h-full flex flex-col'>
            <div
                className={clsx(
                    'w-full',
                    'py-4 px-6',
                    'grid grid-cols-2 gap-4'
                )}
            >
                <Button.Secondary onClick={() => navigateTo('/details')}>
                    Back to Editor
                </Button.Secondary>
                <Button.Primary>Share Link</Button.Primary>
            </div>
            <div className='grow flex flex-col justify-center items-center gap-14'>
                <div className='flex flex-col items-center gap-6'>
                    <span>a</span>
                    <span>b</span>
                </div>
                <span>c</span>
            </div>
        </div>
    )
}
