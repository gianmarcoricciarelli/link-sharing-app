import clsx from 'clsx'
import { useContext } from 'react'
import { useNavigate } from 'react-router'

import Button from '@ui/button/button'
import PreviewLink from '@ui/previewLink/previewLink'

import { StoreContext } from '@contexts/storeContext/storeContext'

export default function Preview() {
    const navigateTo = useNavigate()

    const {
        store: { loggedUser }
    } = useContext(StoreContext)

    return (
        <div className='h-full flex flex-col items-center'>
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
            <div className='w-[237px] grow flex flex-col justify-center items-center gap-14'>
                <div className='flex flex-col items-center gap-6'>
                    <span>a</span>
                    <span>b</span>
                </div>
                {loggedUser?.links && loggedUser.links.length > 0 && (
                    <div className='w-full flex flex-col gap-5'>
                        {loggedUser.links.map((l) => (
                            <PreviewLink
                                key={l.platform}
                                platform={l.platform}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
